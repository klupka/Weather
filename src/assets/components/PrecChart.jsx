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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ChartDataLabels
);

const PrecChart = ({ hour, weatherData, twentyFourHourTimeSlice }) => {
    let hourlyPrecipitationData =
        weatherData.hourly.precipitation_probability.slice(hour, hour + 25);
    //hourlyPrecipitationData = [10, 3, 15, 52, 42, 0, 2, 0];
    // Precipitation bar graph data
    const data = {
        labels: twentyFourHourTimeSlice.slice(0, 12),
        datasets: [
            {
                data: hourlyPrecipitationData.slice(0, 12),
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderWidth: 0,
                borderColor: "rgba(255, 255, 255, 0.4)",
                borderRadius: 3,
                borderSkipped: false,
                fill: false,
            },
        ],
    };

    const maxOfArray = Math.max.apply(Math, hourlyPrecipitationData);

    const config = {
        // responsive: true,
        maintainAspectRatio: false /* was true for shrinkable css*/,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "end",
                align: "top",
                color: "rgb(255, 255, 255, 1)",
                formatter: function (value) {
                    if (maxOfArray === 0) return "";
                    else if (value === maxOfArray) {
                        console.log(`${value} === ${maxOfArray}`);
                        return value + "%";
                    } else {
                        return "";
                    }
                },
            },
        },
        scales: {
            x: {
                border: { color: "rgb(255, 255, 255, 0.2" },
                grid: {
                    drawOnChartArea: false,
                    color: "rgb(255, 255, 255, 0.2",
                },
                ticks: { color: "#fff" },
            },
            y: {
                display: false,
                grid: {
                    lineWidth: 1,
                    color: "",
                    drawTicks: false,
                },
                min: 0,
                max: 100,
                ticks: {
                    display: false,
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
