import { useDispatch } from 'react-redux'
import anecdoteReducer, {createAnecdote, voteAnecdote} from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(addNotification(`You added anecdote: '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
    
    return(
        <div>
            <h2>create new</h2>
                <form onSubmit={addAnecdote}>
                    <input name='anecdote' type='text' />
                    <button type='submit'>create</button>
                </form>
        </div>        
    )

}

export default AnecdoteForm