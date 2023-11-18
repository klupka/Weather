import { useEffect } from "react";

const GetWeatherData = ({ setWeatherData, IPData }) => {
    const forecastBaseURL = "https://api.open-meteo.com/v1/forecast";
    const forecastParams =
        "&current=temperature_2m,apparent_temperature,is_day,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,precipitation_probability&daily=precipitation_probability_max,weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=GMT&forecast_days=14&current=weather_code&hourly=weather_code&daily=weather_code&wind_speed_unit=mph";

    if (IPData.length !== 0) {
        //const latCoord = IPData.lat;
        //const lonCoord = IPData.lon;
        const latCoord = IPData.latitude;
        const lonCoord = IPData.longitude;
        const coordinatesStr =
            "?latitude=" + latCoord + "&longitude=" + lonCoord;
        const forecastURL = forecastBaseURL + coordinatesStr + forecastParams;

        useEffect(() => {
            let isSubscribed = true;

            // declare the async data fetching function
            const fetchData = async () => {
                // get the data from the api
                const data = await fetch(forecastURL);
                // convert the data to json
                const json = await data.json();

                // set state with the result if `isSubscribed` is true
                if (isSubscribed) {
                    console.log("weatherData set");
                    setWeatherData(json);
                    // console.log(json);
                }
            };

            // call the function
            fetchData()
                // make sure to catch any error
                .catch(console.error);

            // cancel any future `setData`
            return () => (isSubscribed = false);
        }, []);
    }
};

export default GetWeatherData;
