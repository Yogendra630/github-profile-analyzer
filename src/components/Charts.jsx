import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Charts = ({ languageData, starsData }) => {
  return (
    <div className="charts">
      <div className="card chart-card">
        <h3>Language Distribution</h3>
        <Doughnut
          data={{
            labels: languageData.labels,
            datasets: [
              {
                data: languageData.values,
                backgroundColor: [
                  "#5DD0A6",
                  "#82B7FF",
                  "#FF9F6E",
                  "#F2C94C",
                  "#9B8AFB",
                  "#F86CA7",
                ],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { position: "bottom" },
            },
          }}
        />
      </div>
      <div className="card chart-card">
        <h3>Repo Popularity (Stars)</h3>
        <Bar
          data={{
            labels: starsData.labels,
            datasets: [
              {
                label: "Stars",
                data: starsData.values,
                backgroundColor: "#82B7FF",
                borderRadius: 8,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: {
                ticks: { color: "#8A8FA3" },
              },
              y: {
                ticks: { color: "#8A8FA3" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Charts;
