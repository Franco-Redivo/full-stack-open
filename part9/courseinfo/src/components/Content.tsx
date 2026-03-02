
interface CoursePartProps {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: CoursePartProps[];
}

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(part => (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        ))}
        </div>

    )
}

export default Content;