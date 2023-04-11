
export default function confirmedbidsdata( Data ) {

  return {
    confirmedbidcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "confirmedproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "confirmedquantity", align: "center" },
      { Header: "Bid Amount", accessor: "confirmedamount", align: "center" },
      { Header: "Bidder", accessor: "bidder", align: "center" },
      { Header: "Email", accessor: "bidderemail",  align: "center" },
      { Header: "Mobile Number", accessor: "biddernumber", width: "15%", align: "center"},

    ],
    confirmedbidrows: 
      Data.map((item) =>({
        confirmedproduct: item.confirmedproduct,
        confirmedquantity: item.confirmedquantity,
        confirmedamount: item.confirmedamount,
        bidder: item.bidder,
        bidderemail: item.bidderemail,
        biddernumber: item.biddernumber,
          }))
  };
}
