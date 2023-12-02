import React, { useState } from 'react';
import SearchBar from "./components/SearchBar";
import './styles/App.css';
import { Button, CircularProgress, Link, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar } from '@mui/material';

// Define your theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1877F2', // Example color
    },

  },
});
const App: React.FC = () => {
  const [s3Link, setS3Link] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false); // New state to track if a search is in progress
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSearch = async (address: string) => {
    if(isSearching) return; // Prevent searching if already in progress

    setIsSearching(true); // Disable the search button
 
    console.log('S3 Link State:before', s3Link);
    try {
      const url = new URL('https://k6dc2hc344kbuw4zjrxdq2m6wy0yxnxc.lambda-url.us-east-1.on.aws/');
      url.searchParams.append('address', address);

      const response = await fetch(url.toString(), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      const data = JSON.parse(responseBody);
  
      if (data.records_found) {
        setS3Link(data.message); // Make sure this is a valid URL
      } else {
        setS3Link(null);
        setOpenSnackbar(true);  // Make sure to reset the s3Link if no URL is present
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately in your UI
    } finally {
      setIsSearching(false); // Re-enable the search button after the search is complete or fails
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
            Ally Lottery Box
          </Typography>
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
          {isSearching && <CircularProgress />}
          {s3Link && (
            <Box sx={{ mt: 2 }}> {/* Add margin top for spacing */}
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
  );}

export default App;
