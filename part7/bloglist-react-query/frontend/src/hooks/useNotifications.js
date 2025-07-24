import { useNotificationHandler } from '../context/NotificationContext'
import { useError } from '../context/ErrorContext'

// Enhanced hooks that integrate notifications with your React Query operations
export const useNotifiedMutation = (mutationHook, options = {}) => {
  const setNotification = useNotificationHandler()
  const { setGlobalError } = useError()
  
  const {
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    ...restOptions
  } = options

  const mutation = mutationHook({
    ...restOptions,
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        const message = typeof successMessage === 'function' 
          ? successMessage(data, variables) 
          : successMessage
        setNotification(message, 'success')
      }
      onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      const message = errorMessage || `Operation failed: ${error.message}`
      setNotification(message, 'error')
      setGlobalError(message, error)
      onError?.(error, variables, context)
    }
  })

  return mutation
}

// Hook for showing loading states in notifications
export const useLoadingNotification = () => {
  const setNotification = useNotificationHandler()
  
  const showLoading = (message = 'Loading...') => {
    setNotification(message, 'loading', 0) // 0 timeout means no auto-clear
  }
  
  const hideLoading = () => {
    setNotification(null, 'notification')
  }
  
  return { showLoading, hideLoading }
}
