import { useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useBlogs, useUser, useLogout } from './hooks/useBlogs'

const App = () => {
  const blogFormRef = useRef()
  
  const { blogs, isLoading, isError } = useBlogs()
  const { user } = useUser()
  const handleLogout = useLogout()

  if(isLoading){
    return <div>Loading blogs...</div>
  }
  if(isError){
    return <div>Error loading blogs</div>
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