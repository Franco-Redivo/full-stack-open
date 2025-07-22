import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notoficationReducer"
import userReducer from "./reducers/userReducer.js"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer:{
        blogs: blogReducer,
        notifications: notificationReducer,
        user: userReducer,
    }
})

export default store