
export default function confirmedbidsdata( Data ) {

  return {
    confirmedbidcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "confirmedproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "confirmedquantity", align: "center" },
      { Header: "Bid Amount", accessor: "confirmedamount", align: "center" },
      { Header: "Requested By", accessor: "requester", align: "center" },
      { Header: "Email", accessor: "requesteremail",  align: "center" },
      { Header: "Mobile Number", accessor: "requesternumber", width: "15%", align: "center"},

    ],
    confirmedbidrows: 
      Data.map((item) =>({
        confirmedproduct: item.confirmedproduct,
        confirmedquantity: item.confirmedquantity,
        confirmedamount: item.confirmedamount,
        requester: item.requester,
        requesteremail: item.requesteremail,
        requesternumber: item.requesternumber,
          }))
  };
}
