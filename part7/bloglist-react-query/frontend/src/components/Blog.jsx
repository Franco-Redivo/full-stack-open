import { useState } from "react"
import PropTypes from 'prop-types'
import { useLikeBlog, useDeleteBlogWithConfirm } from '../hooks/useBlogs'

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const { likeBlog, isLoading: isLiking } = useLikeBlog()
  const { deleteBlog, isLoading: isDeleting } = useDeleteBlogWithConfirm()
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleLike = () => {
    likeBlog(blog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div data-testid="likes">
          likes {blog.likes}
          <button 
            onClick={handleLike} 
            disabled={isLiking}
            data-testid="like-button"
          >
            {isLiking ? 'liking...' : 'like'}
          </button>
        </div>
        <div>{blog.user?.name || 'Unknown author'}</div>
        {user && blog.user && blog.user.username === user.username && (
          <button 
            onClick={handleDelete} 
            disabled={isDeleting}
            style={{ backgroundColor: '#ff6b6b' }}
          >
            {isDeleting ? 'removing...' : 'remove'}
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string
  })
}

export default Blog
