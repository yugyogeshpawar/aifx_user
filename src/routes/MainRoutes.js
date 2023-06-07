import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const ReferralBonus = Loadable(lazy(() => import('views/earning/ReferralBonus')));
const StackingBonus = Loadable(lazy(() => import('views/earning/StackingBonus')));
const Withdraw = Loadable(lazy(() => import('views/payout/Withdraw')));
const Withdrawhistory = Loadable(lazy(() => import('views/payout/Withdrawhistory')));
const Stacking = Loadable(lazy(() => import('views/stacking/Index')));
const Myreferrals = Loadable(lazy(() => import('views/team/Myreferrals')));
const Myteam = Loadable(lazy(() => import('views/team/Myteam')));
const StackingSummary = Loadable(lazy(() => import('views/stacking/StackingSummary')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: '',
      element: <DashboardDefault />
    },
    {
      path: 'stacking',
      element: <Stacking />
    },
    {
      path: 'stacking-summary',
      element: <StackingSummary />
    },
    {
      path: 'team',
      children: [
        {
          path: 'my-referrals',
          element: <Myreferrals />
        },
        {
          path: 'my-team',
          element: <Myteam />
        }
      ]
    },
    {
      path: 'stacking',
      children: [
        {
          path: 'bonus',
          element: <StackingBonus />
        },
        {
          path: 'ref-bonus',
          element: <ReferralBonus />
        }
      ]
    },
    {
      path: 'withdraw',
      element: <Withdraw />
    },
    {
      path: 'withdraw',
      children: [
        {
          path: 'history',
          element: <Withdrawhistory />
        }
      ]
    },
    {
      path: 'util',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
