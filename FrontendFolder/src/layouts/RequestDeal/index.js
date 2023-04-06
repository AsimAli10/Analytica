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
import { NativeSelect,FormControl,Table,TableBody,TableCell,TableRow } from "@mui/material";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import axios from "axios";


function RequestDeal() {

  const [product, setProduct] = useState("Laptops");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [dealstatus, setDealstatus] = useState("open");
  // const [requestBy, setRequestBy] = useState("");
  const [showTable, setShowTable] = useState(false); 
  const [tableData, setTableData] = useState([]);
  const [BidData, setBidData] = useState([]);
  const [showBids, setShowBids] = useState(false);
  const [showconfirmedBids, setShowconfirmedBids] = useState(false); 
  const [confirmedBids, setconfirmedBids] = useState(false); 

  const handledeals = () => {
    axios.post("http://localhost:5000/getdeals", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      // console.log(response);
      console.log(response.data.data);
      setTableData(response.data.data);
      setShowTable(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handlesallbids = () => {
    axios.post("http://localhost:5000/getdealbids", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
    // console.log(response);
      console.log(response.data.data);
      setBidData(response.data.data);
      setShowBids(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleconfirmedbids = () => {
    axios.post("http://localhost:5000/getacceptedbids", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      // console.log(response);
      console.log(response.data.data);
      setconfirmedBids(response.data.data);
      setShowconfirmedBids(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const handleSubmit = () => {
    setDealstatus("open");
    axios.post("http://127.0.0.1:5000/requestdeal", { product, quantity, budget, dealstatus, requestBy:JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        console.log(response);
        if (response.data.data === "success") {
          alert("Deal Requested Successfully");
          handledeals();
          // clear form
          setProduct("Laptops");
          setQuantity("");
          setBudget("");
        }
        else {
          alert("Deal Request Failed");
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    handledeals();
    handlesallbids();
    handleconfirmedbids();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={2}>
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
                  Request a Deal
                </MDTypography>
              </MDBox>
              <Grid container spacing={4} mt={2} mb={4} mx={2} >
                <Grid item  mt={2} mx={4}>
                  <FormControl >
                    <NativeSelect
                      defaultValue="Laptops"
                      inputProps={{
                        name: "product",
                        id: "product",
                      }}
                      onChange={(e) => setProduct(e.target.value)}
                    >
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="HomeAppliances">Home Appliances</option>
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item mt={2}>
                  <MDBox  mb={2} mx={4}>
                    <MDInput
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      label="Quantity"
                    />
                  </MDBox>
                </Grid>
                <Grid item mt={2}>
                  <MDBox mb={2} mx={4}>
                    <MDInput
                      onChange={(e) => setBudget(e.target.value)}
                      type="number"
                      label="Budget"
                    />
                </MDBox>
                </Grid>
                <Grid item xs={2} mt={2}>
                  <MDButton
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleSubmit}
                  mx={4}
                  >
                  Request Deal
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
                      My Deals
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <Grid mx={2} mt={3} mb={2} >
                {showTable && <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Quantity</strong></TableCell>
                        <TableCell><strong>Budget</strong></TableCell>
                        <TableCell><strong>Deal Status</strong></TableCell>
                        <TableCell><strong>Close</strong></TableCell>
                      </TableRow>
                    {
                      tableData.map((row) => (
                        <TableRow>
                          <TableCell>{row[1]}</TableCell>
                          <TableCell>{row[2]}</TableCell>
                          <TableCell>{row[3]}</TableCell>
                          <TableCell>{row[4]}</TableCell>
                          <TableCell>
                            <MDButton onClick={
                              () =>{
                                axios.post("http://localhost:5000/closedeal", { dealid : row[0] })
                                .then((response) => {
                                  // console.log(response);
                                  console.log(response.data.data);
                                  if (response.data.data === "success") {
                                    alert("Deal Closed Successfully");
                                  }
                                  else {
                                    alert("Deal Close Failed");
                                    console.log(response.data.data);
                                  }
                                }
                              )
                              }
                            } variant="contained" color="error" size="small" >Close Deal</MDButton>
                          </TableCell>
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
                      Deal Bids
                    </MDTypography>
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
                        <TableCell><strong>Bidder</strong></TableCell>
                        <TableCell><strong>Bid Status</strong></TableCell>
                        <TableCell><strong>Accept</strong></TableCell>
                        <TableCell><strong>Reject</strong></TableCell>
                      </TableRow>
                    {
                      BidData.map((row) => (
                        <TableRow>
                          <TableCell>{row[1]}</TableCell>
                          <TableCell>{row[2]}</TableCell>
                          <TableCell>{row[3]}</TableCell>
                          <TableCell>{row[5]}</TableCell>
                          <TableCell>{row[4]}</TableCell>
                          <TableCell>
                            <MDButton onClick={
                              () =>{
                                axios.post("http://localhost:5000/acceptbid", { bidid : row[0] })
                                .then((response) => {
                                  // console.log(response);
                                  console.log(response.data.data);
                                  if (response.data.data === "success") {
                                    alert("Bid Accepted Successfully");
                                  }
                                  else {
                                    alert("Bid Accept Failed");
                                    console.log(response.data.data);
                                  }
                                }
                              )
                            }
                            } variant="contained" color="success" size="small" >Accept</MDButton>
                          </TableCell>
                          <TableCell>
                            <MDButton onClick={
                              () =>{
                                axios.post("http://localhost:5000/rejectbid", { bidid : row[0] })
                                .then((response) => {
                                  // console.log(response);
                                  console.log(response.data.data);
                                  if (response.data.data === "success") {
                                    alert("Bid Rejected Successfully");
                                  }
                                  else {
                                    alert("Bid Reject Failed");
                                    console.log(response.data.data);
                                  }
                                }
                              )
                            }
                            } variant="contained" color="error" size="small" >Reject</MDButton>
                          </TableCell>
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
                      Confirmed Deals
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <Grid mx={2} mt={3} mb={2} >
                {showconfirmedBids && <Table>
                  <TableBody>
                      <TableRow>
                        <TableCell><strong>Product</strong></TableCell>
                        <TableCell><strong>Quantity</strong></TableCell>
                        <TableCell><strong>Confirmed Amount</strong></TableCell>
                        <TableCell><strong>Bidder</strong></TableCell>
                        <TableCell><strong>Bidder Email</strong></TableCell>
                        <TableCell><strong>Bidder PhoneNumber</strong></TableCell>
                      </TableRow>
                    {
                      confirmedBids.map((row) => (
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

export default RequestDeal;
