import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart2";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MDBox from "components/MDBox";
import { useEffect , useState } from "react";
import axios from "axios";

function SalesForecast() {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.post("http://127.0.0.1:5000/salesforecast",{category:"Mobiles"})
    .then((res) => {
      setData(res.data.data)
      console.log(res.data.data)
    })
  },[])
  const handleChange=(event) => {
    if(event.target.value === "Mobile"){
      axios.post("http://127.0.0.1:5000/salesforecast",{category:"Mobiles"})
      .then((res) => {
        setData(res.data.data)
      })
    }    
    else if(event.target.value === "Laptop"){
      axios.post("http://127.0.0.1:5000/salesforecast",{category:"Laptops"})
      .then((res) => {
        setData(res.data.data)
      })
    }
    else if(event.target.value === "Home_Appliance"){
      axios.post("http://127.0.0.1:5000/salesforecast",{category:"Home Appliances"})
      .then((res) => {
        setData(res.data.data)
      })
    }
  };
  

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
                  name: 'Category',
                  id: 'category',
                }}
                onChange={handleChange}
                >
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Home_Appliance">Home Appliance</option>
              </NativeSelect>
            </FormControl>
          </MDBox>
        </Grid>
      </MDBox>
      <MDBox py={5}>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="info"
              title="Sales Forecast"
              description={
              <>
                    Based on the last 08 months sales
                </>
                }
                date="Just Updated"
                chart={data}
            />
            </MDBox>
        </Grid>
        </MDBox>
    </DashboardLayout>
  );
}

export default SalesForecast;
