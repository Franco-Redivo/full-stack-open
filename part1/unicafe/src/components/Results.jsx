import StaticLine from "./StaticLine.jsx";

const Results = ({good, bad, neutral}) => {
    const all = good + bad + neutral;
    const average = all === 0 ? 0 : (good - bad) / all;
    const positive = all === 0 ? 0 : good / all * 100;
    const cleanAverage = (Math.round(average * 100) / 100).toFixed(2);
    const cleanPositive =(Math.round(positive * 100) / 100).toFixed(2);
    return(
        <div>
            <h2>Statistics</h2>
            {all !== 0 ? 
                <table className="stats-table">
                    <StaticLine text="good" value={good}/>
                    <StaticLine text="neutral" value={neutral}/>
                    <StaticLine text="bad" value={bad}/>
                    <StaticLine text="all" value={all}/>
                    <StaticLine text="average" value={cleanAverage}/>
                    <StaticLine text="positive" value={cleanPositive + " %"}/>
                </table>
                :
                <p>No feedback given</p>
            }
        </div>
        
    );
}

export default Results;