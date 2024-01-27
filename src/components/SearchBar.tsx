// SearchBar.tsx
import React, { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (address: string, startEpoch: string, endEpoch: string) => void;
  isSearching: boolean;
  hideCalculateButton: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching, hideCalculateButton }) => {
  const [address, setAddress] = useState('');
  const [endEpoch, setEndEpoch] = useState('');
  const walletAddressPattern = /^0x[a-fA-F0-9]{64}$/;

  const isValidAddress = walletAddressPattern.test(address);
  const isValidEndEpoch = endEpoch !== '' && parseInt(endEpoch, 10) > 0;
  const isFormValid = isValidAddress && isValidEndEpoch;

  const handleSearchClick = () => {
    if (isFormValid) {
      onSearch(address, '0', endEpoch);
    } else {
      // Handle the error state here, for example, show an error message
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={isSearching}
        className={!isValidAddress && address !== '' ? 'error' : ''}
      />
      {!isValidAddress && address !== '' && <p className="error-message">Invalid Address</p>}
      
      <input
        type="text"
        placeholder="Start Epoch"
        value="0"
        disabled // This input field is always disabled
      />

      <input
        type="text"
        placeholder="End Epoch"
        value={endEpoch}
        onChange={(e) => setEndEpoch(e.target.value)}
        disabled={isSearching}
        className={!isValidEndEpoch ? 'error' : ''}
      />
     
      
      {!hideCalculateButton && (
        <button 
          onClick={handleSearchClick} 
          disabled={isSearching || !isFormValid}
          style={{ opacity: (isSearching || !isFormValid) ? 0.5 : 1 }}
        >
          {isSearching ? 'Calculating...' : 'Calculate'}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
