import { createContext, useContext, useReducer } from 'react';

const BlogFormContext = createContext()

const blogFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_AUTHOR':
      return { ...state, author: action.payload }
    case 'SET_URL':
      return { ...state, url: action.payload }
    case 'RESET_FORM':
      return { title: '', author: '', url: '' }
    default:
      return state
  }
}

export const BlogFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogFormReducer, {
    title: '',
    author: '',
    url: ''
  })

  return (
    <BlogFormContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogFormContext.Provider>
  )
}
export const useBlogFormValue = () => {
  const blogFormContext = useContext(BlogFormContext)
  return blogFormContext.state
}
export const useBlogFormDispatch = () => {
  const blogFormContext = useContext(BlogFormContext)
  return blogFormContext.dispatch
}
export const setTitle = (dispatch, title) => {
  dispatch({ type: 'SET_TITLE', payload: title })
}
export const setAuthor = (dispatch, author) => {
  dispatch({ type: 'SET_AUTHOR', payload: author })
}
export const setUrl = (dispatch, url) => {
  dispatch({ type: 'SET_URL', payload: url })
}
export const resetForm = (dispatch) => {
  dispatch({ type: 'RESET_FORM' })
}
export default BlogFormContext