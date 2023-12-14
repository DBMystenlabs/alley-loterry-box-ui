import React, { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (address: string) => void;
  isSearching: boolean;
  hideCalculateButton: boolean;  // Added prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching, hideCalculateButton }) => {
  const [address, setAddress] = useState('');
  const walletAddressPattern = /^0x[a-fA-F0-9]{64}$/;

  const isValidAddress = walletAddressPattern.test(address);

  const handleSearchClick = () => {
    if (isValidAddress) {
      onSearch(address);
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
      {!isValidAddress && address !== '' && (
        <p className="error-message">Invalid Address</p>
      )}
      {!hideCalculateButton && (  // Conditional rendering based on hideCalculateButton
        <button 
          onClick={handleSearchClick} 
          disabled={isSearching || !isValidAddress}
          style={{ opacity: (isSearching || !isValidAddress) ? 0.5 : 1 }}
        >
          {isSearching ? 'Calculating...' : 'Calculate'}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
