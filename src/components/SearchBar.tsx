// SearchBar.tsx
import React, { useState } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  onSearch: (address: string) => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [address, setAddress] = useState('');
  const walletAddressPattern = /^0x[a-fA-F0-9]{64}$/; // Regular expression for wallet address

  // Function to check if the address is valid
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
        disabled={isSearching} // Disable input while searching
        className={!isValidAddress && address !== '' ? 'error' : ''}
      />
      {!isValidAddress && address !== '' && (
        <p className="error-message">Invalid Address</p> // Error message displayed when address is invalid
      )}
      <button 
        onClick={handleSearchClick} 
        disabled={isSearching || !isValidAddress} // Disable button while searching or if address is invalid
        style={{ opacity: (isSearching || !isValidAddress) ? 0.5 : 1 }}
      >
        {isSearching ? 'Calculating...' : 'Calculate'}
      </button>
    </div>
  );
};

export default SearchBar;
