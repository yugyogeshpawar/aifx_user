import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const VISIBLE_FIELDS = ['id', 'name', 'rating', 'email', 'country', 'city', 'dateCreated', 'isAdmin', 'phone', 'position'];

export default function QuickFilteringGrid() {
  const navigate = useNavigate();
  const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100
  });

  const User = {
    initialState: {
      columns: {
        columnVisibilityModel: {
          ActionButton: false,
          date: false,
          member_user_id: false,
          member_name: false,
          wallet_addres: false,
          Wallet_amount: false
        }
      }
    },
    columns: [],
    rows: [
      {
        id: 1,
        date: '20-5-2023',
        memberUserId: '6873419',
        memberName: 'X PIC',
        walletAddres: '0x54554fhef0dfg',
        requestAmount: 8000
      }
    ]
  };

  // Otherwise filter will be applied on fields such as the hidden column id

  const newcolumn = [
    {
      field: 'id',
      headerName: 'Id'
    },
    {
      field: 'date',
      headerName: 'Date'
    },

    {
      field: 'memberUserId',
      headerName: 'User Id',
      hide: true
    },
    {
      field: 'memberName',
      headerName: 'Name',
      width: 120
    },
    {
      field: 'walletAddres',
      headerName: 'Wallet Address',
      width: 200
    },
    {
      field: 'walletAmount',
      headerName: 'Wallet Amount',
      width: 120
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      renderCell: (param) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          navigate(`/${param.id}`);
        };

        return <Button onClick={onClick}>Show Transaction</Button>;
      }
    }
  ];
  console.log(newcolumn);
  console.log(data);

  return (
    <Box sx={{ height: '82vh', width: 1 }}>
      <DataGrid
        {...User}
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
