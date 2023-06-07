// assets
import { IconKey, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const team = {
  id: 'team',
  title: 'Team',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'my-ref',
      title: 'Team',
      type: 'collapse',
      icon: icons.IconUsers,

      children: [
        {
          id: 'my-ref',
          title: 'My Referrals',
          type: 'item',
          url: '/team/my-referrals'
        },
        {
          id: 'stacking-summary',
          title: 'Stacking Summary',
          type: 'item',
          url: '/team/my-team'
        }
      ]
    }
  ]
};

export default team;
