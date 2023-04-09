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


export default function confirmedbidsdata( Data ) {
  console.log(Data);

  return {
    columns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "confirmedproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "confirmedquantity", align: "center" },
      { Header: "Bid Amount", accessor: "confirmedamount", align: "center" },
      { Header: "Bidder", accessor: "bidder", align: "center" },
      { Header: "Email", accessor: "bidderemail",  align: "center" },
      { Header: "Mobile Number", accessor: "biddernumber", width: "15%", align: "center"},

    ],
    rows: 
      Data.map((item) =>({
        confirmedproduct: item.confirmedproduct,
        confirmedquantity: item.confirmedquantity,
        confirmedamount: item.confirmedamount,
        bidder: item.bidder,
        bidderemail: item.bidderemail,
        biddernumber: item.biddernumber,
          }))
  };
}
