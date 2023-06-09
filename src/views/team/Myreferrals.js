// User list

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Data
    </Stack>
  );
}
const initialState = {
  columns: {
    columnVisibilityModel: {
      id: false,
      member_user_id: false,
      member_name: false,
      contact: false,
      address: false,
      sponcer_id: false,
      sponcer_name: false,
      wallet_address: false
    }
  }
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'member_name',
    headerName: 'Name',
    width: 150,
    editable: true
  },
  {
    field: 'sponcer_id',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
  {
    field: 'sponcer_name',
    headerName: 'Sponcer Id',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },

  {
    field: 'email',
    headerName: 'email',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
  {
    field: 'wallet_address',
    headerName: 'wallet_address',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },

  {
    field: 'topup_amount',
    headerName: 'topup_amount',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
  {
    field: 'team_member',
    headerName: 'team_member',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  }
];

console.log(initialState);

const data2 = [
  {
    id: 1,
    memberId: 1,
    member_user_id: '6873419',
    member_name: 'X PIC',
    sponcer_id: '4789213',
    sponcer_name: 'company',
    wallet_address: '0x5acf4e2daddc5c0e8d5aa1debdf33a11e2ebdfca',
    password: '$2b$10$MT1bdZmVAeKpjOchWfFAlOMrSEYvImgfTvyPz.SmzH8oFRLmEOcym',
    promoter_id: '4789213',
    promoter_name: 'company',
    email: 'mds286751@gmail.com',
    contact: '9956111847',
    status: 1,
    registration_date: '2022-11-29T03:41:01.000Z',
    member_status: 1,
    kyc_status: 2,
    topup_amount: 1000,
    direct_member: 1,
    wallet_amount: 10,
    checked: 1,
    withdrawal_amt: 0,
    block_status: 0,
    current_investment: 1000,
    direct_business: 10200,
    total_earning: 1020,
    isblock: 0,
    team_business: 754800,
    expiry_date: '2022-12-03T18:30:00.000Z',
    team_member: 699,
    activation_date: '2022-11-29T03:41:01.000Z',
    profile_image: 'cqb29dnl3u75h864sekzwrvymfta1xgj.jpeg',
    front_image: 'kjv3f8htamzlwe9g62c1xqd7ryb4snu5.jpeg',
    back_image: '6fxrw2u71ekmlt5as8vyjdcbn4g3z9qh.jpeg',
    member_dob: '09/07/1995',
    address: 'allahabad',
    pincod: 211019,
    gender: 'Male',
    country_code: 91,
    state: 'Uttar Prades',
    city: 'Alld',
    calTeamStatus: 1,
    updateWallet: 0,
    OTP: null,
    OTP_Expiry: null
  }
];

const columns2 = [
  {
    field: 'id',
    headerName: 'Id'
  },
  {
    field: 'member_user_id',
    headerName: 'Member User Id',
    editable: false
  },
  {
    field: 'member_name',
    headerName: 'Member Name',
    editable: false
  },
  {
    filed: 'contact',
    headerName: 'Contact',
    editable: false
  },
  {
    filed: 'address',
    headerName: 'Email',
    editable: false
  },
  {
    field: 'sponcer_id',
    headerName: 'Sponcer Id',
    editable: false
  },

  {
    field: 'sponcer_name',
    headerName: 'Sponcer Name',
    editable: false
  },
  {
    field: 'wallet_address',
    headerName: 'Wallet Address',
    editable: false
  }
];
console.log(columns2);
console.log(data2);

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data2}
        components={{ NoRowsOverlay }}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />    
    </Box>
  );
}
