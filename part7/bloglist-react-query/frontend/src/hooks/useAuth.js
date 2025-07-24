import { useLogin } from '../hooks/useBlogs'

// Custom hook for handling login form logic
export const useLoginForm = () => {
  const loginMutation = useLogin()

  const handleLogin = async (user) => {
    const { username, password } = user
    
    try {
      await loginMutation.mutateAsync({ username, password })
    } catch (exception) {
      console.error('Login failed:', exception)
      throw exception // Re-throw to allow component to handle error display
    }
  }

  return {
    handleLogin,
    isLoading: loginMutation.isPending,
    error: loginMutation.error
  }
}
