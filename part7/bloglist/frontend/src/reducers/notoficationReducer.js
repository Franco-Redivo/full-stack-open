import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: { content: '', style: '' },
    reducers:{
        addNotification(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return { content: '', style: '' }
        }
    }
})

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export const {addNotification, removeNotification} = notificationSlice.actions

export default notificationSlice.reducer