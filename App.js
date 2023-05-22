import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  //Here we took the API and added our own key in it. Where it says location, we added ${} to make that data dynamic. 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=721897389b181696bbcc5008ef436f82`

  //If the search location is entered and enter button pressed, get data from the API:
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      //this is emtying the searchbar after we pressed enter
      setLocation('')
    }
  }

  //below inside div with search className, we are introducing our location as value and setLocation as onChange event.
  //Normaly when i first started to design the page, i gave value for the location, temperature etc. Just to see them on the screen. Now after everyting else is finished we can add the {data.name} instead of Dallas for example to make the update automatic. toFixed() is preventing the decimal values on screen.
  //instead of 60 °F for the temp, we want to get this value from the API. First we make sure there is a value in data.main for us. After this, we use the data.main.temp the path in the API to reach this data based on the location. 
  //description: instead of writing cloud ourselves, we want to import this data from the API as well. First we are checking the location of this data in API and creating the path to there. 
  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyUp= {searchLocation}
        placeholder='Enter Location'
        type='text' />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className= 'bold' >{data.main.feels_like.toFixed()} °C</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className= 'bold'>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className= 'bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            <p>Wind Speed</p>
            </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
