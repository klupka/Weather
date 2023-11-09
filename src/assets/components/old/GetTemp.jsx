import axios from "axios";
import React, { useState } from "react";
import "../home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const GetTemp = ({
    IPData,
    // temp,
    // setTemp,
    // high,
    // setHigh,
    // low,
    // setLow,
    // isDay,
    // setIsDay,
    // feelsLike,
    // setFeelsLike,
    // hourlyForecast,
    // setHourlyForecast,
}) => {
    // Used a refresher
    const [counter, setCounter] = useState(0);

    // Get date information and format.
    const time = new Date();
    const hour = time.getHours();
    const year = time.getFullYear();
    // getMonth starts at 0, so +1 is needed.
    const month = time.getMonth() + 1;
    const day = time.getDate();

    /* take whatever hour it is and find it in the hourly temp_2m, but make sure the date matches*/
    /* Format hour/month/day to HH/MM/DD */
    let hourStr = hour.toString();
    let monthStr = month.toString();
    let dayStr = day.toString();
    if (hourStr.length < 2) hourStr = "0" + hourStr;
    if (monthStr.length < 2) monthStr = "0" + monthStr;
    if (dayStr.length < 2) dayStr = "0" + dayStr;

    /* YYYY-MM-DDTHH:HH */
    const formattedTime =
        year + "-" + monthStr + "-" + dayStr + "T" + hourStr + ":00";

    // try {
    //     axios
    //         .get(URL)
    //         .then((response) => {
    // setRegion(response.data.region);
    // setCity(response.data.city);
    // const latCoord = response.data.lat;
    // const lonCoord = response.data.lon;
    // const coordinatesStr =
    //     "?latitude=" + latCoord + "&longitude=" + lonCoord;
    // const forecastURL =
    //     forecastBaseURL +
    //     coordinatesStr +
    //     "&current=temperature_2m,apparent_temperature,is_day&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto";

    //             axios
    //                 .get(forecastURL)
    //                 .then((response) => {
    //                     let temp_num = Math.round(
    //                         response.data.current.temperature_2m
    //                     );
    //                     setFeelsLike(
    //                         Math.round(
    //                             response.data.current.apparent_temperature
    //                         )
    //                     );
    //                     setTemp(temp_num);
    // setHigh(
    //     Math.round(
    //         response.data.daily.temperature_2m_max[0]
    //     )
    // );
    // setLow(
    //     Math.round(
    //         response.data.daily.temperature_2m_min[0]
    //     )
    // );
    // // Set hourly forecast data
    // const hourlyForecastData =
    //     response.data.hourly.temperature_2m;
    // let twentyFourHourSlice =
    //     response.data.hourly.temperature_2m.slice(hour, 24); // does not include 24.
    // twentyFourHourSlice = twentyFourHourSlice.map(function (
    //     element
    // ) {
    //     return Math.round(element);
    // });
    // setHourlyForecast(twentyFourHourSlice);
    // console.log(hourlyForecast);

    //                     // Set is day
    //                     setIsDay(response.data.current.is_day);
    // if (response.data.current.is_day !== 1)
    //     import("../night.css");
    // if (response.data.current.is_day === 1)
    //     import("../day.css");

    //                     console.log("setTemp to " + temp_num);
    //                     console.log(response);
    //                 })
    //                 .catch((error) => {
    //                     console.log(
    //                         "An error occurred while getting temperature."
    //                     );
    //                 });
    //         })
    //         .catch((error) => {
    //             console.log("An error occurred while getting coordinates.");
    //         });
    //     console.log("Data successfully retrieved from APIs.");
    // } catch (error) {
    //     console.log("An error occurred with GetTemp().");
    // }

    // const cityStateStrTemp = city + ", " + region;
    // const cityStateStr = cityStateStrTemp.toUpperCase();

    return <></>;
};

export default GetTemp;

{
    // <div className="flex-container">
    //     <div className="flex-item">
    //         <div className="location_container">
    //             <div className="location_icon">
    //                 <FontAwesomeIcon icon={faLocationDot} />
    //             </div>
    //             <div className="location_text">{cityStateStr}</div>
    //         </div>
    //         <div className="temp_num_container">{temp}°</div>
    //         <div className="high_low_container">
    //             {high}° / {low}°
    //         </div>
    //         <div className="feels_like_container">Feels like {feelsLike}°</div>
    //         <div className="refresh_button_container">
    //             <button className="refresh_button">
    //                 <FontAwesomeIcon icon={faArrowsRotate} />
    //             </button>
    //         </div>
    //         <div className="hourly_forecast_container"></div>
    //         <div className="daily_forecast_container">
    //             - daily forecast until 7 days, list
    //         </div>
    //         <div className="open-meteo-container">
    //             Data provided by
    //             <a target="_blank" href="https://open-meteo.com/">
    //                 Open-Meteo
    //             </a>
    //         </div>
    //     </div>
    // </div>;
}
