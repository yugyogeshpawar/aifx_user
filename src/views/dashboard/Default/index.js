import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import InactiveCard from './DashboardCard/InactiveCard';
import PendingCard from './DashboardCard/PendingCard';
import TotalStaking from './DashboardCard/TotalStaking';
import ConfirmWithdraw from './DashboardCard/ConfirmWithdraw';
import ActiveCard from './DashboardCard/ActiveCard';
import TotalIncomeG from './DashboardCard/TotalIncomeG';
import TotalIncomeN from './DashboardCard/TotalIncomeN';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} totalEarning={user?.total_earning} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} directBusiness={user?.direct_business} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ActiveCard isLoading={isLoading} title="Team Members" teams={user?.direct_business} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ConfirmWithdraw isLoading={isLoading} title="Direct Member" directMember={user?.direct_member} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <InactiveCard isLoading={isLoading} title={'Inactive Members'} inactive={0} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeLightCard isLoading={isLoading} title={'Total investment'} topupAmount={user?.topup_amount} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeDarkCard isLoading={isLoading} title={'Team Business'} teamBusiness={user?.team_business} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalStaking isLoading={isLoading} title={'Refferal Bonus'} refBonus={user?.team_business} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <PendingCard isLoading={isLoading} title={'Stacking Bonus'} stackingBonus={user?.total_earning} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeN isLoading={isLoading} title={'Withdraw Amount'} withdrawAmount={user?.withdrawal_amt} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <PendingCard isLoading={isLoading} title={'Pending Withdraw Request'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeG isLoading={isLoading} title={'Total Staking'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <InactiveCard isLoading={isLoading} title={'Inactive'} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
