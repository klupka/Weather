import "../home.css";
import * as icons from "../icons/Icons";
import PrecChart from "./PrecChart";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const DisplayData = ({ setIPData, IPData, setWeatherData, weatherData }) => {
    // Set city and region
    const region = IPData.region_code;
    const city = IPData.city;

    // Used a refresher
    const [counter, setCounter] = useState(0);

    // Get date information and format
    const time = new Date();
    const hour = time.getHours();
    const year = time.getFullYear();
    // getMonth starts at 0, so +1 is needed
    const month = time.getMonth() + 1;
    const day = time.getDate();

    // take whatever hour it is and find it in the hourly temp_2m, but make sure the date matches
    // Format hour/month/day to HH/MM/DD
    let hourStr = hour.toString();
    let monthStr = month.toString();
    let dayStr = day.toString();
    if (hourStr.length < 2) hourStr = "0" + hourStr;
    if (monthStr.length < 2) monthStr = "0" + monthStr;
    if (dayStr.length < 2) dayStr = "0" + dayStr;

    /* YYYY-MM-DDTHH:HH */
    const formattedTime =
        year + "-" + monthStr + "-" + dayStr + "T" + hourStr + ":00";

    // Combine city and region into one string
    let cityRegionStr = city + ", " + region;
    //cityRegionStr = cityRegionStr.toUpperCase();

    // Dynamic CSS Imports
    if (weatherData.current.is_day === 1) import("../day.css");
    if (weatherData.current.is_day === 0) import("../night.css");

    // Set current temperature
    const currentTemperature = Math.round(weatherData.current.temperature_2m);

    // Get high / low
    const high = Math.round(weatherData.daily.temperature_2m_max[0]);
    const low = Math.round(weatherData.daily.temperature_2m_min[0]);

    // Get feels like
    const currentFeelsLike = Math.round(
        weatherData.current.apparent_temperature
    );

    // Set hourly time data for the next 24hr
    let twentyFourHourTimeSlice = weatherData.hourly.time.slice(
        hour,
        hour + 25
    );

    // Format time to 12 hr clock
    let tempStr;
    let tempInt;
    let tempArr = [];
    // Iterate through each element in twentyFourHourTimeSlice
    for (let i = 0; i < twentyFourHourTimeSlice.length; i++) {
        // Remove unnecessary characters
        tempStr = twentyFourHourTimeSlice[i].slice(-5);
        tempStr = tempStr.slice(0, -3);
        // If tempStr has a 0 in the first position, then remove it, hence AM.
        if (tempStr[0] === "0") {
            tempStr = tempStr.slice(1);
        }
        tempInt = parseInt(tempStr);
        // If hour is below 12, add AM suffix (also 00 -> 12 midnight)
        if (tempInt < 12) {
            if (tempInt === 0) {
                tempStr = "12";
            }
            tempStr = tempStr + " AM";
        }
        // If hour is 12 and above, add PM suffix
        else if (tempInt >= 12) {
            // Makes sure 12 stays 12,instead of becoming 0
            if (tempInt !== 12) {
                tempInt = tempInt - 12;
            }
            tempStr = tempInt.toString();
            tempStr = tempStr + " PM";
        }
        tempArr.push(tempStr);
    }
    twentyFourHourTimeSlice = tempArr.slice();
    // Set current hour to display as 'Now'
    twentyFourHourTimeSlice[0] = "Now";

    // Set hourly temp data for the next 24hr
    let twentyFourHourTempSlice = weatherData.hourly.temperature_2m.slice(
        hour,
        hour + 25
    );
    // Round all elements
    twentyFourHourTempSlice = twentyFourHourTempSlice.map((element) => {
        return `${Math.round(element)}°`;
    });
    twentyFourHourTempSlice[0] = currentTemperature + "°";

    // Get 10-day forecast: Highs
    let tenDayHighs = weatherData.daily.temperature_2m_max.slice(0, 10);
    // Get 10-day forecast: Highs
    let tenDayLows = weatherData.daily.temperature_2m_min.slice(0, 10);
    // Combine high and lows into a single 2D array
    let tenDayHighsAndLows = [];
    for (let i = 0; i < 10; i++) {
        let roundedHigh = Math.round(tenDayHighs[i]); //+ "°"
        let roundedLow = Math.round(tenDayLows[i]);
        let roundedHighStr = roundedHigh.toString();
        roundedHighStr = roundedHighStr + "°";
        let roundedLowStr = roundedLow.toString();
        roundedLowStr = roundedLowStr + "°";
        tenDayHighsAndLows.push([roundedHighStr, roundedLowStr]);
    }

    // Get 10-day forecast: Dates
    let tenDayDates = weatherData.daily.time.slice(0, 10);

    // Convert date to weekday names
    function getDayName(dateStr, locale) {
        let date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: "long" });
    }
    // Reformat date to be usable
    let formattedTenDayDates = [];
    for (let i = 0; i < tenDayDates.length; i++) {
        let reformattedDay = tenDayDates[i].slice(-2);
        let reformattedMonth = tenDayDates[i].slice(5, 7);
        let reformattedYear = tenDayDates[i].slice(0, 4);
        let reformattedDate = `${reformattedMonth}/${reformattedDay}/${reformattedYear}`;
        let dayName = getDayName(reformattedDate, "en-US");
        dayName = dayName.slice(0, 3);
        formattedTenDayDates.push(dayName);
    }
    // Convert first day to "Today"
    formattedTenDayDates[0] = "Today";

    // Get all weather codes
    let currentWeatherCode = weatherData.current.weather_code;
    let hourlyWeatherCode = weatherData.hourly.weather_code.slice(
        hour,
        hour + 25
    );
    let tenDayWeatherCode = weatherData.daily.weather_code.slice(0, 10);
    // Create array to store next 24 hours of icons
    let hourlyWeatherIcons = [];
    for (let i = 0; i < hourlyWeatherCode.length; i++) {
        let desc = checkWMOCodes(hourlyWeatherCode[i]);
        let icon = weatherDescToIco(desc);
        hourlyWeatherIcons.push(icon);
    }

    // Create array to store next 10 days of icons
    let tenDayWeatherIcons = [];
    for (let i = 0; i < tenDayWeatherCode.length; i++) {
        let desc = checkWMOCodes(tenDayWeatherCode[i]);
        let icon = weatherDescToIco(desc);
        tenDayWeatherIcons.push(icon);
    }

    // WMO code table. I tried using switch, but this is the only way it worked.
    function checkWMOCodes(code) {
        let descStr;
        if (code === 0) descStr = "clear_sky";
        else if (code === 1 || code === 2 || code === 3)
            descStr = "partly_cloudy";
        else if (code === 45 || code === 48) descStr = "fog";
        else if (code === 51 || code === 53 || code === 55) descStr = "drizzle";
        else if (code === 56 || code === 57) descStr = "freezing_drizzle";
        else if (code === 61 || code === 63 || code === 65) descStr = "rain";
        else if (code === 66 || code === 67) descStr = "freezing_rain";
        else if (code === 71 || code === 73 || code === 75)
            descStr = "snow_fall";
        else if (code === 77) descStr = "snow_grains";
        else if (code === 80 || code === 81 || code === 82)
            descStr = "rain_showers";
        else if (code === 85 || code === 86) descStr = "snow_showers";
        else if (code === 95) descStr = "thunderstorm";
        else if (code === 96 || code === 99) descStr = "hail_thunderstorm";
        else descStr = "clear_sky";

        return descStr;
    }

    // Determine icon from weather code
    function weatherDescToIco(weatherCodeDesc) {
        let weatherIcon;
        switch (weatherCodeDesc) {
            case "clear_sky":
                if (weatherData.current.is_day === 1) weatherIcon = icons.sun;
                else weatherIcon = icons.moon;
                break;
            case "partly_cloudy":
                if (weatherData.current.is_day === 1)
                    weatherIcon = icons.cloudy_sun;
                else weatherIcon = icons.cloudy_moon;
                break;
            case "fog":
                weatherIcon = icons.fog;
                break;
            case "drizzle":
                weatherIcon = icons.drizzle;
                break;
            case "freezing_drizzle":
                weatherIcon = icons.freezing_drizzle;
                break;
            case "rain":
                weatherIcon = icons.rain;
                break;
            case "freezing_rain":
                weatherIcon = icons.rain;
                break;
            case "snow_fall":
                weatherIcon = icons.snow;
                break;
            case "snow_grains":
                weatherIcon = icons.snow;
                break;
            case "rain_showers":
                weatherIcon = icons.rain;
                break;
            case "snow_showers":
                weatherIcon = icons.snow;
                break;
            case "thunderstorm":
                weatherIcon = icons.thunder_cloud;
                break;
            case "hail_thunderstorm":
                weatherIcon = icons.thunder_cloud;
                break;
            default:
                console.log(
                    "Error in weatherDescToImg(): Unknown weather description."
                );
                break;
        }
        return weatherIcon;
    }

    // Now get icon using weather code and ico functions
    let currentWeatherDesc = checkWMOCodes(currentWeatherCode);
    let currentWeatherIcon = weatherDescToIco(currentWeatherDesc);

    // Combine hourly time and temp into a single array for displaying
    let hourlyTimeAndTemp = [];
    for (let i = 0; i < twentyFourHourTimeSlice.length; i++) {
        // Accurately represent icon for Now part of hourly. Matches current.
        if (i === 0) {
            hourlyTimeAndTemp.push([
                twentyFourHourTimeSlice[i],
                currentWeatherIcon,
                twentyFourHourTempSlice[i],
            ]);
        } else {
            // Do the rest of the 23 hours
            hourlyTimeAndTemp.push([
                twentyFourHourTimeSlice[i],
                hourlyWeatherIcons[i],
                twentyFourHourTempSlice[i],
            ]);
        }
    }

    // Array used to print values to 10-day forecast
    let tenDayForecastMasterArray = [];
    for (let i = 0; i < formattedTenDayDates.length; i++) {
        tenDayForecastMasterArray.push([
            formattedTenDayDates[i],
            tenDayWeatherIcons[i],
            tenDayHighsAndLows[i][0],
            tenDayHighsAndLows[i][1],
        ]);
    }

    // Get current humidity and wind data
    let currentHumidity = weatherData.current.relative_humidity_2m;
    let currentWindSpeed = weatherData.current.wind_speed_10m;

    return (
        <div className="flex_container">
            <div className="flex_item">
                <div className="location_container">
                    <div className="location_icon">
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className="location_text">{cityRegionStr}</div>
                    {/* <button
                        className="refresh_button"
                        onClick={() => {
                            setIPData([]);
                            setWeatherData([]);
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </button> */}
                </div>
                <div className="current_temperature_container">
                    {currentTemperature}°
                </div>
                <div className="current_weather_code">{currentWeatherIcon}</div>
                <div className="high_low_container">
                    <span className="high_low_container_high">{high}°</span>{" "}
                    <span className="high_low_container_low">{low}°</span>
                </div>
                <div className="feels_like_container">
                    Feels like {currentFeelsLike}°
                </div>

                <div className="refresh_button_container">
                    <button
                        onClick={() => {
                            setIPData([]);
                            setWeatherData([]);
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>
                </div>

                <div className="hourly_forecast_container">
                    <div className="hourly_forecast_title">Hourly forecast</div>
                    <div className="hourly_forecast_bg">
                        <div className="hourly_forecast_data_container">
                            {hourlyTimeAndTemp.map((item, index) => (
                                <div
                                    key={index}
                                    className="hourly_forecast_data_cell"
                                >
                                    <div className="hourly_forecast_time_and_temp hourly_time">
                                        {item[0]}
                                    </div>
                                    <div className="hourly_forecast_time_and_temp hourly_icon">
                                        {item[1]}
                                    </div>
                                    <div className="hourly_forecast_time_and_temp hourly_temp">
                                        {item[2]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="ten_day_forecast_container">
                    <div className="ten_day_forecast_title">
                        10-day forecast
                    </div>
                    <div className="ten_day_forecast_bg">
                        {tenDayForecastMasterArray.map((item, index) => {
                            return [
                                <div className="ten_day_forecast_rows">
                                    <div className="ten_day_forecast_column_day">
                                        {item[0]}
                                    </div>
                                    <div className="ten_day_forecast_column_icon">
                                        {item[1]}
                                    </div>
                                    <div className="ten_day_forecast_column_high">
                                        {item[2]}
                                    </div>
                                    <div className="ten_day_forecast_column_low">
                                        {item[3]}
                                    </div>
                                </div>,
                                <hr className="ten_day_forecast_hr" />,
                            ];
                        })}
                    </div>
                </div>

                <div className="current_conditions_container">
                    <div className="current_conditions_title">
                        Current Conditions
                    </div>
                    <div className="current_conditions_columns">
                        <div className="current_conditions_wind_container">
                            <div className="CC_wind_title">Wind</div>
                            <div className="CC_wind_icon">{icons.wind}</div>
                            <div className="CC_wind_data">
                                {currentWindSpeed} mph
                            </div>
                        </div>
                        <div className="current_conditions_humidity_container">
                            <div className="CC_humidity_title">Humidity</div>
                            <div className="CC_humidity_icon">
                                {icons.humidity}
                            </div>
                            <div className="CC_humidity_data">
                                {currentHumidity}%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prec_graph_container">
                    <div className="prec_graph_title">Precipitation</div>
                    <div className="prec_graph_bg">
                        <PrecChart
                            hour={hour}
                            twentyFourHourTimeSlice={twentyFourHourTimeSlice}
                            weatherData={weatherData}
                        />
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="data_sources_container">
                    <div className="source_container">
                        Location data provided by
                        <a target="_blank" href="https://ipwhois.io/">
                            IPWHOIS.IO
                        </a>
                    </div>
                    <div className="source_container">
                        Weather data provided by
                        <a target="_blank" href="https://open-meteo.com/">
                            Open-Meteo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayData;
