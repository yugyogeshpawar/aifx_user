import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ChangePasswordForm } from '../../components/authentication/reset-password/index';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password | X-Pic">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <>
            <Typography variant="h3" paragraph>
              Enter new Password
            </Typography>

            <ChangePasswordForm
              onSent={() => setSent(true)}
              onGetPassword={(value) => setPassword(value)}
              onGetConfirmPassword={(value) => setConfirmPassword(value)}
            />

            <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
              Back
            </Button>
          </>
        </Box>
      </Container>
    </RootStyle>
  );
}
