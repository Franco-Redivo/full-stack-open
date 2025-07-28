const commentRouter = require('express').Router()
const Comment = require('../models/comments.js')

commentRouter.get('/', async (req, res) => {
    const { blog } = req.query
    let comments
    
    if (blog) {
        comments = await Comment.find({ blog: blog })
    } else {
        comments = await Comment.find({})
    }
    
    res.json(comments)
})

commentRouter.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        res.json(comment)
    } else {
        res.status(404).end()
    }
})

commentRouter.post('/', async (req, res) => {
    const body = req.body
    const comment = new Comment({
        content: body.content,
        blog: body.blog
    })
    const savedComment = await comment.save()
    res.status(201).json(savedComment)
})

module.exports = commentRouter