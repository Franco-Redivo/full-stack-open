import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { addBlogToUser, removeBlogFromUser } from "./usersReducer";

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
    return async (dispatch, getState) => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlog(newBlog))
        
        // Update the user's blog count
        const currentUser = getState().user
        if (currentUser && newBlog.user) {
            dispatch(addBlogToUser({ 
                userId: newBlog.user.id || newBlog.user, 
                blog: newBlog 
            }))
        }
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
        
        // Remove the blog from the user's blog list
        if (blog.user) {
            dispatch(removeBlogFromUser({ 
                userId: blog.user.id || blog.user, 
                blogId: blog.id 
            }))
        }
    }
}

export const { likeBlog, appendBlog, setBlogs, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer