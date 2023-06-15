import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getWithdrawHistory } from '../../redux/user';
import { format } from 'date-fns';

export default function QuickFilteringGrid() {
  const [row, setRow] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getWithdrawHistory();
      console.log(res.data);
      if (Array.isArray(res?.data)) {
        setRow(
          res.data.map((element, index) => ({
            id: index + 1,
            member_user_id: element.member_user_id,
            member_name: element.member_name,
            with_amt: element.withdraw_amount,
            with_date: format(new Date(element.with_date), 'dd-MM-yyyy'),
            paid_status: element.paid_status
          }))
        );
      }
    };

    getData();
  }, []);

  const newColumns = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'member_user_id', headerName: 'Member ID' },
      { field: 'member_name', headerName: 'Name', hide: true },
      { field: 'with_amt', headerName: 'Withdraw Amount', width: 120 },
      { field: 'with_date', headerName: 'Date of Amount', hide: true },
      { field: 'paid_status', headerName: 'Paid Status', type: 'boolean' }
    ],
    []
  );

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={row}
        columns={newColumns}
        autoPageSize
        components={{ Toolbar: GridToolbar }}
        quickFilterText="Search"
        sx={{ background: '#fff', padding: 2, borderRadius: 4 }} // Apply custom styles to the DataGrid
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
    </div>
  );
}
