import Header from './Header.jsx';
import Content from "./Content.jsx";

const Course = ({course}) => {
    return(
        <div>
            <Header name={course.name}/>
            <Content course={course}/>
        </div>
    );
}

export default Course;