import Part from "./Part.jsx";

const Content = (props) => {
    const parts= props.course.parts;
    return(
        <div>
            {parts.map(part => <Part part={part.name} exercise={part.exercises}/>)}
        </div>
    );
    
}

export default Content;