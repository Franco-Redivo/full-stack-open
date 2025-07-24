import { createContext, useContext, useReducer } from 'react'

const LoginContext = createContext()

const loginReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return { ...state, username: action.payload }
        case 'SET_PASSWORD':
            return { ...state, password: action.payload }
        case 'LOGIN':
            return { ...state, isLoggedIn: true }
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, username: '', password: '' }
        default:
            return state
    }
}

export const LoginContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(loginReducer, {
        username: '',
        password: '',
        isLoggedIn: false
    })

    return (
        <LoginContext.Provider value={{ state, dispatch }}>
            {children}
        </LoginContext.Provider>
    )
}

// aca tengo que seguir

export const useLoginValue = () => {
    const loginContext = useContext(LoginContext)
    return loginContext.state
}

export const useLoginDispatch = () => {
    const loginContext = useContext(LoginContext)
    return loginContext.dispatch
}

export const changeUsername = (dispatch, username) => {
    dispatch({ type: 'SET_USERNAME', payload: username })
}

export const changePassword = (dispatch, password) => {
    dispatch({ type: 'SET_PASSWORD', payload: password })
}

export default LoginContext