const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/',userExtractor,async (request, response) => {
    const body = request.body
    const { user } = request

    if (!user) {
      return response.status(401).json({ error: 'token invalid' })
    }

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'title or url is missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ?? 0,
        user: user,
    })
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
    

})
blogsRouter.delete('/:id',userExtractor,async(request, response) => {
    const { user } = request

    if(!user){
        return response.status(401).json({error: 'token invalid'})
    }
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user._id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error:'unauthorized access' })
    }
    
})

blogsRouter.get('/:id',async(request, response) => {
    
    const blog = await Blog.findById(request.params.id)
    if(blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
    
})


blogsRouter.put('/:id', async(request, response) => {
    const { likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes },
        { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter


