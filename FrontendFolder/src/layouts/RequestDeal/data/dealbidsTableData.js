/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
// import Tooltip from "@mui/material/Tooltip";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// Images
// import logoXD from "assets/images/small-logos/logo-xd.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
// import Rating from "@mui/material/Rating";
import MDButton from "components/MDButton";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";

export default function allbidsdata( Data ) {


  const setdealaccept = (bidid) => (
    axios.post("http://localhost:5000/acceptbid", { bidid })
    .then((response) => {
        console.log(response.data.data);
        if (response.data.data === "success") {
            alert("Bid Accepted Successfully");
            window.location.reload();
        }
        else {
            alert("Bid Accept Failed");
            console.log(response.data.data);
        }
    })
    );

  const setdealreject = (bidid) => (
    axios.post("http://localhost:5000/rejectbid", { bidid })
    .then((response) => {
        console.log(response.data.data);
        if (response.data.data === "success") {
            alert("Bid Rejected Successfully");
            window.location.reload();
        }
        else {
            alert("Bid Reject Failed");
            console.log(response.data.data);
        }
    })
    );

  return {
    bidcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "dealbidproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "dealbidquantity", align: "center" },
      { Header: "Bid Amount", accessor: "dealbidamount", align: "center" },
      { Header: "Bidder", accessor: "dealbidder", align: "center" },
      { Header: "Bid Status", accessor: "dealbidstatus",  align: "center" },
      { Header: "Accept", accessor: "dealbidaccept", width: "15%", align: "center"},
      { Header: "Reject", accessor: "dealbidreject", width: "15%", align: "center"},
    ],
    bidrows: 
      Data.map((item) =>({
        dealbidid: item.dealbidid,
        dealbidproduct: item.dealbidproduct,
        dealbidquantity: item.dealbidquantity,
        dealbidamount: item.dealbidamount,
        dealbidder: item.dealbidder,
        dealbidstatus: item.dealbidstatus,
        dealbidaccept: (
            <MDButton variant="gradient" color="info" onClick={() =>setdealaccept(item.dealbidid)}>
                Accept
            </MDButton>
        ),
        dealbidreject: (   
            <MDButton variant="gradient" color="info" onClick={() =>setdealreject(item.dealbidid)}>
                Reject
            </MDButton>
        ),
          }))
  };
}
