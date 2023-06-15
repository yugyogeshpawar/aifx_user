import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const VISIBLE_FIELDS = ['id', 'name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function QuickFilteringGrid() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 500
  });

  const rows2 = [
    {
      id: 1,
      record_no: 1,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      with_amt: 200,
      with_date: '2023-05-25T10:21:38.000Z',
      net_amt: 0,
      with_referrance: 'WITHDRAW46602642023-05-25 15:51:38',
      paid_status: 1,
      transaction_id: null,
      with_type: null,
      isverified: 0
    },
    {
      id: 2,
      record_no: 2,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      with_amt: 200,
      with_date: '2023-05-25T10:23:01.000Z',
      net_amt: 0,
      with_referrance: 'oodi469f92pj4u1w83ti9p',
      paid_status: 0,
      transaction_id: null,
      with_type: null,
      isverified: 0
    },
    {
      id: 3,
      record_no: 3,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      with_amt: 200,
      with_date: '2023-05-25T10:24:08.000Z',
      net_amt: 0,
      with_referrance: '9zqzg4J6Zfv5h9QMpPLZ',
      paid_status: 0,
      transaction_id: null,
      with_type: null,
      isverified: 2
    },
    {
      id: 4,
      record_no: 4,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      with_amt: 200,
      with_date: '2023-05-25T10:24:33.000Z',
      net_amt: 0,
      with_referrance: '8BWBOK1AERGADCDLSNGF',
      paid_status: 0,
      transaction_id: null,
      with_type: null,
      isverified: 0
    },
    {
      id: 5,
      record_no: 5,
      member_user_id: '4660264',
      member_name: 'JAYPATEL',
      with_amt: 200,
      with_date: '2023-05-25T10:26:05.000Z',
      net_amt: 0,
      with_referrance: '0DRWNRUX9RQZIAG9O5NM',
      paid_status: false,
      transaction_id: null,
      with_type: null,
      isverified: 1
    }
  ];

  const newcolumn = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'member_user_id',
      headerName: 'Member ID'
    },
    {
      field: 'member_name',
      headerName: 'Name',
      hide: 'true'
    },

    {
      field: 'with_amt',
      headerName: 'Withdraw Amount',
      width: 120
    },

    {
      field: 'with_date',
      headerName: 'Date of Amount ',
      hide: 'true'
    },
    {
      field: 'paid_status',
      headerName: 'Paid Status',
      type: 'boolean'
    }
  ];
  console.log(rows2);
  console.log(newcolumn);
  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);
  console.log(columns);

  return (
    <Box sx={{ height: '80vh', width: 1 }}>
      <DataGrid
        rows={rows2}
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
