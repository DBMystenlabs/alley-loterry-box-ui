
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (address: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [address, setAddress] = useState('');

    const handleSearch = () => {
        onSearch(address);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Wallet Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;

