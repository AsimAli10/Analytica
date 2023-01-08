/**
=========================================================
* Analytica - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Analytica components
import MDBox from "components/MDBox";

// Analytica example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { useEffect,useState } from "react";
import axios from "axios";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const [insightData, setInsightData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [stats,setStats] = useState(null);
  useEffect(() => {
    axios.post("http://127.0.0.1:5000/salesinsights",{category:"Laptops"})
      .then((res) => {
        setInsightData(res.data.data);
      })

      axios.post("http://127.0.0.1:5000/salesforecast",{category:"Laptops"})
      .then((res) => {
        setForecastData(res.data.data);
      })

      axios.post("http://127.0.0.1:5000/dashboardstats",{category:"Laptops"})
      .then((res) => {
        setStats(res.data.data);
      })
  }, []);

  // const { sales, future } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Laptop's Last Month Sales"
                count={insightData && insightData.datasets.data[insightData.datasets.data.length-2]}
                percentage={{
                  // set color to success if the percentage is positive
                  color: stats&&stats[0]>0?"success":"error",
                  amount: stats&&stats[0],
                  label: "% than Current Month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Laptop's Current Month Sales"
                count={insightData && insightData.datasets.data[insightData.datasets.data.length-1]}
                percentage={{
                  // set color to success if the percentage is positive
                  color: stats&&stats[1]>0?"success":"error",
                  amount: stats&&stats[1],
                  label: "% than Last Month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="leaderboard"
                title="Laptop's Next Month Predicted Sales"
                count={forecastData && forecastData.datasets.data[forecastData.datasets.data.length-1]}
                percentage={{
                  // set color to success if the percentage is positive
                  color: stats&&stats[2]>0?"success":"error",
                  amount: stats&&stats[2],
                  label: "% than Current Month",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                {insightData &&
                  <ReportsLineChart
                  color="info"
                  title=" Laptop's Sales Insights"
                  description={
                    <>
                      Past 09 months Sales
                    </>
                  }
                  date="just updated"
                  chart={ insightData}
                />}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                {forecastData &&
                  <ReportsLineChart
                  color="success"
                  title="Laptop's Sales Forecast"
                  description="Based on Past 08 months Sales"
                  date="just updated"
                  chart={forecastData}
                />}
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
