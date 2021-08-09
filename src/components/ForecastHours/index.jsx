import React from 'react';
import './style.css';
import { useState } from 'react';

function ForecastHours({forecast}) {
    const [daySelected, setDaySelected] = useState(0);

    const dateNow= new Date();
    const tab_jour= ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    let dayIndex = dateNow.getDay() + 1 + 1;

    if (dayIndex > 6){
        dayIndex = dayIndex - 7;
    }


    return (
        <React.Fragment >
            <h2>Prévisions par heures</h2>
            
            <div id='btn-day-forecast-container'>
                <button onClick={() => setDaySelected(0)} className={`btn-forecast ${daySelected === 0 && "btn-forecast_selected"}`} >Aujourd'hui</button>
                <button onClick={() => setDaySelected(1)} className={`btn-forecast ${daySelected === 1 && "btn-forecast_selected"}`} >Demain</button>
                <button onClick={() => setDaySelected(2)} className={`btn-forecast ${daySelected === 2 && "btn-forecast_selected"}`} >{tab_jour[dayIndex]}</button>
            </div>
            <ul id="forecast-list">
                {forecast.length > 0 && daySelected === 0 ? forecast[daySelected].map((forecastHour, index) => index >= dateNow.getHours() &&
                    <li key={forecastHour.time+index} >
                        <p>
                            {forecastHour.time.split(' ')[1]}
                        </p>
                        <img src={forecastHour.condition.icon} alt=""/>
                        <p>
                            {forecastHour.condition.text}
                        </p>
                        <p>
                            {forecastHour.temp_c}C°
                        </p>
                    </li>
                )
                : forecast.length > 0 &&
                forecast[daySelected].map((forecastHour, index) => 
                    <li key={forecastHour.time+index}>
                        <p>
                            {forecastHour.time.split(' ')[1]}
                        </p>
                        <img src={forecastHour.condition.icon} alt=""/>
                        <p>
                            {forecastHour.condition.text}
                        </p>
                        <p>
                            {forecastHour.temp_c}C°
                        </p>
                    </li>
                )}
                </ul>
        </ React.Fragment>
        
      
    )
  }
  
  export default ForecastHours
