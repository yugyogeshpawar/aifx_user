import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import axios from 'axios';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Link, Container, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { VerifyCodeForm } from '../../components/authentication/verify-code';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const { enqueueSnackbar } = useSnackbar();

  const ResendCode = async () => {
    const userId = sessionStorage.getItem('email');
    console.log('resend code');
    try {
      const response = await axios.post('http://localhost:3010/api/auth/forgetPassword', {
        userId
      });
      if (response.status === 200) {
        enqueueSnackbar('Code sent successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Please Try Again!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Unexpected error occurred! Please Try Again', { variant: 'error' });
      console.log(error);
    }
  };

  return (
    <RootStyle title="Verify | X-Pic">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_AUTH.login}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          <Typography variant="h3" paragraph>
            Please check your email!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your
            email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm />
          </Box>

          <Typography variant="body2" align="center">
            Don’t have a code? &nbsp;{' '}
            <Link style={{ color: '#1976d2', cursor: 'pointer' }} onClick={ResendCode}>
              Resend code
            </Link>
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
