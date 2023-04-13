import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import reportsBarChartData from "layouts/OptimalCapitalUtilization/data/reportsBarChartData";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import axios from "axios";

function OptimalCapitalUtilization() {
  const [data,setData]=useState({})
  const [product,setProduct]=useState("")
  useEffect(() => {
    axios.post("http://127.0.0.1:5000/optimalutilization")
    .then((res) => {
      setData(res.data.data)
      console.log(res.data.data)
    })

    axios.post("http://127.0.0.1:5000/bestproduct")
    .then((res) => {
      setProduct(res.data.data)
      console.log(res.data.data)
    })
  },[])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={10}>
      <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Category-wise Expected Sales"
                  description = {product&&product}
                  date="Updated few minutes ago"
                  chart={data}
                />
              </MDBox>
            </Grid>
        </MDBox>
    </DashboardLayout>
  );
}

export default OptimalCapitalUtilization;
