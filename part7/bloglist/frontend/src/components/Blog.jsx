import { useState } from "react"
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { like, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog,user }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')

  const dispatch = useDispatch()
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const likeBlog = async (blog) => {
    try {
      dispatch(like(blog))
      dispatch(setNotification({
        content: `Liked blog "${blog.title}"`,
        style: 'message'
      }, 5))
    } catch (error) {
      dispatch(setNotification({
        content: `Error liking blog: ${error.message}`,
        style: 'error'
      }, 5))
      
    }
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification({
          content: `Blog ${blog.title} removed`,
          style: 'message'
        }, 5))
      } catch (error) {
        dispatch(setNotification({
          content: `Error removing blog: ${error.message}`,
          style: 'error'
        }, 5))
      }
    }
  }
  
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleLabel = () => {
    label === 'view' ? setLabel('hide') : setLabel('view')
  }
  const showDeleteButton = {display: blog.user && blog.user.username === user.username ? '' : 'none'}
  
  const toggleVisibility = () => {
      setVisible(!visible)
      toggleLabel()
  }

  return(
  <div style={blogStyle} className='blog'>
    <h3>{blog.title}<button onClick={toggleVisibility}>{label}</button></h3>
      <p>{blog.author}</p>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p><span data-testid='like'>{blog.likes}</span><button onClick={() => likeBlog(blog)}>like</button></p>
      <button style={showDeleteButton} onClick={() => removeBlog(blog)}>remove</button>
    </div>  
  </div>
  )  
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
Blog.displayName = 'Blog'

export default Blog