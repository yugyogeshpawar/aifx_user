// assets
import { IconKey, IconZoomMoney, IconReportMoney } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconReportMoney,
  IconZoomMoney
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const earning = {
  id: 'earning',
  title: 'Earning',
  type: 'group',
  children: [
    {
      id: 'stackingbonus',
      title: 'Stacking Bonus',
      type: 'item',
      url: '/stacking/bonus',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    },
    {
      id: 'ref-bonus',
      title: 'Referral Bonus',
      type: 'item',
      url: '/stacking/ref-bonus',
      icon: icons.IconZoomMoney,
      breadcrumbs: false
    }
  ]
};

export default earning;
