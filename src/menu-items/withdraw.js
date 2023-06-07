// assets
import { IconMoneybag } from '@tabler/icons';

// constant
const icons = {
  IconMoneybag
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const withdraw = {
  id: 'payout',
  title: 'Payout',
  //   caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'withdraw',
      title: 'Withdraw',
      type: 'collapse',
      icon: icons.IconMoneybag,

      children: [
        {
          id: 'withdraw',
          title: 'Withdraw',
          type: 'item',
          url: '/withdraw'
        },
        {
          id: 'withdraw-history',
          title: 'Withdraw History',
          type: 'item',
          url: '/withdraw/history'
        }
      ]
    }
  ]
};

export default withdraw;
