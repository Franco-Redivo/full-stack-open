import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.get('/hello',(_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!height || !weight) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }
    if(isNaN(Number(height)) || isNaN(Number(weight))){
        return res.status(400).json({ error: 'values have to be numbers' });
    }

    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({ weight, height, bmi });
});

app.get('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target} = req.body;

    if(!daily_exercises || !target){
        return res.status(400).send({error: 'Parameters missing'});
    }
    if(!(daily_exercises instanceof Array) || isNaN(Number(target))){
        return res.status(400).send({error: 'Malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));

    return res.send({result});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});