import { useCreateBlog } from '../hooks/useBlogs'

// Custom hook for handling blog form logic
export const useBlogForm = () => {
  const createBlogMutation = useCreateBlog()

  const addBlog = async (blogData) => {
    try {
      await createBlogMutation.mutateAsync(blogData)
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error // Re-throw to allow component to handle error display
    }
  }

  return {
    addBlog,
    isLoading: createBlogMutation.isPending,
    error: createBlogMutation.error
  }
}
