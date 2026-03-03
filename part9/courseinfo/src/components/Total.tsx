
interface TotalProps {
    totalExercises: number;
}

const Total = (props: TotalProps) => {
    return (
        <p className="total">
           Total number of exercises {props.totalExercises}
        </p>

    )
}

export default Total;