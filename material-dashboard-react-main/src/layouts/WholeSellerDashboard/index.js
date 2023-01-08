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

import Card from "@mui/material/Card";

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Analytica example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import MDInput from "components/MDInput";
import { Table,TableBody,TableCell,TableRow } from "@mui/material";
import MDButton from "components/MDButton";
import { useState } from "react";
import axios from "axios";

function Dashboard() {
  
  const [dealid, setDealid] = useState("");
  const [bidamount, setBidamount] = useState("");
  const [bidstatus, setBidstatus] = useState("Pending");
  // const [bidBy, setBidBy] = useState("");
  const [showTable, setShowTable] = useState(false); 
  const [tableData, setTableData] = useState([]);
  const [BidData, setBidData] = useState([]);
  const [showBids, setShowBids] = useState(false); 
  const [showconfirm, setShowconfirm] = useState(false);
  const [confirmedbid, setConfirmedbid] = useState("");
  const handleSubmit = () => {
    // console.log(JSON.parse(sessionStorage.getItem("user")));
    // setBidBy(JSON.parse(sessionStorage.getItem("user")));
    // setRequestBy(requestBy.at(0));
    setBidstatus("Pending");
    axios.post("http://127.0.0.1:5000/makebid", { dealid,bidamount,bidstatus,bidBy:JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        console.log(response);
        if (response.data.data === "Invalid") {
          alert("Invalid Deal ID. Please try again.");
        }
        else if (response.data.data === "success") {
          alert("Bid Placed successfully.");
        }
        else {
          alert("error");
          setDealid("");
          setBidamount("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  // const { sales, future } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} mt={4} mb={4}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                     <MDTypography variant="h6" color="white">
                        Open Deals
                      </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                    <MDButton onClick={
                    () =>{
                    axios.post("http://localhost:5000/getopendeals", { email: JSON.parse(sessionStorage.getItem("user")) })
                    .then((response) => {
                      // console.log(response);
                      console.log(response.data.data);
                      setTableData(response.data.data);
                      setShowTable(true);
                    }
                    )
                    }} 
                    variant="contained"
                    color="info"
                    size="medium"
                    >Load Deals</MDButton>
                  </Grid>    
                </Grid>
              </MDBox>
              <Grid mx={2} mt={3} mb={2} >
                {showTable && <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell><strong>Deal ID</strong></TableCell>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Quantity</strong></TableCell>
                        <TableCell><strong>Budget</strong></TableCell>
                        <TableCell><strong>Requested By</strong></TableCell>
                      </TableRow>
                    {
                      tableData.map((row) => (
                        <TableRow>
                          <TableCell>{row[0]}</TableCell>
                          <TableCell>{row[1]}</TableCell>
                          <TableCell>{row[2]}</TableCell>
                          <TableCell>{row[3]}</TableCell>
                          <TableCell>{row[4]}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>}
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Bid on a Deal
                </MDTypography>
              </MDBox>
              <Grid container spacing={4} mt={2} mb={4} mx={2} >
                <Grid item mt={2} ml={6}>
                  <MDBox  mb={2} mx={6}>
                    <MDInput
                      onChange={(e) => setDealid(e.target.value)}
                      type="number"
                      label="Deal ID"
                    />
                  </MDBox>
                </Grid>
                <Grid item mt={2}>
                  <MDBox mb={2} mx={8}>
                    <MDInput
                      onChange={(e) => setBidamount(e.target.value)}
                      type="number"
                      label="Bid Amount"
                    />
                </MDBox>
                </Grid>
                <Grid item mt={2} mx={6}>
                  <MDButton
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleSubmit}
                  mx={10}
                  mb={2}
                  >
                  Bid Deal
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                  <MDTypography variant="h6" color="white">
                    My Bids
                  </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                    <MDButton onClick={
                    () =>{
                    axios.post("http://localhost:5000/getbiddeddeals", { email: JSON.parse(sessionStorage.getItem("user")) })
                    .then((response) => {
                      // console.log(response);
                      console.log(response.data.data);
                      setBidData(response.data.data);
                      setShowBids(true);
                    }
                    )
                    }}
                    variant="contained"
                    color="info"
                    size="medium"
                    >Load Bids</MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <Grid mx={2} mt={3} mb={2} >
                {showBids && <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Quantity</strong></TableCell>
                        <TableCell><strong>Bid Amount</strong></TableCell>
                        <TableCell><strong>Requested By</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    {
                      BidData.map((row) => (
                        <TableRow>
                          <TableCell>{row[1]}</TableCell>
                          <TableCell>{row[2]}</TableCell>
                          <TableCell>{row[3]}</TableCell>
                          <TableCell>{row[5]}</TableCell>
                          <TableCell>{row[4]}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>}
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} mt={4}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MDTypography variant="h6" color="white">
                      Confirmed Bids
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={6} display="flex" alignItems="flex-end" justifyContent="flex-end">
                    <MDButton onClick={
                    () =>{
                    axios.post("http://localhost:5000/getconfirmedbids", { email: JSON.parse(sessionStorage.getItem("user")) })
                    .then((response) => {
                      // console.log(response);
                      console.log(response.data.data);
                      setConfirmedbid(response.data.data);
                      setShowconfirm(true);
                    }
                    )
                    }}
                    variant="contained"
                    color="info"
                    size="medium"
                    >Load Confirmed Bids</MDButton>
                  </Grid>
                </Grid>
              </MDBox>
              <Grid mx={2} mt={3} mb={2} >
                {showconfirm && <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Quantity</strong></TableCell>
                        <TableCell><strong>Confirmed Amount</strong></TableCell>
                        <TableCell><strong>Requester</strong></TableCell>
                        <TableCell><strong>Requester Email</strong></TableCell>
                        <TableCell><strong>Requester Phone</strong></TableCell>
                      </TableRow>
                    {
                      confirmedbid.map((row) => (
                        <TableRow>
                          <TableCell>{row[0]}</TableCell>
                          <TableCell>{row[1]}</TableCell>
                          <TableCell>{row[2]}</TableCell>
                          <TableCell>{row[3]}</TableCell>
                          <TableCell>{row[4]}</TableCell>
                          <TableCell>{row[5]}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>}
              </Grid>
            </Card>
          </Grid>

        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
