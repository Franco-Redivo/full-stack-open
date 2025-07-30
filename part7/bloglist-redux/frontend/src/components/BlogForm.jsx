import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/index'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
        style: 'success'
      }, 5))

      titleReset()
      authorReset()
      urlReset()

      navigate('/')

    } catch (error) {
      dispatch(setNotification({
        content: `Error adding blog: ${error.message}`,
        style: 'danger'
      },5))
      
    }
  }
    
  return (
    <div className="mt-3 mb-3">
      <h2>Create new blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            data-testid='title'
            className="title"
            name="title"
            {...title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            data-testid='author'
            className="author"
            name="author"
            {...author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            data-testid='url'
            className="url"
            name="url"
            {...url}
          />
        </Form.Group>
        <Button className='mt-2' type="submit">create</Button>
      </Form>
    </div>
  )
}


export default BlogForm