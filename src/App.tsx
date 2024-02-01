import React, { useState } from 'react';
import { Button, CircularProgress, Link, Typography, Container, Box, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from "./components/SearchBar";
import DataTable from './components/DataTable';
import './styles/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877F2',
    },
  },
});

const App: React.FC = () => {
  const [s3Link, setS3Link] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tableData, setTableData] = useState<{ [key: string]: any }[]>([]);


  const handleSearch = async (address: string, startEpoch: string, endEpoch: string) => {
    // Store the last search parameters
    if (isSearching) return;
    setIsSearching(true);

    try {
      const requestBody = {
        wallet_address: address,
        start_epoch: parseInt(startEpoch),
        end_epoch: parseInt(endEpoch)
      };

      const response = await fetch('https://chsazirchtpzbx4ctca343ciwq0lnfoo.lambda-url.us-east-1.on.aws/', {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.records_found) {
        setS3Link(data.download_url);
        setTableData(data.data_frame);  // Set table data
      } else {
        setS3Link(null);
        setOpenSnackbar(true);
        setTableData([]);  // Reset table data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setS3Link(null);
    setIsSearching(false);
    setTableData([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message="Record not found for the given address."
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            SUI Staking Rewards Calculator
          </Typography>
          <SearchBar 
            onSearch={handleSearch} 
            isSearching={isSearching} 
            hideCalculateButton={!!s3Link}
          />
          {isSearching && <CircularProgress />}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {s3Link && (
              <>
                <Button 
                  variant="contained" 
                  color="primary" 
                  href={s3Link} 
                  download="file.xlsx"
                  component={Link}
                >
                  Download Excel File
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={handleReset}
                >
                  Back
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <DataTable data={tableData} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;