// import { ConnectButton } from "@mysten/dapp-kit";
// import { Box, Container, Flex, Heading } from "@radix-ui/themes";
// import { WalletStatus } from "./WalletStatus";
import SearchBar from "./components/SearchBar";
import './styles/App.css';

const App: React.FC = () => {
  const handleSearch = (address: string) => {
    // Implement your search logic here, possibly making an API call
    console.log('Searching for:', address);
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <SearchBar onSearch={handleSearch} />
        </header>
      </div>
    </>
  );
};

export default App;