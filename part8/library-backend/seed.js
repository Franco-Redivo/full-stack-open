const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.connect(process.env.MONGODB_URI)


const seed = async () => {
    await Author.deleteMany({})
    await Book.deleteMany({})

    const robert = new Author({ name: 'Robert Martin', born: 1952 })
    const fowler = new Author({ name: 'Martin Fowler', born: 1963 })
    const sandi = new Author({ name: 'Sandi Metz', born: 1974 })

    await robert.save()
    await fowler.save()
    await sandi.save()

    let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: robert._id,
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: robert._id,
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: fowler._id,
        genres: ['refactoring']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: sandi._id,
        genres: ['refactoring', 'design']
    },
    ]

    await Book.insertMany(books)

    console.log('Database seeded')
    mongoose.connection.close()
}

seed()