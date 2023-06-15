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
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: 'fit-content', p: 4, borderRadius: '20px', mb: 4 }}
      >
        <TextField
          // error
          id="outlined-error-helper-text"
          label="Wallet"
          // defaultValue="Hello World"
          helperText="Incorrect entry."
          sx={{
            mt: 2,
            width: { sm: 200, md: 300 },
            '& .MuiInputBase-root': {}
          }}
        />

        <TextField
          // error
          id="outlined-error-helper-text"
          label="Staking(USD)"
          // defaultValue="Hello World"
          helperText="Incorrect entry."
          sx={{
            mt: 2,
            width: '300px'
          }}
        />

        <TextField
          // error
          id="outlined-error-helper-text"
          label="Transaction Hash "
          // defaultValue="Hello World"
          helperText="Incorrect entry."
          sx={{
            mt: 2,
            width: { sm: 200, md: 300 },
            '& .MuiInputBase-root': {}
          }}
        />

        <Button variant="contained" disableElevation sx={{ mt: 2, width: '200px' }}>
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
