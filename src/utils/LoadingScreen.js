import React from 'react';
import { CircularProgress, Backdrop } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)'
//   },
//   loadingContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   spinner: {
//     marginBottom: theme.spacing(2)
//   },
//   loadingText: {
//     marginTop: theme.spacing(2),
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//     letterSpacing: 1
//   }
// }));

const LoadingScreen = () => {
  return (
    <Backdrop sx={{ backgroundColor: '#fff' }} open={true}>
      <CircularProgress color="warning" />
    </Backdrop>
  );
};

export default LoadingScreen;
