import type { DiaryEntry } from "../types";
import Entry from './Entry';

interface DiaryEntriesProps {
    diaryEntries: DiaryEntry[]
}

const DiaryEntriesList = ({diaryEntries}: DiaryEntriesProps) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaryEntries.map(entry => (
                <Entry key={entry.id} entry={entry}/>
            ))}

        </div>
    )
}

export default DiaryEntriesList;