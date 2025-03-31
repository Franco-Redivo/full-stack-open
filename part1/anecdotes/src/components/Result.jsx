const Result = ({votes,anecdotes}) => {
    const max = Math.max(...votes);
    const index = votes.indexOf(max);
    return(
        <p> { max > 0 ? anecdotes[index] : "no votes yet"} </p>
    );
}

export default Result;