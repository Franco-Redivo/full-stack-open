import Part from "./Part.jsx";

const Content = ({course}) => {
    const parts= course.parts;
    return(
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
        </div>
    );
    
}

export default Content;