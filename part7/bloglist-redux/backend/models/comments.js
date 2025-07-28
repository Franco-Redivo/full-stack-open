const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const commentSchema = mongoose.Schema({
  content: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
})

module.exports = mongoose.model('Comment', commentSchema)
