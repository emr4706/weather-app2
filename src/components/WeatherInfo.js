import React from "react";
import '../styles/Weather.css';

const WeatherInfo = ({ data: { temp, humidity, city, desc } }) => {
  return (
    <>
      <h3>{desc}</h3>
      <section className="weather-data-flex">
       <div className="header-description">
        <h4>City</h4>
        <p>{city}</p>
      </div>
      <div className="header-description">
        <h4>Temperature</h4>
        <p>{temp}<span className="degree-symbol">C</span></p>
      </div>
      <div className="header-description">
        <h4>Humidity</h4>
        <p>{humidity}%</p>
      </div>   
      </section>
      
    </>
  );
};

export default WeatherInfo;
