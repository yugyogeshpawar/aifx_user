import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCode from '../../assets/images/qrcode/qr-code.png';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function ValidationTextFields() {
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = React.useState({
    wallet: '',
    staking: '',
    transactionHash: ''
  });
  const [validationErrors, setValidationErrors] = React.useState({
    wallet: '',
    staking: '',
    transactionHash: ''
  });

  const handleClick = () => {
    onCopyClick();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onCopyClick = () => {
    try {
      navigator.clipboard.writeText('0x3bCaD00fDde10EbB9285899dd01522D8E0A54337');
      setOpen(true);
    } catch (error) {
      const tempItem = document.createElement('input');
      tempItem.setAttribute('type', 'text');
      tempItem.setAttribute('display', 'none');
      const content = '0x3bCaD00fDde10EbB9285899dd01522D8E0A54337';
      tempItem.setAttribute('value', content);
      document.body.appendChild(tempItem);

      tempItem.select();
      document.execCommand('Copy');

      tempItem.parentElement.removeChild(tempItem);
      setOpen(true);
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const validateForm = () => {
    const errors = {};

    // Wallet validation
    if (formValues.wallet.trim() === '') {
      errors.wallet = 'Wallet is required.';
    }

    // Staking validation
    if (formValues.staking.trim() === '') {
      errors.staking = 'Staking amount is required.';
    }

    // Transaction hash validation
    if (formValues.transactionHash.trim() === '') {
      errors.transactionHash = 'Transaction hash is required.';
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data or perform any other desired action
      console.log('Form submitted:', formValues);
    } else {
      // Set validation errors
      setValidationErrors(errors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: 'fit-content', p: 4, borderRadius: '20px', mb: 4 }}
      >
        <TextField
          error={Boolean(validationErrors.wallet)}
          id="outlined-error-helper-text-wallet"
          label="Wallet"
          name="wallet"
          value={formValues.wallet}
          onChange={handleInputChange}
          helperText={validationErrors.wallet}
          sx={{
            mt: 2,
            width: { sm: 200, md: 300 },
            '& .MuiInputBase-root': {}
          }}
        />

        <TextField
          error={Boolean(validationErrors.staking)}
          id="outlined-error-helper-text-staking"
          label="Staking(USD)"
          name="staking"
          value={formValues.staking}
          onChange={handleInputChange}
          helperText={validationErrors.staking}
          sx={{
            mt: 2,
            width: '300px'
          }}
        />

        <TextField
          error={Boolean(validationErrors.transactionHash)}
          id="outlined-error-helper-text-transaction-hash"
          label="Transaction Hash"
          name="transactionHash"
          value={formValues.transactionHash}
          onChange={handleInputChange}
          helperText={validationErrors.transactionHash}
          sx={{
            mt: 2,
            width: { sm: 200, md: 300 },
            '& .MuiInputBase-root': {}
          }}
        />

        <Button type="submit" variant="contained" disableElevation sx={{ mt: 2, width: '200px' }}>
          Submit
        </Button>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: 'fit-content', p: 4, borderRadius: '20px', ml: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={QrCode} alt="QrCode" width={240} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
          <TextField
            // error
            disabled
            id="outlined-error-helper-text"
            label="0x3bCaD00fDde10EbB9285899dd01522D8E0A54337"
            // defaultValue="Hello World"
            sx={{
              width: '100%'
            }}
          />
          <ContentCopyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} onClick={handleClick} />

          <Snackbar
            style={{ backgroundColor: '#fff' }}
            open={open}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
            message="Copied"
            action={action}
          />
        </Box>
      </Box>
    </Box>
  );
}
