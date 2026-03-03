import type { CoursePart } from "../types"
import '../App.css';

interface PartProps {
    part: CoursePart
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: PartProps) => {
    switch(part.kind){
        case "basic":
            return (
                <div className="part-section">
                    <h2>{part.name}</h2>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>{part.description}</p>
                </div>
            )
        case "group":
            return (
                <div className="part-section">
                    <h2>{part.name}</h2>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>groupProjectCount: {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div className="part-section">
                    <h2>{part.name}</h2>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>{part.description}</p>
                    <p> material: {part.backgroundMaterial} </p>
                </div>
            )
        case "special":
            return (
                <div className="part-section">
                    <h2>{part.name}</h2>
                    <p>exercise count: {part.exerciseCount}</p>
                    <p>{part.description}</p>
                    <p> requirements: {part.requirements.join(', ')} </p>
                </div>
            )

        default:
            return assertNever(part);
    }
}

export default Part;