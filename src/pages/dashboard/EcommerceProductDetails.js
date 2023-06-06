import { Container, Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  { id: 'level', label: 'Level', minWidth: 170 },
  { id: 'userId', label: 'User Id', minWidth: 170 },
  { id: 'sponsorId', label: 'Sponsor Id', minWidth: 170 },
  { id: 'stacking', label: 'Stacking(USD)', minWidth: 100 }
];

function createData(id, level, userId, sponsorId, stacking) {
  return { id, level, userId, sponsorId, stacking };
}

const GROUPING_TABLE = [];

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState([]);
  const getStakingData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/Team/MyTeam', {
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
      GROUPING_TABLE.push(createData(i + 1, row.level, row.member_user_id, row.sponcer_id, row.current_investment));
    }
  }

  return (
    <RootStyle title="Components: Table | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="My Team"
          links={[{ name: 'Team', href: PATH_DASHBOARD.user.root }, { name: 'My Team' }]}
        />
        <Card>
          <GroupingFixedHeader columns={COLUMNS} GROUPING_TABLE={GROUPING_TABLE} />
        </Card>
      </Container>
    </RootStyle>
  );
}
