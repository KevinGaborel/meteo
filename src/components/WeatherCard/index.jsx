import React from 'react'
import './style.css'

function WeatherCard({data, name}) {
    const ladate= new Date();
    const tab_jour= ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let dayIndex = ladate.getDay() + 1 + name;

    if (dayIndex > 6){
        dayIndex = dayIndex - 7;
    }
    
    return (
        <React.Fragment>
            <div className= "card">
                <div>{tab_jour[dayIndex]}</div>
                <img src={data.day.condition.icon} alt={data.day.condition.text} />
                <p className="card-temp" >{`${data.day.avgtemp_c}C°`} <span className="max-temp" >{`${data.day.maxtemp_c}C°`}</span> </p>
            </div>
          
        </ React.Fragment>
    )
  }
  
  export default WeatherCard