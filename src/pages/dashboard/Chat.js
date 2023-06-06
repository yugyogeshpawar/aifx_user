import { useState } from 'react';
import * as Yup from 'yup';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Switch, Container, CardHeader, CardContent, FormControlLabel } from '@material-ui/core';
// routes
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// utils
import { fData } from '../../utils/formatNumber';
// components
//
import WithdrawForm from './WithdrawForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function Calendar() {
  return (
    <RootStyle title="Form Validation | AIFX-UI">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Withdraw"
          links={[{ name: 'Withdraw', href: PATH_DASHBOARD.user.root }, { name: 'Withdraw' }]}
        />
      </Container>

      <Container sx={{ mt: 10 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ position: 'static' }}>
              <CardHeader />
              <CardContent>
                <WithdrawForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
