/**
=========================================================
* Material Dashboard 2 React - v2.1.0
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


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useEffect, useState } from "react";
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { FormControl, NativeSelect } from "@mui/material";
import axios from "axios";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userrole, setUserrole] = useState("Seller");
  const [loggedIn, setLoggedIn] = useState(false);


  // pass data to login api and get response
  const handleSubmit = () => {
    axios.post("http://127.0.0.1:5000/login", { email, password,userrole })
    .then((response) => {
      console.log(response);
      if (response.data.data === "failure") {
        alert("Invalid Credentials");
        console.log(response.data.data);
      }
      else {
        setLoggedIn(true);
        sessionStorage.setItem("user", JSON.stringify(email));
        sessionStorage.setItem("userrole", JSON.stringify(userrole));
        console.log(JSON.parse(sessionStorage.getItem("user")));
        if (userrole === "Seller") {
          window.location.href = "/dashboard";
        }
        else if (userrole === "WholeSeller") {
          window.location.href = "/WholeSellerDashboard";
        }
      }
    }
    )
  };
useEffect(() => {
  sessionStorage.clear();
}, []);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setEmail(event.target.value);
                }
              } type="email" label="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput onChange={
                (event) => {
                  setPassword(event.target.value);
                }

              } type="password" label="Password" fullWidth />
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
                    if(loggedIn){
                      // clear input fields
                      setEmail("");
                      setPassword("");
                      setUserrole("");
                    }

                  }
                }
              >
                <option value="Seller">Seller</option>
                <option value="WholeSeller">WholeSeller</option>
              </NativeSelect>
            </FormControl>
            <MDBox mt={4} mb={1}>
              <MDButton
                fullWidth
                variant="contained"
                color="info"
                onClick={handleSubmit}
              >
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
