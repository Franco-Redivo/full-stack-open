const LoginForm = ({handleLogin, username, password, setPassword, setUsername}) => (
    <form onSubmit = {handleLogin}>
        <h2>Log in to application</h2>
      <div>
        username
        <input
         type="text"
         value={username}
         name="Username"
         onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
)

export default LoginForm