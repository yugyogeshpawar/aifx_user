import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function ValidationTextFields() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ display: 'flex', flexDirection: 'column', background: 'white', width: 'fit-content', p: 4, borderRadius: '20px' }}
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
  );
}
