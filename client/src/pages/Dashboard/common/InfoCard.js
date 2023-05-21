import * as React from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
const currentDate = new Date().toLocaleDateString();

export default function InfoCard(props) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.title}
      </Typography>
      <Typography component="p" mt={2} variant="h4">
        {props?.count}
      </Typography>
      <Typography color="text.secondary" mt={1} sx={{ flex: 1 }}>
        {props?.product || currentDate}
      </Typography>
    </React.Fragment>
  );
}
