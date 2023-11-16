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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "end",
                align: "top",
                color: "rgb(255, 255, 255, 1)",
                formatter: function (value) {
                    return value + "%";
                },
                font: {
                    size: 9,
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
                max: 120,
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

    return (
        <div className="graph_container">
            <div className="graph_container_body">
                <Bar data={data} options={config} />
            </div>
        </div>
    );
};

export default PrecChart;
