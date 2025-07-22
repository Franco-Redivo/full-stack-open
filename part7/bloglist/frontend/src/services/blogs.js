import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getAuthor = async (id) => {
  const request = await axios.get(`${ baseUrl }/${id}`)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: {Authorization: token},
  }
  
  const request = await axios.put(`${ baseUrl }/${blog.id}`, blog, config)
  return request.data
}

const remove = async id => {
  const config = {
    headers: {Authorization: token},
  }

  const request = await axios.delete(`${ baseUrl }/${id}`, config)
  return request.data
}

const blogService = { getAll, create, update, setToken, getAuthor, remove }
export default blogService