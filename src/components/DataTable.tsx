import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

interface DataTableProps {
  data: { [key: string]: any }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  if (!data || data.length === 0) return <p></p>;

  const columns = data[0] ? Object.keys(data[0]) : [];

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log('event', event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const paginationStyles = {
    color: 'white',
  };

  const headerStyles = {
    fontWeight: 'bold',
  };

  const rowStyles = (index: number) => ({
    backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white', // Alternate row colors
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={headerStyles}>{column}</TableCell> // Apply bold font for headers
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((row, rowIndex) => (
              <TableRow key={rowIndex} sx={rowStyles(rowIndex)}>  {/* Apply alternate row colors */}
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={paginationStyles}
      />
    </div>
  );
};

export default DataTable;
