import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import Drawer from "../utils/Drawer";
import AppBar from "../utils/AppBar";
import Report from "../Report/Report";
import InfoCard from "./common/InfoCard";
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchTotalRevenue();
  }, []);

  const fetchTotalRevenue = async () => {
    try {
      const response = await fetch("http://localhost:8000/totalrevenue");
      const data = await response.json();
      setTotalRevenue(data.totalRevenue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Insure Pro 2
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            component="nav"
            onClick={(event) => {
              setActiveComponent(event.target.textContent);
            }}
          >
            {mainListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {activeComponent === "Dashboard" ? (
            <>
              {" "}
              <Toolbar />
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 500,
                      }}
                    >
                      <Chart />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <Deposits />
                    </Paper>
                    <Paper
                      sx={{
                        mt: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 240,
                      }}
                    >
                      <InfoCard title="Total Revenue" count={totalRevenue} />
                    </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Orders />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (
            <Report />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
