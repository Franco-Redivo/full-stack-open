import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state,actions){
            return actions.payload
        },
        appendComment(state,action){
            state.push(action.payload)
        }
    }
})


export const fetchComments = (blogId) => {
    return async (dispatch) => {
        const comments = await commentService.getComments(blogId)
        dispatch(setComments(comments))
    }
}

export const createComment = (blogId, comment) => {
    return async (dispatch) => {
        try {
            const newComment = await commentService.createComment(blogId, comment)
            dispatch(appendComment(newComment))
        } catch (error) {
            console.error('Error creating comment:', error)
            throw error
        }
    }
}

export const { setComments, appendComment } = commentsSlice.actions
export default commentsSlice.reducer