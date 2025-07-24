import { createContext, useContext, useState } from 'react'

const ErrorContext = createContext()

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null)
  const [hasError, setHasError] = useState(false)

  const clearError = () => {
    setError(null)
    setHasError(false)
  }

  const setGlobalError = (errorMessage, errorDetails = null) => {
    setError({ message: errorMessage, details: errorDetails })
    setHasError(true)
  }

  return (
    <ErrorContext.Provider value={{ 
      error, 
      hasError, 
      clearError, 
      setGlobalError 
    }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider')
  }
  return context
}

export default ErrorContext
