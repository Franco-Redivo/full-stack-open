import { useState } from 'react';
import Title from "./components/Title.jsx";
import Button from "./components/Button.jsx";
import Results from "./components/Results.jsx";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonCLick = (setter, value) => {
    setter(value + 1);
  }

  const titleText = "Give feedback";

  
  return (
    <div>
      <Title text={titleText}/>
      <div className='buttons'>
        <Button onClick={() => handleButtonCLick(setGood, good)} text={"Good"} />
        <Button onClick={() => handleButtonCLick(setNeutral, neutral)} text={"Neutral"} />
        <Button onClick={() => handleButtonCLick(setBad, bad)} text={"Bad"} />
      </div>
      <Results good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App;
