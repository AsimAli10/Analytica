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

import { useState,useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Analytica examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/SellerListing/Projects/data";
import axios from "axios";


function Projects() {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [Data, setData] = useState([]);
  

  useEffect(() => {
    axios.post("http://localhost:5000/getsellerlisting", { product: "dell latitude" })
        .then((response) => {
          // console.log(response);
          console.log(response.data.data);
          const test = response.data.data && response.data.data.map(item => ({
            seller: item[0],
            price: 2000,
            rating: parseFloat(item[1]),
            link: item[2],
          }));
          setData(test)
          console.log(Data);
        }
        )
        .catch((error) => {
          console.log(error);
        });
        
  }, []);

  console.log(Data);
  const { columns, rows } = data( Data);
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Sort By Rating</MenuItem>
      <MenuItem onClick={closeMenu}>Sort By Price</MenuItem>
    </Menu>
  );

  return (
    <Card >
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3} >
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Product Sellers
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>Best Sellers</strong> 
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
