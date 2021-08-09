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

    if(tabCondition[2] === 1000){
        idCondition = "sunny";
    }else if ((tabCondition[2] === 1003) || (tabCondition[2] === 1150) || (tabCondition[2] === 1153)){
        idCondition = "light-cloud";
    }else if ((tabCondition[2] === 1006) || (tabCondition[2] === 1009) || (tabCondition[2] === 1030) || (tabCondition[2] === 1135) || (tabCondition[2] === 1168)){
        idCondition = "heavy-cloud";
    }else if ((tabCondition[2] === 1063) || (tabCondition[2] === 1240) || (tabCondition[2] === 1243)){
        idCondition = "light-rain";
    }else if ((tabCondition[2] === 1180) || (tabCondition[2] === 1183) || (tabCondition[2] === 1186)){
        idCondition = "rain";
    }else if ((tabCondition[2] === 1189) || (tabCondition[2] === 1192) || (tabCondition[2] === 1195) || (tabCondition[2] === 1246)){
        idCondition = "heavy-rain";
    }else if ((tabCondition[2] === 1066) || (tabCondition[2] === 1069) || (tabCondition[2] === 1072) || (tabCondition[2] === 1114) 
    || (tabCondition[2] === 1198) || (tabCondition[2] === 1204) || (tabCondition[2] === 1210) || (tabCondition[2] === 1213) || (tabCondition[2] === 1216) ||
    (tabCondition[2] === 1219) || (tabCondition[2] === 1249) || (tabCondition[2] === 1255) || (tabCondition[2] === 1261)){
        idCondition = "light-snow";
    }else if ((tabCondition[2] === 1117) || (tabCondition[2] === 1147) || (tabCondition[2] === 1171) || (tabCondition[2] === 1201) || (tabCondition[2] === 1207)
    || (tabCondition[2] === 1222) || (tabCondition[2] === 1225) || (tabCondition[2] === 1237) || (tabCondition[2] === 1252) || (tabCondition[2] === 1258) ||
    (tabCondition[2] === 1264)){
        idCondition = "heavy-snow";
    }else if((tabCondition[2] === 1087) || (tabCondition[2] === 1273) || (tabCondition[2] === 1276) || (tabCondition[2] === 1279) || (tabCondition[2] === 1282)){
        idCondition = "light-storm";
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