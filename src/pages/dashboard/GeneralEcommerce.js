// material
import { Container, Grid } from '@material-ui/core';
import useAuth from '../../hooks/useAuth';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { EcommerceWelcome } from '../../components/_dashboard/general-ecommerce';
import CopyToClipboard from '../components-overview/extra/CopyToClipboard';

// ----------------------------------------------------------------------

export default function GeneralEcommerce() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="General: E-commerce | AIFX-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={5}>
          {/* Iterate through the data object and display the data in the UI */}

          <Grid item xs={4}>
            <EcommerceWelcome title="Total Staking" value={user.topup_amount} />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="2X %" value="NA" />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Direct Member" value={user.EcommerceWelcome} />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Direct Business" value={user.direct_business} />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Team Business" value={user.team_business} />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Staking Bonus" value="NA" />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Referral Bonus" value="NA" />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Wallet Balance" value={user.wallet_amount} />
          </Grid>
          <Grid item xs={4}>
            <EcommerceWelcome title="Withdraw" value={user.withdrawal_amt} />
          </Grid>
          <Grid item xs={12}>
            <CopyToClipboard userID={user.id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
