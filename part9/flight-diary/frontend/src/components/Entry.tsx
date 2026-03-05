import type { DiaryEntry } from "../types";

interface EntryProps {
    entry: DiaryEntry
}

const Entry = ({entry} : EntryProps ) => {
    return (
        <div>
            <p>date: {entry.date}</p>
            <p>weather: {entry.weather}</p>
            <p>visibility: {entry.visibility}</p>
        </div>
    )

}

export default Entry;