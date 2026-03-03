import Part from './Part';
import type { CoursePart } from '../types';
import '../App.css';

/*interface CoursePartProps {
    name: string;
    exerciseCount: number;
}*/

interface ContentProps {
    courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(part => (
          <Part key={part.name} part={part}/>
            
        ))}
        </div>

    )
}

export default Content;