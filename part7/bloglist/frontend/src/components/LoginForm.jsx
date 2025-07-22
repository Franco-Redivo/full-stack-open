import PropTypes from "prop-types"
import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { setNotification } from '../reducers/notoficationReducer'
import { logIn } from '../reducers/userReducer'
import blogService from '../services/blogs'

const LoginForm = () => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await dispatch(logIn({
        username, password
      }))

      blogService.setToken(user.token)
      dispatch(setNotification({
        content: `Welcome ${user.name}`,
        style: 'message'
      }, 5))
  
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({
        content: 'Wrong credentials',
        style: 'error'
      }, 5))
      console.error('Wrong credentials:', exception)
    }
  }

  return (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input data-testid='username'
         type="text"
         value={username}
         name="Username"
         onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
          <input data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)}

LoginForm.displayName = 'LoginForm'


export default LoginForm