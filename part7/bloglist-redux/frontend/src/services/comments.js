import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/comments'

const getComments = async (blogId = null) => {
  const url = blogId ? `${baseUrl}?blog=${blogId}` : baseUrl
  const response = await axios.get(url)
  return response.data
}

const createComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/`, { ...comment, blog: blogId })
  return response.data
}

const commentService = { getComments, createComment }
export default commentService

