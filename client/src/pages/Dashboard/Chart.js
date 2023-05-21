import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Cell,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress";

export default function Chart() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch("http://localhost:8000/getMostSalesRecords")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRows(data?.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error or show an error message to the user
        setLoading(false);
      });
  };

  if (loading) {
    // Render the CircularProgress loader while data is being fetched
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  console.log("row", rows);
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <BarChart
          data={rows}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            // dataKey="_id"
            axisLine={true}
            tickLine={true}
            scale="band"
            tick={{ fontSize: 10 }}
          >
            <Label
              angle={360}
              position="insideBottom"
              style={{
                textAnchor: "end",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Products
            </Label>
          </XAxis>
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            scale="linear"
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Count
            </Label>
          </YAxis>
          <Bar dataKey="count">
            {rows.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
