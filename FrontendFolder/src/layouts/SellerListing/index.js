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

// import Card from "@mui/material/Card";

// Analytica components
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// Analytica example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

// import MDInput from "components/MDInput";
// import { NativeSelect,FormControl,Table,TableBody,TableCell,TableRow } from "@mui/material";
// import MDButton from "components/MDButton";
// import { useState } from "react";
// import axios from "axios";

import Projects from "layouts/SellerListing/Projects";
// import { useEffect } from "react";
// import axios from "axios";

function SellerListing() {


  
  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
        </MDBox>
    </DashboardLayout>
  );
}

export default SellerListing;
