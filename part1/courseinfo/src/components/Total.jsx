const Total = (props) => {
    const parts = props.course.parts;
    const total = parts.reduce((sum,current) => sum + current.exercises, 0);
    return(
        <p>Number of exercises = {total}</p>
    );
}

export default Total;