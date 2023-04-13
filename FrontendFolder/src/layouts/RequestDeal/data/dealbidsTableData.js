
// import MDButton from "components/MDButton";
import axios from "axios";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import { red } from "@mui/material/colors";

export default function allbidsdata( Data,handleconfirmedbids,handlesallbids,handledeals ) {


  const setdealaccept = (bidid) => (
    axios.post("http://localhost:5000/acceptbid", { bidid })
    .then((response) => {
        console.log(response.data.data);
        if (response.data.data === "success") {
            alert("Bid Accepted Successfully");
            handleconfirmedbids();
            handlesallbids();
            handledeals();
        }
        else {
            alert("Bid Accept Failed");
            console.log(response.data.data);
        }
    })
    );

  const setdealreject = (bidid) => (
    axios.post("http://localhost:5000/rejectbid", { bidid })
    .then((response) => {
        console.log(response.data.data);
        if (response.data.data === "success") {
            alert("Bid Rejected Successfully");
            handleconfirmedbids();
            handlesallbids();
            handledeals();
        }
        else {
            alert("Bid Reject Failed");
            console.log(response.data.data);
        }
    })
    );

  return {
    bidcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "dealbidproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "dealbidquantity", align: "center" },
      { Header: "Bid Amount", accessor: "dealbidamount", align: "center" },
      { Header: "Bidder", accessor: "dealbidder", align: "center" },
      { Header: "Bid Status", accessor: "dealbidstatus",  align: "center" },
      { Header: "Accept", accessor: "dealbidaccept", width: "15%", align: "center"},
      { Header: "Reject", accessor: "dealbidreject", width: "15%", align: "center"},
    ],
    bidrows: 
      Data.map((item) =>({
        dealbidid: item.dealbidid,
        dealbidproduct: item.dealbidproduct,
        dealbidquantity: item.dealbidquantity,
        dealbidamount: item.dealbidamount,
        dealbidder: item.dealbidder,
        dealbidstatus: item.dealbidstatus,
        dealbidaccept: (
            <CheckIcon fontSize="medium" color="success" onClick={() => setdealaccept(item.dealbidid)} style={{ cursor: "pointer" }}/>
        ),
        dealbidreject: (   
            <RemoveCircleOutlineIcon fontSize="medium" sx={{ color: red[500] ,cursor: "pointer"}} onClick={() => setdealreject(item.dealbidid)} />
        ),
          }))
  };
}
