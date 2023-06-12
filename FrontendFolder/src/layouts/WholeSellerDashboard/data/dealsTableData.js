import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { green } from "@mui/material/colors";

export default function dealsdata(Data, handleSubmit) {
  const handleDealIdChange = (id) => {
    const bidAmount = prompt("Enter Bid Amount"); // Prompt the user for bid amount
    if (bidAmount !== null) {
      handleSubmit(id, Number(bidAmount));
      // Perform any additional actions with the submitted bid
      alert(`Submitted Bid: Bid Amount - ${bidAmount}`);
    }
  };

  const dealrows = Data.map((item) => ({
    dealid: item.dealid,
    dealproduct: item.dealproduct,
    dealquantity: item.dealquantity,
    dealbudget: item.dealbudget,
    requestedby: item.requestedby,
    dealaction: (
      <div>
        <CheckIcon
          fontSize="medium"
          sx={{ color: green[500], cursor: 'pointer' }}
          onClick={() => handleDealIdChange(item.dealid)}
        />
      </div>
    ),
  }));

  return {
    dealcolumns: [
      { Header: "Product", accessor: "dealproduct", width: "30%", align: "center" },
      { Header: "Quantity", accessor: "dealquantity", align: "center" },
      { Header: "Budget", accessor: "dealbudget", align: "center" },
      { Header: "Requested By", accessor: "requestedby", width: "15%", align: "center" },
      { Header: "Action", accessor: "dealaction", width: "15%", align: "center" },
    ],
    dealrows,
  };
}
