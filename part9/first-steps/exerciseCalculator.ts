interface Results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): Results => {
    const numerOfDays: number = exerciseHours.length;
    let trainingDays: number = 0;
    let sumOfHours: number = exerciseHours.reduce((sum, current) => sum += current, 0);
    const average: number = sumOfHours / numerOfDays;
    const success: boolean = average >= target ? true : false;
    let rating: number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));

/*{ 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}*/