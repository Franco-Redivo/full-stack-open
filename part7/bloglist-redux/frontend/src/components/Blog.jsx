import { useState } from "react"
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notoficationReducer'
import { like, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from "react-router-dom"
import Comments from './Comments'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  
  // Handle case when blog is not found or still loading
  if (!blog) {
    return <div>Blog not found</div>
  }
  
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
      navigate('/')
    }
  }

  const showDeleteButton = {display: blog.user && blog.user.username === user.username ? '' : 'none'}


  return(
  <div style={blogStyle} className='blog'>
    <h2>{blog.title} by {blog.author}</h2>
    
    <p>{blog.url}</p>
    <p><span data-testid='like'>{blog.likes}</span><button onClick={() => likeBlog(blog)}>like</button></p>
    <p>added by {blog.user ? blog.user.name : 'unknown'}</p>
    
    {/* Show delete button only if the user is the owner of the blog */}
    <button style={showDeleteButton} onClick={() => removeBlog(blog)}>remove</button>

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