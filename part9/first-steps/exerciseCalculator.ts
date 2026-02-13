interface ExerciseValues {
    target: number;
    hoursArray: number[];
}
interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseParseArguments = (args: string[]): ExerciseValues => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(isNaN(Number(args[2]))) throw new Error('Target has to be a number');

    let hoursArray: number[] = []; 

    for(let i: number = 3; i < args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error(`Provided exercise hours at position ${i} were not numbers`);
        }
        hoursArray.push(Number(args[i]));
    }

    return{
        target: Number(args[2]),
        hoursArray: hoursArray
    }

}

const calculateExercises = (exerciseHours: number[], target: number): Results => {
    const numerOfDays: number = exerciseHours.length;
    let trainingDays: number = 0;
    let sumOfHours: number = exerciseHours.reduce((sum, current) => sum += current, 0);
    const average: number = sumOfHours / numerOfDays;
    const success: boolean = average >= target ? true : false;
    let rating: number = 0;
    const ratingDescriptions : string[] = ['very bad', 'not bad but could be better', 'very good'];

    if(average / target >= 1){
        rating = 3;
    }else if(average / target >= 0.75 && average / target < 1){
        rating = 2;
    }else if(average / target < 0.75){
        rating = 1;
    }

    exerciseHours.forEach( hours => {
        if( hours > 0 ){
            trainingDays++;
        }
    })

    return{
        periodLength: numerOfDays,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescriptions[rating - 1],
        target: target,
        average: average
    }
}

try{
    const { target, hoursArray } = exerciseParseArguments(process.argv);
    console.log(calculateExercises(hoursArray, target));
}catch(error: unknown){
    let errorMessage: string = 'something went wrong. ';
    if( error instanceof Error ){
        errorMessage += error.message;
    }

    console.log(errorMessage);
}

/*{ 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}*/