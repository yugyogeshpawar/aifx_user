import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getTeams } from '../../redux/user';
import { format } from 'date-fns';

export default function QuickFilteringGrid() {
  const [row, setRow] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const res = await getTeams();
      if (Array.isArray(res?.data)) {
        setRow((prevRow) => {
          const newRow = res.data.map((element) => ({
            id: nextId,
            member_user_id: element.member_user_id,
            member_name: element.member_name,
            email: element.email,
            registration_date: format(new Date(element.registration_date), 'dd-MM-yyyy'),
            topup_amount: element.topup_amount
          }));
          setNextId((prevId) => prevId + newRow.length);
          return [...prevRow, ...newRow];
        });
      }
    };

    getData();
  }, []);

  const newColumns = React.useMemo(
    () => [
      { field: 'id', headerName: 'ID' },
      { field: 'member_user_id', headerName: 'Member ID' },
      { field: 'member_name', headerName: 'Name', hide: true },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'registration_date', headerName: 'Date of Registration', hide: true, width: 150 },
      { field: 'topup_amount', headerName: 'Topup Amount', width: 200 }
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
