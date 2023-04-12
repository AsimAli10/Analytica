
// import MDButton from "components/MDButton";


export default function allbidsdata( Data ) {

  return {
    bidcolumns: [
    //   { Header: " ", accessor: "dealid", width: "30%", align: "left" },// keep this column hidden 
      { Header: "Product", accessor: "dealproduct", width: "20%", align: "center" },
      { Header: "Quantity", accessor: "dealquantity", align: "center" },
      { Header: "Bid Amount", accessor: "dealbidamount", align: "center" },
      { Header: "requestedby", accessor: "requestedby", align: "center" },
      { Header: "Bid Status", accessor: "bidstatus",  align: "center" },
    ],
    bidrows: 
      Data.map((item) =>({
        dealid: item.dealid,
        dealproduct: item.dealproduct,
        dealquantity: item.dealquantity,
        dealbidamount: item.dealbidamount,
        requestedby: item.requestedby,
        bidstatus: item.bidstatus,
          }))
  };
}
