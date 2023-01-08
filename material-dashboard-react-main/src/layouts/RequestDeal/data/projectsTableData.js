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

// // @mui material components
// import Icon from "@mui/material/Icon";

// // Analytica components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAvatar from "components/MDAvatar";
// import MDProgress from "components/MDProgress";

// // Images
// import team2 from "assets/images/team-2.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

export default function data() {

// fetch data from API. data is an array of objects with the following structure:
// {
//   dealID: "123",
//   product: "Product 1",
//   quantity: "10",
//   budget: "1000",
//   dealstatus: "Won"
// }
// map this to rows and columns to display in the table
  const [dealsdata, setData] = useState([]);
  const getData = () => {
    axios.post("http://localhost:5000/getdeals", { email: JSON.parse(sessionStorage.getItem("user")) })
      .then((response) => {
        // console.log(response);
        setData(response.data);
        console.log(dealsdata);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);







  return {
    columns: [
      { Header: "Deal ID", accessor: "dealiD", width: "30%", align: "left" },
      { Header: "Product", accessor: "product", align: "center" },
      { Header: "Quantity", accessor: "quantity", align: "left" },
      { Header: "Budget", accessor: "budget", align: "center" },
      { Header: "Deal Status", accessor: "dealstatus", align: "center" },
    ],
    rows: [
      {
        dealiD: "123",
        product: "Product 1",
        quantity: "10",
        budget: "1000",
        dealstatus: "Won",
      },
      {
        dealiD: "124",
        product: "Product 2",
        quantity: "20",
        budget: "2000",
        dealstatus: "Lost",
      },

      
    ],
  };
}
