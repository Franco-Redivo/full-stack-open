const Anecdote = ({anecdote}) => {
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>has {anecdote.votes} votes</div>
            <div>For more info see <a href={anecdote.info}></a></div>
        </div>
    )
}

export default Anecdote

