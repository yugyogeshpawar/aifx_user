import { Container, Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'referralBonus', label: 'Referral Bonus', minWidth: 170 },
  { id: 'level', label: 'Level', minWidth: 100 },
  {
    id: 'fromUser',
    label: 'From User',
    minWidth: 170,
    align: 'right'
  }
];

function createData(id, date, referralBonus, level, fromUser) {
  return { id, date, referralBonus, level, fromUser };
}

const GROUPING_TABLE = [];

export default function BlogPost() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState([]);
  const getStakingData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/Earning/ReferralBonus', {
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
      GROUPING_TABLE.push(
        createData(i + 1, row.calculate_date, row.income_amt, row.income_level, row.income_member_id)
      );
    }
  }

  return (
    <RootStyle title="Components: Table | AIFX-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Referral Bonus"
          links={[{ name: 'Earning', href: PATH_DASHBOARD.user.root }, { name: 'Referral Bonus' }]}
        />
        <Card>
          <GroupingFixedHeader columns={COLUMNS} GROUPING_TABLE={GROUPING_TABLE} />
        </Card>
      </Container>
    </RootStyle>
  );
}
