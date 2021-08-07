import React, {useEffect, useState} from 'react';
import './style.css';
import Search from '../../components/Search'
import Geolocalisation from '../../components/Geolocalisation'
import Weather from '../../components/Weather'
import WeatherCard from '../../components/WeatherCard'
import axios from 'axios';
import ForecastHours from '../../components/ForecastHours';


const Home = () => {
  
  const [homePage, setHomePage] = useState("noSearch");
  const [cityWeather, setCityWeather] = useState({});
  const [cityLocation, setCityLocation] = useState({});
  const [weatherForecast, setweatherForecast] = useState([]);
  const [cities, setCities] = useState([]);
  
  let params = (new URL(document.location)).searchParams;
  let queryString = params.get('search');


  const getDataFromApi = (lat, long) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=56e420e8280d4f05a3593154212107&q=${lat},${long}&days=3&lang=fr&aqi=no`;
    axios.get(url)
      .then(function (response) {
        // handle success
        setCityWeather(response.data.current);
        setCityLocation(response.data.location);
        setweatherForecast(response.data.forecast.forecastday);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return error
      });
    }

    function geolocation () {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
      
        return getDataFromApi(lat, long);
      });
    }

    const getSearchApi = (city) => {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=56e420e8280d4f05a3593154212107&q=${city}&days=3&lang=fr&aqi=no`;
      axios.get(url)
        .then(function (response) {
          // handle success
          setCityWeather(response.data.current);
          setCityLocation(response.data.location);
          setweatherForecast(response.data.forecast.forecastday);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          return error
        });
    }
    
    useEffect(() => {
      if (queryString){
        getSearchApi(queryString);
      } else {
        geolocation();
      }
    }, []);

   const forecast = weatherForecast.slice(1);

   const tabCity = [
     "Paris", "Dieppe", "Lille", "Nancy", "Nice", "Marseille", "Agen", "Argenteuil", "Brest", "Lyon", "Toulouse", "Nantes", "Montpellier", "Strasbourg",
     "Bordeaux", "Rennes", "Reims", "Saint-Etienne", "Le Havre", "Toulon", "Grenoble", "Dijon", "Angers", "Nîmes", "Villeurbanne", "Saint Denis", 
     "Aix en Provence", "Le Mans", "Clermont Ferrand", "Tours", "Amiens", "Limoges", "Annecy", "Perpignan"
   ]

  function getSearch(value){
    const result = tabCity.filter((search) => search.toLocaleLowerCase().slice(0, value.length) === value.toLocaleLowerCase() && search);
    // je limite le nombre de résultats à 10
    result.length = 10;
    setCities(result);
  }

  function animateResearchPage(string){
    if (string === 'close-search'){
      setTimeout(() => animateResearchPage('noSearch'), 1000);
      setHomePage(string);
    } else {
      setHomePage(string);
    }
  }

  const isDesktop = window.matchMedia("only screen and (min-width: 500px)").matches;

  return (
    
    <React.Fragment>
      <div id="container">
        <div className= "Actual_weather_container">
          <header>
            <Search> 
              <button id="btn-search" onClick={() => animateResearchPage('research') } >Rechercher une ville</button>
            </Search>
            <Geolocalisation>
              <button id="btn-geolocalisation" onClick={geolocation} ></button>
            </Geolocalisation>
          </header>
            <Weather country={cityLocation.country} city={cityLocation.name} region={cityLocation.region} localTime={cityLocation.localtime} 
              condition={cityWeather.condition} temperature={cityWeather.temp_c}
            />
  
          {isDesktop === false && 
          <div id="forecast_container">
            <ForecastHours forecast={weatherForecast.map(weatherHour => weatherHour.hour)} />
          </div>}
  
        </div>
  
  
        <div className= "Future_weather_container">
          <div id="cards-container">
            {forecast.map((card, index) => <WeatherCard key={card.date + index} data={card} name={index} />)}
          </div>
          <div id="infos-today-cards">
            <h2>Aujourd'hui</h2>
            <div className= "infos-today">
              <h3>Force du vent</h3>
              <div>{`${cityWeather.gust_kph}  Km/H`}</div>
            </div>
            <div className= "infos-today">
              <h3>Hygrométrie</h3>
              <div>{`${cityWeather.humidity} %`}</div>
              <progress id="file" max="100" value={cityWeather.humidity}> </progress>
            </div>
          </div>
        </div>
      </div>

      {isDesktop && 
      <div id="forecast_container">
        <ForecastHours forecast={weatherForecast.map(weatherHour => weatherHour.hour)} />
      </div>}

      <div className={homePage} id="search_container" >
        <button id="return-home" onClick={() => animateResearchPage('close-search')} ></button>
        <form id="search-form">
          <span id="search-section">
            <div id="loupe"></div>
            <input type="search" name="search" id="search-bar" onChange={(event) => getSearch(event.target.value)} placeholder="Rechercher une ville" />
            <button type="submit" >Search</button>
          </span>
        </form>
        <ul id="list-cities" >
          {cities.map((city, index) => <a href={`/?search=${city}`} key={city + index} ><li className="li-city"  >{city}</li></a>)}
        </ul>
      </div>

    </React.Fragment>
  )  

}

  



export default Home;