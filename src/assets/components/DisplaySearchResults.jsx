import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../home.css";

const DisplaySearchResults = ({
    searchResults,
    /*new*/ setIPData,
    setWeatherData,
}) => {
    const setNewIPData = (item) => (e) => {
        e.preventDefault();
        console.log(item);
        const parts = item.display_name.split(",");
        const newIPData = {
            region_code: parts[1],
            city: parts[0],
            latitude: item.lat,
            longitude: item.lon,
        };

        document.getElementById("search_container").style.animation =
            "fadeOutBlur 1s ease-out";
        document.getElementById("flex_container").style.animation =
            "flexContainerFadeOutBlur 1s ease-out";
        // document.getElementById("search_bg").style.animation =
        //     "fadeOut 1s ease-out";
        setTimeout(function () {
            console.log(newIPData);
            setIPData(newIPData);
            setWeatherData([]);
        }, 900);
    };

    if (searchResults.length > 0) {
        const resultsMap = searchResults.map((item, index) => {
            if (item.display_name.length > 32) {
                return (
                    <button
                        className="search_results_item"
                        key={index}
                        onClick={setNewIPData(item)}
                    >
                        <div className="search_results_text">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {item.display_name.slice(0, 32) + "..."}
                        </div>
                    </button>
                );
            } else {
                return (
                    <button
                        className="search_results_item"
                        key={index}
                        onClick={setNewIPData(item)}
                    >
                        <div className="search_results_text">
                            <FontAwesomeIcon icon={faLocationDot} />
                            {item.display_name}
                        </div>
                    </button>
                );
            }
        });

        return (
            <div
                id="search_results_container"
                className="search_results_container"
            >
                {resultsMap}
            </div>
        );
    } else
        return (
            <div className="search_results_container_empty">
                No results found
            </div>
        );
};

export default DisplaySearchResults;
