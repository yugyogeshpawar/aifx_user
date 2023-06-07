// User list

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

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(() => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)), [data.columns]);
  console.log(columns);

  return (
    <Box sx={{ height: '80vh', width: 1 }}>
      <DataGrid
        {...data}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: 0 }
          }
        }}
        columns={columns}
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
