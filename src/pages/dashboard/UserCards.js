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
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'stacking', label: 'Stacking(USD)', minWidth: 100 },
  {
    id: 'transaction',
    label: 'Transaction',
    minWidth: 170,
    align: 'right'
  }
];

function createData(id, date, stacking, transaction) {
  return { id, date, stacking, transaction };
}

const GROUPING_TABLE = [];

export default function UserCards() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState([]);
  const getStakingData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/Staking/Summary', {
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
      GROUPING_TABLE.push(createData(row.record_no, row.sys_date, row.investment, row.transaction_id));
    }
  }

  return (
    <RootStyle title="Components: Table | AIFX-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Staking Summary"
          links={[{ name: 'Staking', href: PATH_DASHBOARD.user.root }, { name: 'Staking Summary' }]}
        />
        <Card>
          <GroupingFixedHeader columns={COLUMNS} GROUPING_TABLE={GROUPING_TABLE} />
        </Card>
      </Container>
    </RootStyle>
  );
}
