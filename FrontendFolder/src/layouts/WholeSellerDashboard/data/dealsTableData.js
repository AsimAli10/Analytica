
import CheckIcon from '@mui/icons-material/Check';
import { green } from "@mui/material/colors";
import { useState } from 'react';
import { Modal } from '@mui/material';
import theme from "assets/theme";
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDBox from 'components/MDBox';

export default function dealsdata(Data, handleSubmit) {
  const [bidAmount, setBidAmount] = useState(0);
  const [dealId, setDealId] = useState('');
  const [open, setOpen] = useState(false);

  const handleBidAmountChange = (value) => {
    setBidAmount(value);
  };

  const handleDealIdChange = (id) => {
    setDealId(id);
    setOpen(true);
  };

  const handleBidSubmit = () => {
    handleSubmit(dealId, bidAmount);
    setBidAmount(0);
    setDealId('');
    setOpen(false);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return {
    dealcolumns: [
      { Header: "Product", accessor: "dealproduct", width: "30%", align: "center" },
      { Header: "Quantity", accessor: "dealquantity", align: "center" },
      { Header: "Budget", accessor: "dealbudget", align: "center" },
      { Header: "Requested By", accessor: "requestedby", width: "15%", align: "center" },
      { Header: "Action", accessor: "dealaction", width: "15%", align: "center" },
    ],

    dealrows: Data.map((item) => ({
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
          <Modal
            open={open && dealId === item.dealid}
            onClose={handleModalClose}
            aria-labelledby="bid-modal-title"
            aria-describedby="bid-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MDBox
              sx={{
                position: 'absolute',
                width: 400,
                borderRadius: '10px',
                border: '.5px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              bgColor="white"  
            >
              <h3 id="bid-modal-title" style={{ marginTop: 0 }}>Place a Bid</h3>
              <MDBox sx={{ marginBottom: '1rem' }}>
              <MDInput
                onChange={(e) => handleBidAmountChange(e.target.value)}
                type="number"
                label="Bid Amount"
                fullWidth
              />
              </MDBox>
              <MDButton
                variant="contained"
                onClick={handleBidSubmit}
                color="success"
                fullWidth
              >
                Submit Bid
              </MDButton>
            </MDBox>
          </Modal>
        </div>
      ),
    }))
  };
}