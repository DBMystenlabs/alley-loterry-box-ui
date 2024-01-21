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

 
    const handleSearch = async (address: string, startEpoch: string, endEpoch: string) => {
      if (isSearching) return;
      setIsSearching(true);
    
      try {
        const requestBody = {
          wallet_address: address,
          start_epoch: parseInt(startEpoch),
          end_epoch: parseInt(endEpoch)
        };
    
        const response = await fetch('https://oew5h4gstfko43dzfzzll6sz4i0stnyq.lambda-url.us-east-1.on.aws/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
    
        if (data.records_found) {
          setS3Link(data.download_url);
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
