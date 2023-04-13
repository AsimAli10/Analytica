
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";

// import axios from "axios";

function ReviewAnalytics() {
  // fetch data from backend

  const [selectedCategory, setSelectedCategory] = useState("Mobiles");
  const [selectedProduct, setSelectedProduct] = useState("Apple iPhone 11 Pro");
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/getproductfeatures", {product:selectedProduct , category:selectedCategory})
        .then((res) => {
            
            const responseData = res.data.data;
            // console.log(responseData);
            setFeatures(responseData);
            console.log(features);

        })
        .catch((err) => {
            console.log(err);
        }
        );
  }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
        axios.post("http://localhost:5000/getproductfeatures", {product:selectedProduct , category:selectedCategory})
        .then((res) => {
            
            const responseData = res.data.data;
            // console.log(responseData);
            setFeatures(responseData);
            console.log(features);

        })
        .catch((err) => {
            console.log(err);
        }
        );
    };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
          <MDBox py={5}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="category">
                Select Category
              </InputLabel>
              <NativeSelect
                value={selectedCategory}
                inputProps={{
                  name: "Category",
                  id: "category",
                }}
                onChange={handleCategoryChange}
              >
                <option value="Mobiles">Mobile</option>
                <option value="Laptops">Laptop</option>
                <option value="Home Appliances">Home Appliance</option>
              </NativeSelect>
            </FormControl>
            </MDBox>
          </Grid>
          {selectedCategory === "Mobiles" && (
            <Grid item xs={6}>
                <MDBox py={5}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="product">
                  Select Product
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "Product",
                    id: "product",
                  }}
                  value={selectedProduct}
                  onChange={handleProductChange}
                >
                  <option value="Apple iPhone 11 Pro">Apple iPhone 11 Pro</option>
                  <option value="Asus ROG Phone 3 ZS661KS">Asus ROG Phone 3 ZS661KS</option>
                  <option value="OnePlus 11 5G">OnePlus 11 5G</option>
                  <option value="SAMSUNG Galaxy A53 5G">SAMSUNG Galaxy A53 5G</option>
                  <option value="SAMSUNG Galaxy S20 FE 5G">SAMSUNG Galaxy S20 FE 5G</option>
                  <option value="SAMSUNG Galaxy S22 Ultra">SAMSUNG Galaxy S22 Ultra</option>
                  <option value="Xiaomi Mi Lite 5G NE">Xiaomi Mi Lite 5G NE</option>
                  <option value="Xiaomi Redmi Note 8 Pro">Xiaomi Redmi Note 8 Pro</option>
                  <option value="Apple iPhone 12">Apple iPhone 12</option>
                  <option value="Apple iPhone 13">Apple iPhone 13</option>
                </NativeSelect>
              </FormControl>
              </MDBox>
            </Grid>
          )}
          {selectedCategory === "Laptops" && (
            <Grid item xs={6}>
                <MDBox py={5}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="Prodct">
                  Select Product
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "Product",
                    id: "product",
                  }}
                  value={selectedProduct}
                  onChange={handleProductChange}
                >
                  <option value="Acer Aspire 5 A515-45-R74Z Slim Laptop">Acer Aspire 5 A515-45-R74Z Slim Laptop</option>
                  <option value="Acer Chromebook Spin 314">Acer Chromebook Spin 314</option>
                  <option value="Acer Nitro 5">Acer Nitro 5</option>
                  <option value="Acer Predator Helios 300">Acer Predator Helios 300</option>
                  <option value="Asus Scar 15">Asus Scar 15</option>
                  <option value="ASUS TUF Gaming F15">ASUS TUF Gaming F15</option>
                  <option value="Lenovo IdeaPad Gaming 3">Lenovo IdeaPad Gaming 3</option>
                  <option value="MSI Katana 15">MSI Katana 15</option>
                  <option value="MSI Pulse GL66">MSI Pulse GL66</option>
                  <option value="MSI Stealth 17">MSI Stealth 17</option>
                </NativeSelect>
              </FormControl>
                </MDBox>
            </Grid>
          )}
          {selectedCategory === "Home Appliances" && (
            <Grid item xs={6}>
                <MDBox py={5}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="Product">
                  Select Product
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "Product",
                    id: "product",
                  }}
                  value={selectedProduct}
                  onChange={handleProductChange}
                >
                  <option value="Frigidaire EFR751">Frigidaire EFR751</option>
                  <option value="Galanz GLR18FS5S16 French Door Refrigerator">Galanz GLR18FS5S16 French Door Refrigerator</option>
                  <option value="LG 6,000 BTU High Efficiency Window AC">LG 6,000 BTU High Efficiency Window AC</option>
                  <option value="Ninja CP307 Hot and Cold Brewed System">Ninja CP307 Hot and Cold Brewed System</option>
                  <option value="Philips 3000 Series Air Fryer">Philips 3000 Series Air Fryer</option>
                  <option value="SAMSUNG 65-Inch Class QLED 4K UHD">SAMSUNG 65-Inch Class QLED 4K UHD</option>
                  <option value="TOSHIBA Microwave Oven EM131A5C">TOSHIBA Microwave Oven EM131A5C</option>
                </NativeSelect>
              </FormControl>
            </MDBox>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
            <Card>
            <MDBox
                mx={2}
                mt={2}
                py={3}
                px={2}
                variant="gradient"
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
            >
                <MDTypography variant="h5" color="white">
                Negative Features
                </MDTypography>
            </MDBox>
            <Grid container spacing={4} mt={1} py={3} px={2}>
                {features.map((feature) => (
                <Grid item xs={12} sm={6} md={3} key={feature.id} p={1}>
                    <Card>
                    <MDBox p={2} borderRadius='lg' sx={{
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            color: 'white',
                                            transition: 'all 0.3s ease-in-out',
                                            boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                                            cursor: 'pointer',
                                        },
                                        


                                        }}>
                        <MDTypography variant="subtitle1" color="white">
                        {feature}
                        </MDTypography>

                    </MDBox>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Card>
        </Grid>
        </Grid>

    </DashboardLayout>
  );
}

export default ReviewAnalytics;
