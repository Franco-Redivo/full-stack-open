import PropTypes from "prop-types"

const LoginForm = ({handleLogin, username, password, handleUsernameChange, handlePasswordChange}) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit = {handleLogin}>
      <div>
        username
        <input data-testid='username'
         type="text"
         value={username}
         name="Username"
         onChange={handleUsernameChange}/>
      </div>
      <div>
        password
          <input data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'


export default LoginForm