import { useState, useEffect } from "react";
import getWeather from "../services/weather.js";

const Weather = ({ capital, latitude, longitud}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
      getWeather(latitude, longitud).then((weather) => {
        setWeather(weather);
      });
    }, [latitude, longitud]);
  
    return (
      <>
        <h2>Weather in {capital}</h2>
        {weather === null ? (
          <p>Loading weather...</p>
        ) : (
          <>
            <p>temperature {weather.main.temp} Celsius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>wind {weather.wind.speed} m/s</p>
          </>
        )}
      </>
    );

}

export default Weather;