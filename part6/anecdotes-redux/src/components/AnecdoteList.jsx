import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return(
        <li>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
            </div>
        </li>
    )

}


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if(state.filter === ''){
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const voteClick = (anecdote) =>{
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted for: '${anecdote.content}'`,10))
       
    }

    return (
        <ul>
            {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => voteClick(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList

