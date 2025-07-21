import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setMessageType('error')
      console.error('Wrong credentials:', exception)
      setTimeout(() => {
        setNotification(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
  
      setNotification(`a new blog "${returnedBlog.title}" by ${returnedBlog.author} added`)
      setMessageType('message')
      setTimeout(() => {
        setNotification(null)
        setMessageType(null)
      }, 5000)
    } catch (error) {
      setNotification('Error creating blog')
      setMessageType('error')
      console.error('Error creating blog:', error)
      setTimeout(() => {
        setNotification(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
    } catch (error) {
      setNotification('Error liking blog')
      setMessageType('error')
      console.error('Error liking blog:', error)
      setTimeout(() => {
        setNotification(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setNotification(`Blog "${blog.title}" removed`)
        setMessageType('message')
        setTimeout(() => {
          setNotification(null)
          setMessageType(null)
        }, 5000)
      } catch (error) {
        setNotification('Error removing blog')
        setMessageType('error')
        console.error('Error removing blog:', error)
        setTimeout(() => {
          setNotification(null)
          setMessageType(null)
        }, 5000)
      }
    }
  }


  return (
    <div>
      <Notification message={notification} messageType={messageType}/>
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            /> 
        </Togglable>
      ):(
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
            
          )}
        </div>
        )
      }
      
      
    </div>
  )
}

export default App