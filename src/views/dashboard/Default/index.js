import { useEffect, useState } from 'react';

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
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ActiveCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <InactiveCard isLoading={isLoading} title={'Inactive'} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeLightCard isLoading={isLoading} title={'Total investment'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeDarkCard isLoading={isLoading} title={'Wallet Balance'} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalStaking isLoading={isLoading} title={'Total Staking'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <ConfirmWithdraw isLoading={isLoading} title={'Today Stacking'} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <PendingCard isLoading={isLoading} title={'Total Income'} />
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
            <TotalIncomeG isLoading={isLoading} title={'Total Income'} />
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
