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
  const rows = [
    {
      id: 1,
      member_id: 8,
      member_user_id: '1373334',
      member_name: 'JAYPATEL',
      sponcer_id: '4660264',
      sponcer_name: 'JAYPATEL',
      wallet_address: null,
      password: '$2b$10$jSTCdEQWVcw/4H3/74MGU.qyxIrsgA2XlGGc/lPXpSPcPti5Cvo3q',
      promoter_id: null,
      promoter_name: null,
      contact: '3456434565',
      email: 'jay12344@gmail.com',
      status: 0,
      registration_date: '2023-05-25T03:43:09.000Z',
      member_status: 0,
      kyc_status: 0,
      topup_amount: 0,
      direct_member: 0,
      wallet_amount: 0,
      checked: 0,
      withdrawal_amt: 0,
      block_status: 0,
      current_investment: 0,
      direct_business: 0,
      total_earning: 0,
      isblock: 0,
      team_business: 0,
      expiry_date: null,
      team_member: 0,
      activation_date: null,
      profile_image: null,
      front_image: null,
      back_image: null,
      member_dob: null,
      address: null,
      pincod: 0,
      gender: null,
      country_code: 0,
      state: null,
      city: null,
      calTeamStatus: 0,
      updateWallet: 0,
      OTP: null,
      OTP_Expiry: null
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
      field: 'email',
      headerName: 'Email',
      width: 120
    },

    {
      field: 'registration_date',
      headerName: 'Date of Registration ',
      hide: 'true',
      width: 150
    },
    {
      field: 'topup_amount',
      headerName: 'Topup Amount'
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