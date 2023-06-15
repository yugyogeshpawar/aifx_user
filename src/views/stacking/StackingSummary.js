import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getStacking } from '../../redux/user';
import { format } from 'date-fns';

export default function QuickFilteringGrid() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getStacking();
      if (Array.isArray(res?.data)) {
        setRow((prevRow) => {
          const newRow = res.data.map((element) => ({
            id: element.record_no,
            member_user_id: element.member_user_id,
            member_name: element.member_name,
            sys_date: format(new Date(element.sys_date), 'dd-MM-yyyy'),
            investment: element.investment,
            transaction_id: element.transaction_id,
            walletAddress: element.walletAddress,
            checked: element.checked,
            status: element.status,
            deposit_type: element.deposit_type
          }));
          return [...prevRow, ...newRow];
        });
      }
    };

    getData();
  }, []);

  const columns = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'sys_date', headerName: 'Date', width: 120 },
      { field: 'investment', headerName: 'Investment', hide: true, width: 120 },
      { field: 'transaction_id', headerName: 'Transaction ID', flex: 1 },
      { field: 'walletAddress', headerName: 'Wallet Address', hide: true, flex: 1 }
    ],
    []
  );

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
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
