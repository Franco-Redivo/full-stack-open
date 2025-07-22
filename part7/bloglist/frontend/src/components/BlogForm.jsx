import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = async (event) => {
    try {
      
      event.preventDefault()

      if (!title || !author || !url) {
        dispatch(setNotification({ content: 'All fields are required', style: 'error' }, 5))
        return
      }

      dispatch(createBlog({
        title,
        author,
        url
      }))
      dispatch(setNotification({
        content: `A new blog ${title} by ${author} added`,
        style: 'message'
      }, 5))

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      dispatch(setNotification({
        content: `Error adding blog: ${error.message}`,
        style: 'error'
      },5))
      
    }
  }
    
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input data-testid='title' className="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input data-testid='author' className="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input data-testid='url' className="url"
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


export default BlogForm