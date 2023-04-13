
// @mui material components
import Grid from "@mui/material/Grid";

// Analytica components
import MDBox from "components/MDBox";
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// Analytica example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import axios from "axios";

// import PieChart from "examples/Charts/PieChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import PieChart from "examples/Charts/PieChart";
// import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import formatDataForChart from "./data/Chartdata";



function DemographicsInfo() {

  const [chartData, setChartData] = useState(null);
    const [product, setProduct] = useState("Mobiles");
  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getdemographics", { product});
      // const data = response.data.data;
      const { ageChart, genderChart, cityChart } = formatDataForChart(response.data.data);
      setChartData({ ageChart, genderChart, cityChart });
    } catch (error) {
      console.log(error);
    }
  };

    const handleChange = (event) => {
        setProduct(event.target.value);
        fetchData();
    };

  useEffect(() => {
    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={5}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox >
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="category">
              Select Category
              </InputLabel>
              <NativeSelect
                defaultValue="Mobile"
                inputProps={{
                  name: 'Product Category',
                  id: 'product',
                }}
                onChange={handleChange}
                >
                <option value="Mobiles">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="home_appliances">Home Appliance</option>
              </NativeSelect>
            </FormControl>
          </MDBox>
        </Grid>
      </MDBox>
      <MDBox py={3}>
        <MDBox mt={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Age Wise Sales"
                  description="This is the age wise sales of the product."
                  date="just updated"
                  chart={chartData.ageChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Gender Wise Sales"
                  description="This is the gender wise sales of the product."
                  date="just updated"
                  chart={chartData.genderChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="primary"
                  title="City Wise Sales"
                  description="This is the city wise sales of the product."
                  date="just updated"
                  chart={chartData.cityChart}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default DemographicsInfo;
