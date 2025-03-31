import Header from './Header.jsx';
import Content from "./Content.jsx";
import Total from "./Total.jsx";

const Course = ({course}) => {
    return(
        <div>
            <Header name={course.name}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    );
}

export default Course;