import { useBlogForm } from '../hooks/useBlogForm'
import { useBlogFormValue, useBlogFormDispatch, setAuthor, setTitle, setUrl, resetForm } from '../context/BlogFormContext'
import { useNotificationHandler } from '../context/NotificationContext'

const BlogForm = () => {
  const { addBlog, isLoading, error } = useBlogForm()
  const setNotification = useNotificationHandler()

  const { title, author, url } = useBlogFormValue()
  const dispatch = useBlogFormDispatch()

  const onChangeTitle = (event) => {
    setTitle(dispatch, event.target.value)
  }

  const onChangeAuthor = (event) => {
    setAuthor(dispatch, event.target.value)
  }

  const onChangeUrl = (event) => {
    setUrl(dispatch, event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      setNotification('All fields are required', 'error')
      return
    }

    try {
      await addBlog({
        title,
        author,
        url
      })

      // Clear form on success
      resetForm(dispatch)
      
      // Success notification is handled in the hook
    } catch (error) {
      // Error notification is handled in the hook
      console.error('Blog creation failed:', error)
    }
  }
    
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            data-testid='title'
            type="text"
            value={title}
            name="title"
            onChange={onChangeTitle}
            disabled={isLoading}
          />
        </div>
        <div>
          author:
          <input
            data-testid='author'
            type="text"
            value={author}
            name="author"
            onChange={onChangeAuthor}
            disabled={isLoading}
          />
        </div>
        <div>
          url:
          <input
            data-testid='url'
            type="text"
            value={url}
            name="url"
            onChange={onChangeUrl}
            disabled={isLoading}
          />
        </div>
        <button data-testid='create-button' type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'create'}
        </button>
      </form>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Error: {error.message}
        </div>
      )}
    </div>
  )
}

export default BlogForm
