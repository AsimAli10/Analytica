
// import MDButton from "components/MDButton";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { red } from "@mui/material/colors";

export default function dealsdata( Data,handlesallbids,handledeals ) {



  const setdealaction = (dealid) => (
    axios.post("http://localhost:5000/closedeal", { dealid })
    .then((response) => {
      // console.log(response);
      console.log(response.data.data);
      if (response.data.data === "success") {
        alert("Deal Closed Successfully");
        handledeals();
        handlesallbids();
       }
       else {
            alert("Deal Close Failed");
            console.log(response.data.data);
          }
    })
    .catch((error) => {
        console.log(error);
    })
    );

  return {
    dealcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "dealproduct", width: "30%", align: "center" },
      { Header: "Quantity", accessor: "dealquantity", align: "center" },
      { Header: "Budget", accessor: "dealbudget", align: "center" },
      { Header: "Status", accessor: "dealstatus", width: "15%", align: "center" },
      { Header: "Action", accessor: "dealaction", width: "15%", align: "center" },
    ],

    dealrows: 
      Data.map((item) =>({
        dealid: item.dealid,
        dealproduct: item.dealproduct,
        dealquantity: item.dealquantity,
        dealbudget: item.dealbudget,
        dealstatus: item.dealstatus,
        dealaction: (
            <RemoveCircleOutlineIcon fontSize="medium" sx={{ color: red[500],cursor: "pointer" }} onClick={() => setdealaction(item.dealid)} />
        ),
          }))
  };
}



