import React from 'react';
import './style.css'

function Weather({country, city, region, localTime, temperature, condition}) {

    const tabCondition = [];
    for (const value in condition){
        tabCondition.push(condition[value]);
    }
    

    let date = `${localTime}`;
    date = date.split(' ');
    const hours = date[1];
    date = date[0];
    date = date.split('-').reverse().join("-");
   
    let idCondition;

    switch(tabCondition[0]){
        case "Ensoleillé":
            idCondition = "sunny";
            break;
        case "Averse de pluie légère":
            idCondition = "light-rain";
            break;
        case "Pluie éparse à proximité":
            idCondition = "light-rain";
            break;
        case "Pluie modérée":
            idCondition = "rain";
            break;
        case "Couvert":
            idCondition = "heavy-cloud";
            break;
        case "Partiellement nuageux":
            idCondition = "light-cloud";
            break;
        default:
            idCondition = "sunny";
            break;
    }

    return (
        <div className= "Weather_container">
            <div id="time" >{hours}</div>
            <div className="container-img-condition" id={idCondition}></div>
            <div id="temperature">{`${temperature}C°`}</div>
            <div id="condition">{tabCondition[0]}</div>
            <div className="infos" id="date" >Aujourd'hui le {date}</div>
            <div className="infos-location" id="city" >{city}</div>
            <div className="infos-location" id="region" >{region}</div>
            <div className="infos-location" id="country" >{country}</div>
        </div>
      
    )
  }
  
  export default Weather