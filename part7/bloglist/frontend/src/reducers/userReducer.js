import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        setUser(state,action){
            return action.payload
        },
        clearUser(){
            return null
        }
    }
})

export const logIn = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)
        if(!user || !user.token) {
            throw new Error('Invalid login response: missing token')
        }
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setUser(user))
        return user
    }
}

export const logOut = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        blogService.setToken(null)
        dispatch(clearUser())
    }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer