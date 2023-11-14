// CSS Imports
import "../home.css";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const PrecChart = ({ hour, weatherData, twentyFourHourTimeSlice }) => {
    let hourlyPrecipitationData =
        weatherData.hourly.precipitation_probability.slice(hour, hour + 25);

    // Precipitation bar graph data
    const data = {
        labels: twentyFourHourTimeSlice,
        datasets: [
            {
                data: hourlyPrecipitationData /* [0, 0, 2, 23, 54, 56, 31, 4, 0] */,
                backgroundColor: "white",
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };

    const config = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#fff",
                },
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 50,
                    color: "#fff",
                    callback: (value, index, values) => {
                        return `${value}%`;
                    },
                },
            },
        },
    };

    const handleWheel = (event) => {};

    return (
        <div className="graph_container" onWheel={handleWheel}>
            <div className="graph_container_body">
                <Bar data={data} options={config} />
            </div>
        </div>
    );
};

export default PrecChart;
