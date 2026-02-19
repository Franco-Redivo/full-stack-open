interface BmiValues {
    height: number;
    weight: number;
}

const bmiParseArguments = (args: string[]): BmiValues => {
    if(args.length > 4) throw new Error('Too many arguments');
    if(args.length < 4) throw new Error('Not enough arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            height: Number(args[2]),
            weight: Number(args[3])
        };
    }else{
        throw new Error('Provided arguments were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const bmi: number = weight / Math.pow(heightInMeters,2);
    let clasification: string;

    if( bmi < 18.5 ){
        clasification = 'underweight';
    }else if ( bmi >= 18.5 && bmi <= 24.9 ){
        clasification = 'normal weight';
    }else if ( bmi >= 25 && bmi <= 29.9 ){
        clasification = 'overweight';
    }else{
        clasification = 'obese';
    }

    return clasification;

};

//underweight (under 18.5 ), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or more)
if (require.main === module) {
    try{
        const { height, weight } = bmiParseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    }catch(error: unknown){
        let errorMessage: string = 'something went wrong';
        if( error instanceof Error ){
            errorMessage += error.message;
        }

        console.log(errorMessage);
    }
}