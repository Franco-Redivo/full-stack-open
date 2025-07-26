import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { onReset: titleReset, ...title } = useField('text')
  const { onReset: authorReset, ...author } = useField('text')
  const { onReset: urlReset, ...url } = useField('text')


  const addBlog = async (event) => {
    try {
      
      event.preventDefault()

      if (!title.value || !author.value || !url.value) {
        dispatch(setNotification({ content: 'All fields are required', style: 'error' }, 5))
        return
      }

      dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      }))
      dispatch(setNotification({
        content: `A new blog ${title.value} by ${author.value} added`,
        style: 'message'
      }, 5))

      titleReset()
      authorReset()
      urlReset()

      navigate('/')

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
            name="title"
            {...title}
          />
        </div>
        <div>
          author
          <input data-testid='author' className="author"
            name="author"
            {...author}
          />
        </div>
        <div>
          url
          <input data-testid='url' className="url"
            name="url"
            {...url}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm