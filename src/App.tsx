import React, { useState } from 'react';
import SearchBar from "./components/SearchBar";
import './styles/App.css';

const App: React.FC = () => {
  const [s3Link, setS3Link] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // New state to track if a search is in progress

  const handleSearch = async (address: string) => {
    if(isSearching) return; // Prevent searching if already in progress

    setIsSearching(true); // Disable the search button
    setS3Link(false);
    console.log('S3 Link State:before', s3Link);
    try {
      const url = new URL('https://4o7ziggfwa7v7265bpdcdd3ua40nogyu.lambda-url.ap-northeast-1.on.aws/');
      url.searchParams.append('address', address);

      const response = await fetch(url.toString(), {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody); // First parse to get the JSON string
      const data = JSON.parse(parsedBody.body); // Second parse to get the actual object
  
      if (data && data.download_url) {
        setS3Link(data.download_url); // Update the s3Link with the actual download URL
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately in your UI
    } finally {
      setIsSearching(false); // Re-enable the search button after the search is complete or fails
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <SearchBar onSearch={handleSearch} isSearching={isSearching} />
          {s3Link && <a href={s3Link} download="file.xlsx">Download Excel File</a>}
        </header>
      </div>
    </>
  );
};

export default App;
