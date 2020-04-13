import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    //useEffect cannot be async , so we have to have another function inside it that is async
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []); //second argument to use effect is empty . ie , run this just once, works like component didmount , dont monitor any specific variable changes , checknotes for useEffect syntax

  const lineChart =
    dailyData.length != 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed), //looping through array
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  console.log(confirmed, recovered, deaths);
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: [`Infected`, `Recovered`, `Deaths`],
        datasets: [
          {
            label: `People`,
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0 ,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }} // one {} to use dynamic javascript , second {} to make an object
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
