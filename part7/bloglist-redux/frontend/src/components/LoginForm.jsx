import PropTypes from "prop-types"
import { useDispatch,useSelector } from "react-redux"
import { setNotification } from '../reducers/notoficationReducer'
import { logIn } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { useField } from "../hooks"

const LoginForm = () => { 
  const { onReset: usernameReset, ...username } = useField('text')
  const { onReset: passwordReset, ...password } = useField('password')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await dispatch(logIn({
        username: username.value,
        password: password.value
      }))

      blogService.setToken(user.token)
      dispatch(setNotification({
        content: `Welcome ${user.name}`,
        style: 'message'
      }, 5))
  
      usernameReset()
      passwordReset()
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
         name="Username"
         {...username}/>
      </div>
      <div>
        password
          <input data-testid='password'
          name="Password"
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)}

LoginForm.displayName = 'LoginForm'


export default LoginForm