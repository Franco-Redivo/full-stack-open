import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
    return (
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input className="title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input className="author"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input className="url"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}
BlogForm.displayName = 'BlogForm'

export default BlogForm