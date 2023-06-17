import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function StakingBonusPage() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch staking bonus data from the API
      const res = await getStakingBonus(); // Replace with your API call
      if (Array.isArray(res?.data)) {
        // Map the data to the desired structure
        const mappedData = res.data.map((item, index) => ({
          id: index + 1,
          date: format(new Date(item.date), 'dd-MM-yyyy'),
          memberUserId: item.memberUserId,
          memberName: item.memberName,
          walletAddress: item.walletAddress,
          walletAmount: item.walletAmount
        }));
        setRows(mappedData);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (id) => {
    // Handle button click to navigate to the transaction details page
    navigate(`/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'Id' },
    { field: 'date', headerName: 'Date' },
    { field: 'memberUserId', headerName: 'User Id', hide: true },
    { field: 'memberName', headerName: 'Name', width: 120 },
    { field: 'walletAddress', headerName: 'Wallet Address', width: 200 },
    { field: 'walletAmount', headerName: 'Wallet Amount', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 150,
      renderCell: (params) => <Button onClick={() => handleButtonClick(params.row.id)}>Show Transaction</Button>
    }
  ];

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        autoPageSize
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        sx={{ background: '#fff', padding: 2, borderRadius: 4 }}
      />
    </div>
  );
}
