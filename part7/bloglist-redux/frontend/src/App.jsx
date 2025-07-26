import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import BlogForm from './components/BlogForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import Togglable from './components/Togglable'
import UserDetails from './components/UserDetails'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notoficationReducer'
import { setUser, logOut } from './reducers/userReducer'
import { Route, Routes, Link, useMatch } from 'react-router-dom'
import { fetchUsers } from './reducers/usersReducer'

const App = () => {
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(fetchUsers())
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

  const match = useMatch('blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const userMatch = useMatch('users/:id')
  const selectedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null


  return (
    <div>
      <Notification/>
      <h1>Blog App</h1>
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm/> 
        </Togglable>
      ):(
        <>
          <Menu />
          <Routes>
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/" element={<BlogsList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetails user={selectedUser} />} />
          </Routes>
        </>
      )}

    </div>
  )
}


export default App