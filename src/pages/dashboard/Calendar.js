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
  { id: 'withdrawal', label: 'Withdrawal', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  }
];

function createData(id, date, withdrawal, type, status) {
  return { id, date, withdrawal, type, status };
}

const GROUPING_TABLE = [];

export default function UserCards() {
  const { themeStretch } = useSettings();
  const [data, setData] = useState([]);
  const getStakingData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/Withdraw/Summary', {
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
      GROUPING_TABLE.push(createData(row.record_no, row.with_date, row.with_amt, row.with_type, row.paid_status));
    }
  }

  return (
    <RootStyle title="Components: Table | AIFX-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Withdrawal History"
          links={[{ name: 'Withdraw', href: PATH_DASHBOARD.user.root }, { name: 'Withdrawal History' }]}
        />
        <Card>
          <GroupingFixedHeader columns={COLUMNS} GROUPING_TABLE={GROUPING_TABLE} />
        </Card>
      </Container>
    </RootStyle>
  );
}
