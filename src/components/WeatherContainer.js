import React, { useState } from "react";
import "../styles/Weather.css";
import WeatherInfo from "./WeatherInfo";
const WeatherContainer = () => {
  const API_KEY = "e84884dd9d2c8f8b8265ab8dbfc002a4";
  const [searcQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null
  });

  const [isValidCityName, setIsValidCityName] = useState(true);

  const updateSearchQuery = e => {
    let CityName = e.target.value;
    let isValid = setIsValidCityName(CityName);
    setSearchQuery(CityName);
    if (isValid || CityName === "" ) {
      setIsValidCityName(true);
    } else {
      setIsValidCityName(false);
    }
  };

  const validateCityName = CityName => {
    // let regex = /[0-9]{5}/;
    let regex = /[A-Za-z0-9]/;
    return regex.test(CityName);
  };

//// get data(weather information) from openweathermap.org ////
  const getWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searcQuery},nl&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => setWeatherData({
    temp: convertToSantigrad(data.main.temp),
    humidity: data.main.humidity,
    desc: data.weather[0].main,
    city: data.name
    }))
  }
  // kelvein to santigrad //
   const convertToSantigrad = (temp) => {
     return(temp - 273.15).toFixed(0);
   }

  return (
    <section className="weather-container">
      <header className="weather-header">
        <h3>Weather</h3>
        <div>
          <input
            placeholder="City Name"
            className="search-input"
            onChange={updateSearchQuery}
          />
          <button onClick={getWeatherData} className="material-icons">search</button>
        </div>
      </header>
      {/* <p className="error">{isValidCityName === true ? "" : "Invalid City"}</p> */}
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No Weather to Display<i className="material-icons">wb_sunny</i>
          </p>
        ) : (
        <WeatherInfo data={weatherData} />
        )}
      </section>
    </section>
  );
};

export default WeatherContainer;
