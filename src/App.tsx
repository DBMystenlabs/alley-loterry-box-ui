import React, { useState } from 'react';
import SearchBar from "./components/SearchBar";
import './styles/App.css';
import { Button, CircularProgress, Link, Typography, Container, Box, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const handleSearch = async (address: string) => {
    if (isSearching) return;
    setIsSearching(true);

    try {
      const url = new URL('https://k6dc2hc344kbuw4zjrxdq2m6wy0yxnxc.lambda-url.us-east-1.on.aws/');
      url.searchParams.append('address', address);

      const response = await fetch(url.toString(), { method: 'GET' });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);

      if (data.records_found) {
        setS3Link(data.message);
      } else {
        setS3Link(null);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSearching(false);
    }
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
            Ally's Lottery Box
          </Typography>
          <SearchBar 
            onSearch={handleSearch} 
            isSearching={isSearching} 
            hideCalculateButton={!!s3Link}  // Pass hideCalculateButton based on s3Link
          />
          {isSearching && <CircularProgress />}
          {s3Link && (
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                href={s3Link} 
                download="file.xlsx"
                component={Link}
              >
                Download Excel File
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
