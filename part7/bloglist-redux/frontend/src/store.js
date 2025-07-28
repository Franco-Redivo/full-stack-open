import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notoficationReducer"
import userReducer from "./reducers/userReducer.js"
import usersReducer from "./reducers/usersReducer.js"
import commentReducer from "./reducers/commentReducer.js"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{
        blogs: blogReducer,
        notifications: notificationReducer,
        user: userReducer,
        users: usersReducer,
        comments: commentReducer,
    }
})

export default store