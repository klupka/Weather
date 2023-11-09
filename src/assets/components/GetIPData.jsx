import { useEffect } from "react";

//const URL = "https://ip-api.com/json/";
const URL = "https://ipwho.is/";

const GetIPData = ({ setIPData }) => {
    useEffect(() => {
        let isSubscribed = true;

        // declare the async data fetching function
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(URL);
            // convert the data to json
            const json = await data.json();

            // set state with the result if `isSubscribed` is true
            if (isSubscribed) {
                console.log("IPData set");
                setIPData(json);
                // console.log(json);
            }
        };

        fetchData().catch(console.error);

        // cancel any future `setData`
        return () => (isSubscribed = false);
    }, []);
};

export default GetIPData;
