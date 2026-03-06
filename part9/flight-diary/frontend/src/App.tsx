import { useState, useEffect } from 'react';
import { getAllDiaryEntries } from './entryService';
import './App.css';
import DiaryEntriesList from './components/DiaryEntriesList';
import EntryForm from './components/EntryForm';
import type { DiaryEntry } from './types';


function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then(data => {
      setDiaryEntries(data);
    })
  },[]);

  return (
    <>
      <EntryForm setDiaryEntries={setDiaryEntries}/>
      <DiaryEntriesList diaryEntries={diaryEntries}/>
    </>
  )
}

export default App
