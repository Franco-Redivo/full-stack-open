require('dotenv').config()
const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const pubSub = new PubSub()

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.genre && args.author) {
        const author = await Author.findOne({name: args.author})

        if(!author){
            return []
        }

        return Book.find({author: author._id, genres: args.genre}).populate('author')
      }
      if(args.author){
          const author = await Author.findOne({name: args.author})
          if(!author) return []
          return Book.find({author: author._id}).populate('author')
        } 
      if(args.genre) return Book.find({genres: args.genre}).populate('author')
          
      return Book.find({}).populate('author')
    },
        allAuthors: async () => {
                console.log('allAuthors aggregate')
                return Author.aggregate([
                    {
                        $lookup: {
                            from: 'books',
                            localField: '_id',
                            foreignField: 'author',
                            as: 'books'
                        }
                    },
                    { $addFields: { bookCount: { $size: '$books' }, id: { $toString: '$_id' } } },
                    { $project: { books: 0 } }
                ])
        },
    me: (root, args, context) => {
        return context.currentUser
    },
    allGenres: async () => {
        return await Book.distinct('genres')
    }
  },
// Added agregate lookup for bookCount, so no need for separate resolver  
//   Author: {
//     bookCount: async (root) => { 
//         console.log('bookCount find')
//         return Book.collection.countDocuments({author: root._id}) 
//     }
//   },
  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        
        if(!currentUser){
            throw new GraphQLError('Not authenticated',{
                                extensions:{
                    code:'UNAUTHENTICATED'
                }
            })
        }

        let author = await Author.findOne( {name: args.author })

        if(!author){
            author = new Author({ name: args.author })
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error,
                    },
                })
            }
        }
        const book = new Book({
            title: args.title,
            published: args.published,
            genres: args.genres,
            author: author._id,
        })

        try{
            const saved = await book.save()
            await saved.populate('author')

            pubSub.publish('BOOK_ADDED', { bookAdded: saved })
            return saved

        }catch (error) {
            throw new GraphQLError('Saving book failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    error: error.message,
                    details: error,
                },
            })

        }
    },
    editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        
        if(!currentUser){
            throw new GraphQLError('Not authenticated',{
                extensions:{
                    code:'UNAUTHENTICATED'
                }
            })
        }
        
        try {
            return await Author.findOneAndUpdate(
                {name: args.name},
                {born: args.setBornTo},
                {new: true}
            )
        } catch (error){
            throw new GraphQLError('updating author failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error: error.message,
                },
            })
        }
    },
    createUser: async (root, args) => {
        try {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })
            return await user.save()
        } catch (error) {
            throw new GraphQLError('user creation failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username,
                    error: error.message,
                },
            })
        }
    },
    login: async (root, args) => {
        const user = await User.findOne({username: args.username})

        if(!user || args.password != 'secret'){
            throw new GraphQLError('login failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.username,
                },
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}

    },

  },
  
  Subscription: {
    bookAdded: {
        subscribe: () => pubSub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers