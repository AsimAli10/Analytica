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
 import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import MDInput from "components/MDInput";
import { NativeSelect,FormControl,Table,TableBody,TableCell,TableRow } from "@mui/material";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import axios from "axios";
// import dealsdata from "./data/dealsTableData";
import  dealsdata  from "./data/dealsTableData";
import allbidsdata from "./data/dealbidsTableData";

function RequestDeal() {

  const [product, setProduct] = useState("Laptops");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [dealstatus, setDealstatus] = useState("open");
  // const [requestBy, setRequestBy] = useState("");
  // const [showTable, setShowTable] = useState(false); 
  // const [tableData, setTableData] = useState([]);
  const [DealsData, setDealsData] = useState([]);
  //  const [BidData, setBidData] = useState([]);
  //  const [showBids, setShowBids] = useState(false);
  const [DealBidsData, setDealBidsData] = useState([]);
  const [showconfirmedBids, setShowconfirmedBids] = useState(false); 
  const [confirmedBids, setconfirmedBids] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handledeals = () => {
    axios.post("http://localhost:5000/getdeals", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
      const data1 = response.data.data || [];
      const test = data1.map(item => ({
        dealid: item[0],
        dealproduct: item[1],
        dealquantity: item[2],
        dealbudget: item[3],
        dealstatus: item[4],
        dealaction: "close",
        }));
        setDealsData(test);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  const { columns, rows } = dealsdata( DealsData);
  console.log(DealsData)
  console.log(columns, rows)
  
  const handlesallbids = () => {
    axios.post("http://localhost:5000/getdealbids", { email: JSON.parse(sessionStorage.getItem("user")) })
    .then((response) => {
    // console.log(response);
      // console.log(response.data.data);
      // setBidData(response.data.data);
      // setShowBids(true);

      const data1 = response.data.data || [];
      const test = data1.map(item => ({
        dealbidid: item[0],
        dealbidproduct: item[1],
        dealbidquantity: item[2],
        dealbidamount: item[3],
        dealbidder: item[5],
        dealbidstatus: item[4],
        dealbidaccept: "accept",
        dealbidreject: "reject",
        }));
        setDealBidsData(test);
        setLoading(true);
        console.log(loading);
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
  },[]);
  const { bidcolumns, bidrows } = allbidsdata( DealBidsData);
  console.log(DealBidsData)
 console.log(bidcolumns, bidrows)
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
                  <FormControl  >
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
                borderRadius="md"
                coloredShadow="info"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} mt={-1} mb={-1}>
                    <MDTypography variant="h6" color="white">
                      My Deals
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{ columns, rows }}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder={false}
                  entriesPerPage={false}
                />
              </MDBox>
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
              <MDBox>
              {bidcolumns ? (
                          <p>Loading...</p>
                        ) : (
                          <DataTable
                          table={{ bidcolumns, bidrows }}
                          />
                        )}
                </MDBox>
               
               
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
