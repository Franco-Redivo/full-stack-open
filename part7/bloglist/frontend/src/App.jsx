import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notoficationReducer'
import { setUser, logOut } from './reducers/userReducer'

const App = () => {
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const currentUser = JSON.parse(loggedUserJSON)
      if(currentUser && currentUser.token){
        dispatch(setUser(currentUser))
        blogService.setToken(currentUser.token)
      } else {
        // Remove invalid user data from localStorage
        window.localStorage.removeItem('loggedBlogappUser')
      }
    }
  }, [])


  const handleLogout = () => {
    dispatch(logOut())
    dispatch(setNotification({
      content: 'Logged out successfully',
      style: 'message'
    }, 5))
  }

  return (
    <div>
      <Notification/>
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm/> 
        </Togglable>
      ):(
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm/>
          </Togglable>
          <h2>blogs</h2>
          {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
            
            <Blog key={blog.id} blog={blog} user={user} />
            
          )}
        </div>
        )
      }
      
      
    </div>
  )
}

export default App