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

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";


export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Seller", accessor: "Seller", width: "45%", align: "left" },
      { Header: "Company", accessor: "Company", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Request", accessor: "Request", align: "center" },
    ],

    rows: [
      {
        Seller: <Author image={team2} name="Abdul Ahad" email="AbdulAhad@gmail.com" />,
        Company: <Job title="Manager" description="Grocer" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        Request: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Request
          </MDTypography>
        ),
      },
      {
        Seller: <Author image={team2} name="Umer sajjad" email="umersajjad@gmail.com" />,
        Company: <Job title="Manager" description="Al-Fateh" />,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        Request: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Request
          </MDTypography>
        ),
      },
    ],
  };
}
