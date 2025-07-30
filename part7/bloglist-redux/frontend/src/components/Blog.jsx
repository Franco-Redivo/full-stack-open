import { useState } from "react"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { like, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from "react-router-dom"
import Comments from './Comments'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  
  // Handle case when blog is not found or still loading
  if (!blog) {
    return <div>Blog not found</div>
  }
  
  
  const likeBlog = async (blog) => {
    try {
      dispatch(like(blog))
      dispatch(setNotification({
        content: `Liked blog "${blog.title}"`,
        style: 'success'
      }, 5))
    } catch (error) {
      dispatch(setNotification({
        content: `Error liking blog: ${error.message}`,
        style: 'danger'
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
      navigate('/')
    }
  }

  const showDeleteButton = {display: blog.user && blog.user.username === user.username ? '' : 'none'}


  return(
  <div className='blog border p-3 mb-3 rounded'>
    <h2>{blog.title} by {blog.author}</h2>

    <div className="d-flex flex-column gap-2">
      <a href={blog.url}>{blog.url}</a>
      <div className="d-flex align-items-center gap-2"><span data-testid='like'>{blog.likes}</span><Button variant="secondary" size="sm" onClick={() => likeBlog(blog)}>like</Button></div>
      <div className="d-flex align-items-center gap-2">
        <div>added by {blog.user ? 
          <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link> : 'unknown'}</div>
        <Button size="sm" variant="danger" style={showDeleteButton} onClick={() => removeBlog(blog)}>remove</Button>
      </div>
    </div>
    
    <Comments blogId={blog.id} />
      
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