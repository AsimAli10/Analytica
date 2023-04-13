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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Analytica components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { useState } from "react";
import axios from "axios";
import { FormControl, NativeSelect } from "@mui/material";
import BasicLayout from "../components/BasicLayout";

function Cover() {
  const [userrole, setUserrole] = useState("Seller");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    axios.post("http://127.0.0.1:5000/signup", { email, password, userrole, name, cnic, phone })
      .then((response) => {
        console.log(response);
        if (response.data.data === "exists" || response.data.data === "error") {
          console.log(response.data.data);
          alert("User already exists");
        }
        else {
          alert("User registered successfully");
          console.log(JSON.parse(sessionStorage.getItem("user")));
          window.location.href = "/authentication/sign-in";
        }
      })
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={1}
          mb={0}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your detailts to get started
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setName(event.target.value);
                }
              } type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setEmail(event.target.value);
                }
              } type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setPassword(event.target.value);
                }
              } type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setCnic(event.target.value);
                }
              } type="text" label="CNIC" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setPhone(event.target.value);
                }
              } type="text" label="Phone Number" variant="standard" fullWidth />
            </MDBox>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue="Seller"
                inputProps={{
                  name: "userrole",
                  id: "userrole"
                }}
                onChange={
                  (event) => {
                    setUserrole(event.target.value);
                  }
                }
              >
                <option value="Seller">Seller</option>
                <option value="WholeSeller">WholeSeller</option>
                <option value="Buyer">Buyer</option>
              </NativeSelect>
            </FormControl>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton  variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
