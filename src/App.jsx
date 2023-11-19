import React, { useEffect, useState } from "react";

import GetIPData from "./assets/components/GetIPData";
import GetWeatherData from "./assets/components/GetWeatherData";
import DisplayData from "./assets/components/DisplayData";
import "./assets/home.css";

function App() {
    // Forecast Data from IP/Weather API
    const [IPData, setIPData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [tempScale, setTempScale] = useState("");

    // This, below, works because the if statement is reevaluated every time a state is modified, thus working its way to the bottom.
    // If IPdata is empty, then get it.
    if (IPData === null || IPData === undefined || IPData.length === 0) {
        return <GetIPData setIPData={setIPData} />;
    }
    // If weatherData is empty, then get it.
    else if (
        weatherData === null ||
        weatherData === undefined ||
        weatherData.length === 0
    ) {
        return (
            <GetWeatherData
                setWeatherData={setWeatherData}
                IPData={IPData}
                tempScale={tempScale}
            />
        );
    }
    // If states are there, render data.
    else {
        // Once you select a location, allow scrolling
        document.querySelector("html").style.overflow = "visible";
        return (
            <>
                <DisplayData
                    setWeatherData={setWeatherData}
                    weatherData={weatherData}
                    setIPData={setIPData}
                    IPData={IPData}
                    setSearchResults={setSearchResults}
                    searchResults={searchResults}
                    setTempScale={setTempScale}
                    tempScale={tempScale}
                />
            </>
        );
    }
}

export default App;
