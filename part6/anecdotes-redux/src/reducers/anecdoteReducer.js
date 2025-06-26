import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    voteAnecdote(state, action){
      const id = action.payload
      const index = state.findIndex((a) => a.id === id)
      state[index].votes += 1
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    console.log(anecdote)
    const votedAnecdote = await anecdoteService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(voteAnecdote(votedAnecdote.id))
  }
}


export const {  voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer