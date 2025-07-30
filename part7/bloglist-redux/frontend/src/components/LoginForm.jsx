import PropTypes from "prop-types"
import { useDispatch,useSelector } from "react-redux"
import { setNotification } from '../reducers/notoficationReducer'
import { logIn } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { useField } from "../hooks"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom"

const LoginForm = () => { 
  const { onReset: usernameReset, ...username } = useField('text')
  const { onReset: passwordReset, ...password } = useField('password')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

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
        style: 'success'
      }, 5))
  
      usernameReset()
      passwordReset()
      navigate('/')
    } catch (exception) {
      dispatch(setNotification({
        content: 'Wrong credentials',
        style: 'danger'
      }, 5))
      console.error('Wrong credentials:', exception)
    }
  }

  return (
  <div>
    <h2>Log in to application</h2>
    <Form onSubmit = {handleLogin}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control data-testid='username' name="Username" {...username} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control data-testid='password' name="Password" {...password} />
      </Form.Group>
      <Button type="submit">login</Button>
    </Form>
  </div>
)}

LoginForm.displayName = 'LoginForm'


export default LoginForm