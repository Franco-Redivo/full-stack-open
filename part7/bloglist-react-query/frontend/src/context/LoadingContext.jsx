import { createContext, useContext, useReducer } from 'react'

const LoadingContext = createContext()

const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, [action.payload.key]: action.payload.isLoading }
    case 'CLEAR_ALL_LOADING':
      return {}
    default:
      return state
  }
}

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, {})

  const setLoading = (key, isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: { key, isLoading } })
  }

  const clearAllLoading = () => {
    dispatch({ type: 'CLEAR_ALL_LOADING' })
  }

  const isAnyLoading = Object.values(state).some(loading => loading)

  return (
    <LoadingContext.Provider value={{ 
      loadingStates: state, 
      setLoading, 
      clearAllLoading, 
      isAnyLoading 
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

// Hook for managing specific loading states
export const useLoadingState = (key) => {
  const { loadingStates, setLoading } = useLoading()
  
  const isLoading = loadingStates[key] || false
  
  const startLoading = () => setLoading(key, true)
  const stopLoading = () => setLoading(key, false)
  
  return { isLoading, startLoading, stopLoading }
}

export default LoadingContext
