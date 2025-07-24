import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationHandler } from '../context/NotificationContext'

// Custom hook for managing blogs
export const useBlogs = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    refetchOnWindowFocus: false
  })

  return {
    blogs: result.data || [],
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error
  }
}

// Custom hook for managing user authentication
export const useUser = () => {
  const userResult = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if(loggedUserJSON){
        const currentUser = JSON.parse(loggedUserJSON)
        if(currentUser && currentUser.token){
          blogService.setToken(currentUser.token)
          return currentUser
        } else {
          // Remove invalid user data from localStorage
          window.localStorage.removeItem('loggedBlogappUser')
        }
      }
      return null
    }
  })

  return {
    user: userResult.data || null,
    isLoading: userResult.isLoading,
    isError: userResult.isError
  }
}

// Custom hook for creating new blogs
export const useCreateBlog = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationHandler()

  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setNotification(`A new blog "${newBlog.title}" by ${newBlog.author} added`, 'success')
    },
    onError: (error) => {
      setNotification(`Error creating blog: ${error.message}`, 'error')
    }
  })
}

// Custom hook for updating blogs (likes, etc.)
export const useUpdateBlog = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationHandler()

  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
      setNotification(`Blog "${updatedBlog.title}" updated`, 'success')
    },
    onError: (error) => {
      setNotification(`Error updating blog: ${error.message}`, 'error')
    }
  })
}

// Custom hook for deleting blogs
export const useDeleteBlog = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationHandler()

  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, deletedBlogId) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== deletedBlogId))
      setNotification(`Blog removed successfully`, 'success')
    },
    onError: (error) => {
      setNotification(`Error removing blog: ${error.message}`, 'error')
    }
  })
}

// Custom hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationHandler()

  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      queryClient.setQueryData(['user'], user)
      setNotification(`Welcome ${user.name}!`, 'success')
    },
    onError: (error) => {
      setNotification('Wrong credentials', 'error')
    }
  })
}

// Custom hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient()
  const setNotification = useNotificationHandler()

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    queryClient.setQueryData(['user'], null)
    queryClient.invalidateQueries(['blogs'])
    queryClient.invalidateQueries(['user'])
    setNotification('Logged out successfully', 'success')
  }

  return logout
}

// Helper hook for liking a blog
export const useLikeBlog = () => {
  const updateBlogMutation = useUpdateBlog()

  const likeBlog = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  return {
    likeBlog,
    isLoading: updateBlogMutation.isPending,
    error: updateBlogMutation.error
  }
}

// Helper hook for deleting a blog with confirmation
export const useDeleteBlogWithConfirm = () => {
  const deleteBlogMutation = useDeleteBlog()

  const deleteBlog = (blog) => {
    if(window.confirm(`Remove blog ${blog.title || blog.content} by ${blog.author}`)){
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return {
    deleteBlog,
    isLoading: deleteBlogMutation.isPending,
    error: deleteBlogMutation.error
  }
}
