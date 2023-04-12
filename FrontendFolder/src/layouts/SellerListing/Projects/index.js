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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
// import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

// Analytica examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/SellerListing/Projects/data";
import axios from "axios";
import { Grid } from "@mui/material";


function Projects() {
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [Data, setData] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
      axios.post("http://localhost:5000/getsellerlisting", { product: e.target.value })
        .then((response) => {
          // console.log(response);
          // console.log(response.data.data);
          const data1 = response.data.data || [];
          const test = data1.map(item => ({
            seller: item[0],
            price: parseFloat(item[3]),
            rating: parseFloat(item[2]),
            link: item[1],
          }));
          setData(test)
          // console.log(Data);
        }
        )
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sortbyRating = () => {
    const sortedData = [...Data].sort((a, b) => b.rating - a.rating);
    setData(sortedData);
    // console.log(Data);
    closeMenu();
  };

  const sortbyPrice = () => {
    const sortedData = [...Data].sort((a, b) => a.price - b.price);
    setData(sortedData);
    // console.log(Data);
    closeMenu();
  };


  // console.log(Data);
  const { columns, rows } = data( Data);
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={sortbyRating}>Sort By Rating</MenuItem>
      <MenuItem onClick={sortbyPrice}>Sort By Price</MenuItem>
    </Menu>
  );

  return (
    <Card >
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3} >
        <MDBox>
          
          <Grid container spacing={10} mt={-8} mb={0} mx={0} >
              <Grid item mt={0} mx={20} marginLeft={-10}>
                <MDTypography variant="h6" gutterBottom>
                  Product Sellers
                </MDTypography>
              </Grid>
              <Grid item mt={-2} marginLeft={60}>
                <MDBox pr={1} item>
                  <MDInput label="Search here" onKeyDown={handleKeyDown} />
                </MDBox>
              </Grid>
              <Grid item mt={-1} marginLeft={-5}> 
                <UnfoldMoreIcon onClick={openMenu}/>
              </Grid>  
              {renderMenu}
            </Grid>  
        </MDBox>
      </MDBox>
      <MDBox mt={-4}>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted
          noEndBorder
          entriesPerPage={false}
          
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
