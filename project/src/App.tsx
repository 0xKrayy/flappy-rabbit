import React, { useState, useEffect } from 'react';
import WelcomeMenu from './components/WelcomeMenu';
import Game from './components/Game';
import { connectWallet } from './utils/wallet';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  const handleStartGame = () => {
    setGameStarted(true);
  };
  
  const handleExitGame = () => {
    setGameStarted(false);
  };
  
  const handleConnectWallet = async () => {
    const { address, success } = await connectWallet();
    if (success) {
      setWalletAddress(address);
    }
  };
  
  // Check if wallet was previously connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Error checking wallet connection', error);
        }
      }
    };
    
    checkWalletConnection();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {gameStarted ? (
        <Game 
          onExit={handleExitGame} 
          walletAddress={walletAddress}
        />
      ) : (
        <WelcomeMenu 
          onStartGame={handleStartGame} 
          onConnectWallet={handleConnectWallet}
          walletAddress={walletAddress}
        />
      )}
    </div>
  );
}

export default App;