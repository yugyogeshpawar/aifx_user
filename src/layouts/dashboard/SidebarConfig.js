// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ---------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    items: [
      // MANAGEMENT : USER
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.ecommerce },
      {
        title: 'Staking',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Staking', path: PATH_DASHBOARD.user.profile },
          { title: 'Staking Summary', path: PATH_DASHBOARD.user.cards }
        ]
      },

      // MANAGEMENT : E-COMMERCE
      {
        title: 'Team',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'My Referral', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'My Team', path: PATH_DASHBOARD.eCommerce.productById }
        ]
      },

      // MANAGEMENT : BLOG
      {
        title: 'Earning',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'Staking Bonus', path: PATH_DASHBOARD.blog.posts },
          { title: 'Referral Bonus', path: PATH_DASHBOARD.blog.postById }
        ]
      },
      {
        title: 'Withdraw',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.mail,
        children: [
          { title: 'Withdraw', path: PATH_DASHBOARD.chat.root },
          { title: 'Withdraw History', path: PATH_DASHBOARD.calendar }
        ]
      }
    ]
  }

  // APP
  // ----------------------------------------------------------------------
];

export default sidebarConfig;
