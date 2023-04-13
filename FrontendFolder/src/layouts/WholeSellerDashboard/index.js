

import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
// Analytica components
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { useEffect, useState } from "react";
import axios from "axios";

import dealsdata from "./data/dealsTableData";
import allbidsdata from "./data/dealbidsTableData";
import confirmedbidsdata from "./data/confirmedbidsTableData";


function Dashboard() {
  
  const [bidstatus, setBidstatus] = useState("Pending");
  const [BidData, setBidData] = useState([]);
  const [confirmedbid, setConfirmedbid] = useState([]);
  const [opendeals, setOpendeals] = useState([]);
  

  // get open deals
  const getOpenDeals = () => {
    axios.post("http://localhost:5000/getopendeals", { email: JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        const data = response.data.data || [];
        const test = data.map((item) => ({
          dealid: item[0],  
          dealproduct: item[1],
          dealquantity: item[2],
          dealbudget: item[3],
          requestedby: item[4],
        }));
        setOpendeals(test);
        console.log(test);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get bidded deals
  const getBiddedDeals = () => {
    axios.post("http://localhost:5000/getbiddeddeals", { email: JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        const data = response.data.data || [];
        const test = data.map((item) => ({
          dealid: item[0],
          dealproduct: item[1],
          dealquantity: item[2],
          dealbidamount: item[3],
          requestedby: item[5],
          bidstatus: item[4],
        }));
        setBidData(test);
        console.log(test);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // get confirmed bids
  const getConfirmedBids = () => {
    axios.post("http://localhost:5000/getconfirmedbids", { email: JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        const data = response.data.data || [];
        const test = data.map((item) => ({
          confirmedproduct: item[0],
          confirmedquantity: item[1],
          confirmedamount: item[2],
          requester: item[3],
          requesteremail: item[4],
          requesternumber: item[5],
        }));
        setConfirmedbid(test);
        console.log(test);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (dealid,bidamount) => {
    setBidstatus("Pending");
    axios.post("http://127.0.0.1:5000/makebid", { dealid,bidamount,bidstatus,bidBy:JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        console.log(response);
        if (response.data.data === "Invalid") {
          alert("Invalid Deal ID. Please try again.");
        }
        else if (response.data.data === "success") {
          alert("Bid Placed successfully.");
          getOpenDeals();
          getBiddedDeals();
          getConfirmedBids();
        }
        else {
          alert("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const {dealcolumns, dealrows} = dealsdata(opendeals, handleSubmit);
  const {bidcolumns, bidrows} = allbidsdata(BidData);
  const {confirmedbidcolumns, confirmedbidrows} = confirmedbidsdata(confirmedbid);

useEffect(() => {
    getOpenDeals();
    getBiddedDeals();
    getConfirmedBids();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={2} pb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} mt={1}>
            <Card>
                <DataTable
                  table={{columns: dealcolumns, rows: dealrows}}
                  tableHeading="Open Deals"
                  showTotalEntries={false}
                  isSorted
                  noEndBorder
                  entriesPerPage={false}
                  canSearch
                />
            </Card>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Card>
                <DataTable
                  table={{columns: bidcolumns, rows: bidrows}}
                  tableHeading="My Bids"
                  showTotalEntries={false}
                  isSorted
                  noEndBorder
                  entriesPerPage={false}
                  canSearch
                />
            </Card>
          </Grid>

          <Grid item xs={12} mt={1}>
            <Card>
                <DataTable
                  table={{columns: confirmedbidcolumns, rows: confirmedbidrows}}
                  tableHeading="Confirmed Bids"
                  showTotalEntries={false}
                  isSorted
                  noEndBorder
                  entriesPerPage={false}
                  canSearch
                />
            </Card>
          </Grid>

        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
