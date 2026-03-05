import { useState, useEffect } from 'react';
import { getAllDiaryEntries } from './entryService';
import './App.css';
import DiaryEntriesList from './components/DiaryEntriesList';
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
      <DiaryEntriesList diaryEntries={diaryEntries}/>
    </>
  )
}

export default App
