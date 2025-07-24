import { useLoginForm } from '../hooks/useAuth'
import { useLoginValue, useLoginDispatch, changePassword, changeUsername } from '../context/LoginContext'

const LoginForm = () => { 
  const { handleLogin, isLoading, error } = useLoginForm()

  const loginValue = useLoginValue()
  const loginDispatch = useLoginDispatch()

  const onChangeUsername = (event) => {
    changeUsername(loginDispatch, event.target.value)
  }
  const onChangePassword = (event) => {
    changePassword(loginDispatch, event.target.value)
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    
    try {
      // Create a form event-like object for the hook
      const user = {
        username: loginValue.username,
        password: loginValue.password
      }
      
      await handleLogin(user)
      
      // Clear form on successful login
      onChangeUsername({ target: { value: '' } })
      onChangePassword({ target: { value: '' } })
    } catch (exception) {
      // Error handling could be enhanced here
      console.error('Login failed:', exception)
    }
  }

  return (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={onSubmit}>
      <div>
        username
        <input data-testid='username'
         type="text"
         value={loginValue.username}
         name="Username"
         onChange={onChangeUsername}
         disabled={isLoading}/>
      </div>
      <div>
        password
        <input data-testid='password'
         type="password"
         value={loginValue.password}
         name="Password"
         onChange={onChangePassword}
         disabled={isLoading}/>
      </div>
      <button data-testid='login-button' type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'login'}
      </button>
    </form>
    {error && (
      <div style={{ color: 'red', marginTop: '10px' }}>
        Login failed: {error.message || 'Wrong credentials'}
      </div>
    )}
  </div>
  )
}

export default LoginForm
