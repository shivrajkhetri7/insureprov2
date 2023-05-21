import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import RecordInfo from "./RecordInfo";
import Chart from "./Chart";

function Report() {
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

  // Find the maximum count _id
  let maxFavCountItem = "";
  let maxFavCount = -Infinity;

  rows.forEach((item) => {
    if (item.count > maxFavCount) {
      maxFavCount = item.count;
      maxFavCountItem = item._id;
    }
  });

  // Find the minimum count value
  let minFavCountItem = "";
  let minFavCount = Infinity;

  rows.forEach((item) => {
    if (item.count < minFavCount) {
      minFavCount = item.count;
      minFavCountItem = item._id;
    }
  });

  const sumCount = rows.reduce(
    (accumulator, item) => accumulator + item.count,
    0
  );

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Most Popular */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <RecordInfo
                title="Most Popular"
                product={maxFavCountItem}
                count={maxFavCount}
              />
            </Paper>
          </Grid>
          {/* List popular */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <RecordInfo
                title="Least Popular"
                product={minFavCountItem}
                count={minFavCount}
              />
            </Paper>
          </Grid>
          {/* Total Units sales */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            ></Paper>
          </Grid>
          {/* Total revenue */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            ></Paper>
          </Grid>
        </Grid>
        <Chart />
      </Container>
    </>
  );
}

export default Report;
