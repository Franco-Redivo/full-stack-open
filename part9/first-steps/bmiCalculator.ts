

const calculateBmi = (height: number, weight: number): string => {
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

}

//underweight (under 18.5 ), normal weight (18.5 to 24.9), overweight (25 to 29.9), and obese (30 or more)
console.log(calculateBmi(180, 74))