// User list

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Stack from '@mui/material/Stack';

const VISIBLE_FIELDS = ['id', 'name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function QuickFilteringGrid() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 500
  });
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No data
      </Stack>
    );
  }
  const rows = [
    {
      id: '1',
      record_no: 1,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      sys_date: '2023-05-25T02:23:52.000Z',
      investment: '100.00',
      transaction_id: '12345',
      walletAddress: '3456784345678434567834567843456789',
      checked: 1,
      status: 0,
      deposit_type: 'Wallet'
    },
    {
      id: '2',
      record_no: 2,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      sys_date: '2023-05-25T02:26:29.000Z',
      investment: '100.00',
      transaction_id: '12345',
      walletAddress: '3456784345678434567834567843456789',
      checked: 0,
      status: 0,
      deposit_type: 'Wallet'
    },
    {
      id: '3',
      record_no: 3,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      sys_date: '2023-05-25T10:01:27.000Z',
      investment: '1234.00',
      transaction_id: 'iucghvjbkljkbhvgcnb',
      walletAddress: 'iugyfdtfguhkl',
      checked: 0,
      status: 0,
      deposit_type: 'Wallet'
    }
  ];
  const newcolumn = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'sys_date',
      headerName: 'Date',
      width: 200
    },
    {
      field: 'investment',
      headerName: 'Investment',
      hide: 'true'
    },

    {
      field: 'transaction_id',
      headerName: 'Transaction ID',
      width: 120
    },

    {
      field: 'walletAddress',
      headerName: 'Wallet Address',
      hide: 'true'
    }
  ];

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);
  console.log(columns);
  console.log(rows);
  console.log(newcolumn);
  return (
    <Box sx={{ height: '80vh', width: 1 }}>
      <DataGrid
        rows={rows}
        components={{ NoRowsOverlay }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 }
          }
        }}
        columns={newcolumn}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        sx={{ background: '#fff', padding: 2, borderRadius: 4 }}
      />
    </Box>
  );
}
