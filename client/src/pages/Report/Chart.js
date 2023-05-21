import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getmonthlyrecords")
      .then((response) => response.json())
      .then((responseData) => {
        const chartData = responseData.result.map((item) => ({
          month: getMonthName(item._id.month),
          count: item.count,
          mostPopularItem: item.mostPopularItem[0]._id, // Extract the most popular item name
        }));
        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month - 1];
  };

  return (
    <Grid item xs={6} md={6} lg={6} mt={2}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 500,
        }}
      >
        <h2>Monthly Sales</h2>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
          <Bar dataKey="mostPopularItem" fill="#82ca9d" />{" "}
        </BarChart>
      </Paper>
    </Grid>
  );
}

export default Chart;
