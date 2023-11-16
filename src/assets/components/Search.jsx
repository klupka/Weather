import "../home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const URL = "https://geocode.maps.co/search?q=";

const Search = ({ setSearchResults, searchResults, clearInput }) => {
    const [searchStr, setSearchStr] = useState("");
    const [trigger, setTrigger] = useState("");

    let newURL = "";
    const handleSubmit = (e) => {
        e.preventDefault();
        setTrigger(searchStr);
    };

    useEffect(() => {
        newURL = URL + trigger;
        let isSubscribed = true;

        const fetchData = async () => {
            const data = await fetch(newURL);
            const json = await data.json();
            if (isSubscribed) {
                setSearchResults(json);
            }
        };

        fetchData();

        return () => (isSubscribed = false);
    }, [trigger]);

    // Clear input form when closing search menu
    useEffect(() => {
        document.getElementById("search_input_form").value = "";
    }, [clearInput]);

    return (
        <form className="form_search" onSubmit={handleSubmit}>
            <input
                className="input_search"
                id="search_input_form"
                type="text"
                placeholder="city, state, county, etc.."
                autoComplete="off"
                onChange={(e) => setSearchStr(e.target.value)}
                value={searchStr}
            ></input>
            <button type="submit" className="btn_search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );
};

export default Search;
