import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Title from "./Title";
import CircularProgress from "@mui/material/CircularProgress";

export default function Orders() {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch("http://localhost:8000/latest")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setRows(data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error or show an error message to the user
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>UnitPrice</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">TotalPrice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{moment(row.Date).format("YYYY-MM-DD")}</TableCell>
                <TableCell>{row.SKU}</TableCell>
                <TableCell>{row.UnitPrice}</TableCell>
                <TableCell>{row.Quantity}</TableCell>
                <TableCell align="right">{row.TotalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
}
