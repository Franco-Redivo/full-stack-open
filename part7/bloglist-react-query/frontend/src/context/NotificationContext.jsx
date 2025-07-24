import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, message: action.payload.message, style: action.payload.style || 'notification' }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: null }
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { message: null , style: 'notification' })

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () =>{
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch.state
}

export const useNotificationHandler = () => {
    const { dispatch } = useContext(NotificationContext)

    const setNotification = (message, style, timeout = 5000) => {
        dispatch({ type: 'SET_NOTIFICATION', payload: { message, style } })
        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, timeout)
    }

    return setNotification
}

export default NotificationContext