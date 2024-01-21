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
  const [startEpoch, setStartEpoch] = useState('');
  const [endEpoch, setEndEpoch] = useState('');
  const walletAddressPattern = /^0x[a-fA-F0-9]{64}$/;
  const epochPattern = /^\d+$/; // Regular expression for integer values

  const isValidAddress = walletAddressPattern.test(address);
  const isValidStartEpoch = epochPattern.test(startEpoch);
  const isValidEndEpoch = epochPattern.test(endEpoch);
  const isFormValid = isValidAddress && isValidStartEpoch && isValidEndEpoch;

  const handleSearchClick = () => {
    if (isFormValid) {
      onSearch(address, startEpoch, endEpoch);
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
      <input
        type="text"
        placeholder="Start Epoch"
        value={startEpoch}
        onChange={(e) => setStartEpoch(e.target.value)}
        disabled={isSearching}
        className={!isValidStartEpoch && startEpoch !== '' ? 'error' : ''}
      />
      <input
        type="text"
        placeholder="End Epoch"
        value={endEpoch}
        onChange={(e) => setEndEpoch(e.target.value)}
        disabled={isSearching}
        className={!isValidEndEpoch && endEpoch !== '' ? 'error' : ''}
      />
      {!isValidAddress && address !== '' && <p className="error-message">Invalid Address</p>}
      {(!isValidStartEpoch || !isValidEndEpoch) && startEpoch !== '' && endEpoch !== '' && (
        <p className="error-message">Invalid Epoch Value</p>
      )}
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
