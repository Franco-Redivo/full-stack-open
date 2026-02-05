import { useState } from "react"
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";


const LoginForm = ({ setError, setToken, show ,setPage}) => {
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')

    const [login] = useMutation(LOGIN, {
        onCompleted: (data) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('user-token', token)
            setPage('authors')
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const submit = (event) => {
        event.preventDefault()
        login({ variables: {username, password } })
    }

    if(!show){
        return null
    }

    return (
        <form onSubmit={submit}>
            <div>
                username
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm