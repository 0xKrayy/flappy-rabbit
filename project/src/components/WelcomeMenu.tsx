import React, { useState } from 'react';
import { Rabbit } from 'lucide-react';
import NetworkConfig from './NetworkConfig';
import { NetworkConfig as NetworkConfigType } from '../types';
import { setupNetwork } from '../utils/wallet';

interface WelcomeMenuProps {
  onStartGame: () => void;
  onConnectWallet: () => void;
  walletAddress: string;
}

const WelcomeMenu: React.FC<WelcomeMenuProps> = ({ 
  onStartGame, 
  onConnectWallet,
  walletAddress
}) => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  
  const handleNetworkConfig = async (config: NetworkConfigType) => {
    const result = await setupNetwork(config);
    if (!result.success && result.error) {
      setNetworkError(result.error);
      setTimeout(() => setNetworkError(null), 5000);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
        <NetworkConfig onSave={handleNetworkConfig} />
        
        <div className="flex justify-center mb-4">
          <Rabbit size={64} className="text-black" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Flappy Rabbit</h1>
        <p className="text-gray-600 mb-8">on MegaETH Testnet</p>
        
        {networkError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {networkError}
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={onStartGame}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Start Game
          </button>
          
          <button 
            onClick={onConnectWallet}
            className="w-full py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
          </button>
          
          <button 
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full py-3 bg-gray-100 text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showInstructions ? 'Hide Instructions' : 'How to Play'}
          </button>
        </div>
        
        {showInstructions && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
            <h3 className="font-bold mb-2">How to Play:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Click or tap to make the rabbit jump</li>
              <li>Avoid the pipes to stay alive</li>
              <li>Each pipe passed earns 1 point and triggers a blockchain transaction</li>
              <li>Connect your wallet to track your transactions on MegaETH</li>
            </ul>
          </div>
        )}
        
        {walletAddress && (
          <div className="mt-4 text-sm text-gray-600">
            <p className="truncate">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeMenu;