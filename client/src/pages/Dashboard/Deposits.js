import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import CircularProgress from "@mui/material/CircularProgress";

export default function Deposits() {
  const [totalRecords, setTotalRecords] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchTotalRecords();
  }, []);

  const fetchTotalRecords = () => {
    fetch("http://localhost:8000/getTotleRecords")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setTotalRecords(data?.totle);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error or show an error message to the user
        setLoading(false);
      });
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <React.Fragment>
      <Title>Total Sales</Title>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography component="p" mt={2} variant="h4">
            {totalRecords}
          </Typography>
          <Typography color="text.secondary" mt={1} sx={{ flex: 1 }}>
            {currentDate}
          </Typography>
        </>
      )}
    </React.Fragment>
  );
}
