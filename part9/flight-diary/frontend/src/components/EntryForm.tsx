import { useState } from "react";
import { createDiaryEntry, getAllDiaryEntries } from "../entryService";
import type { DiaryEntry } from "../types";
import axios from "axios";

interface EntryFormProps {
    setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const EntryForm = ({ setDiaryEntries }: EntryFormProps) => {

    const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
    const visibilityOptions = ['great', 'good', 'ok', 'poor'];

    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('')
    const [comment, setComment] = useState('');
    const [ errorMessage, setErrorMessage] = useState('');


    const entryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const entryToAdd = {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment
        }
        try {
            await createDiaryEntry(entryToAdd);
            const data = await getAllDiaryEntries();
            setDiaryEntries(data);
            setDate('');
            setWeather('');
            setVisibility('');
            setComment('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;
                let backendReason = error.message;

                if (typeof responseData === 'string') {
                    backendReason = responseData;
                } else if (
                    responseData &&
                    typeof responseData === 'object' &&
                    'error' in responseData &&
                    typeof (responseData as { error: unknown }).error === 'string'
                ) {
                    backendReason = (responseData as { error: string }).error;
                } else if (
                    responseData &&
                    typeof responseData === 'object' &&
                    'message' in responseData &&
                    typeof (responseData as { message: unknown }).message === 'string'
                ) {
                    backendReason = (responseData as { message: string }).message;
                }

                setErrorMessage(backendReason);
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            } else {
                console.error(error);
            }
        }
    }


    return(
        <div>
            <span>{errorMessage}</span>
            <form onSubmit={entryCreation}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <span>weather: </span>
                    {weatherOptions.map((option, index) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name="weather"
                                value={option}
                                checked={weather === option}
                                onChange={() => setWeather(option)}
                                required={index === 0}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div>
                    <span>visibility: </span>
                    {visibilityOptions.map((option, index) => (
                        <label key={option}>
                            <input
                                type="radio"
                                name="visibility"
                                value={option}
                                checked={visibility === option}
                                onChange={() => setVisibility(option)}
                                required={index === 0}
                            />
                            {option}
                        </label>
                    ))}
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default EntryForm;