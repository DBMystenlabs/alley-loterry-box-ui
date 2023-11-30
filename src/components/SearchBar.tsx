// SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (address: string) => void;
  isSearching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [address, setAddress] = useState('');

  const handleSearchClick = () => {
    onSearch(address);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        disabled={isSearching} // Disable input while searching
      />
      <button 
        onClick={handleSearchClick} 
        disabled={isSearching} // Disable button while searching
        style={{ opacity: isSearching ? 0.5 : 1 }}
      >
        {isSearching ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;
