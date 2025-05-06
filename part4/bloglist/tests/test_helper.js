const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
]

const nonExistingId = async () => {
    const blog = new Blog(
        { title: "Will remove soon",
          author: "unknown",
          url: "http://www.someurl.html",
          likes: 5,
        })
    await blog.save()
    await blog.deleteOne()
  
    return blog.id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

  
  const loginUser = {
    username: 'loginUser',
    password: 'secret'
  }
  

  module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, loginUser
  }
