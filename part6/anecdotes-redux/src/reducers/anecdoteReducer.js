import { createSlice, current } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    createAnecdote(state,action){
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      console.log(current(state))
      return state.map(anecdote => anecdote.id != id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer