import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        likeBlog(state,action){
            const id = action.payload
            const index = state.findIndex(blog => blog.id === id)
            state[index].likes += 1
        },
        appendBlog(state,action){
            state.push(action.payload)
        },
        setBlogs(state,action){
            return action.payload
        },
        removeBlog(state,action){
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }

    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const like = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update({
            ...blog,
            likes: blog.likes + 1,
        })
        dispatch(likeBlog(updatedBlog.id))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
    }
}

export const { likeBlog, appendBlog, setBlogs, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer