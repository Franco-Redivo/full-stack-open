import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer
  }
})


export default store