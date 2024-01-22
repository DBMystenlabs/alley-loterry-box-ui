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
  const [epochError, setEpochError] = useState('');
  const walletAddressPattern = /^0x[a-fA-F0-9]{64}$/;
  const epochPattern = /^\d+$/; // Regular expression for integer values

  const isValidAddress = walletAddressPattern.test(address);
  const isValidStartEpoch = epochPattern.test(startEpoch);
  const isValidEndEpoch = epochPattern.test(endEpoch);
  const isEpochOrderValid = parseInt(startEpoch, 10) <= parseInt(endEpoch, 10);
  const isFormValid = isValidAddress && isValidStartEpoch && isValidEndEpoch && isEpochOrderValid;

  const handleSearchClick = () => {
    if (!isEpochOrderValid) {
      setEpochError('Start epoch should not be greater than end epoch.');
      return;
    }

    if (isFormValid) {
      setEpochError(''); // Clear any previous error messages
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
      {!isValidAddress && address !== '' && <p className="error-message">Invalid Address</p>}
      
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
      {epochError && <p className="error-message">{epochError}</p>}
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
