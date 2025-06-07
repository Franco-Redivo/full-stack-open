import { useState } from "react"
import PropTypes from 'prop-types'
const Blog = ({ blog, handleLike, handleRemove,user }) => {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('view')
  


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const showWhenVisible = {display: visible ? '' : 'none'}

  const handleLikeCLick = () => {
    handleLike(blog)
  }

  const toggleLabel = () => {
    label === 'view' ? setLabel('hide') : setLabel('view')
  }

  const handleRemoveClick = () => {
    
    handleRemove(blog)
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
      <p>{blog.likes} <button onClick={handleLikeCLick}>like</button></p>
      <button style={showDeleteButton} onClick={handleRemoveClick}>remove</button>
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