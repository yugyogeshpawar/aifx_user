import { Container, Box, Card } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import Page from '../../components/Page';
import useSettings from '../../hooks/useSettings';
import GroupingFixedHeader from '../components-overview/material-ui/table/GroupingFixedHeader';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15)
}));

const COLUMNS = [
  { id: 'id', label: '#', minWidth: 170 },
  { id: 'userId', label: 'User Id', minWidth: 170 },
  { id: 'stacking', label: 'Stacking(USD)', minWidth: 100 },
  {
    id: 'teamBusiness',
    label: 'Team Business(USD)',
    minWidth: 170,
    align: 'right'
  }
];

function createData(id, userId, stacking, teamBusiness) {
  return { id, userId, stacking, teamBusiness };
}

const GROUPING_TABLE = [];

export default function EcommerceShop() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState([]);
  const getStakingData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/Team/MyReferral', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setData([...response.data.data]);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStakingData();
  }, []);
  if (data.length !== 0 && GROUPING_TABLE.length === 0) {
    for (let i = 0; i < data.length; i += 1) {
      const row = data[i];
      GROUPING_TABLE.push(createData(i + 1, row.member_user_id, row.current_investment, row.team_business));
    }
  }

  return (
    <RootStyle title="Components: Table | AIFX-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="My Referral"
          links={[{ name: 'Team', href: PATH_DASHBOARD.user.root }, { name: 'My Referral' }]}
        />
        <Card>
          <GroupingFixedHeader columns={COLUMNS} GROUPING_TABLE={GROUPING_TABLE} />
        </Card>
      </Container>
    </RootStyle>
  );
}
