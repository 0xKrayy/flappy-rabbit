import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { NetworkConfig as NetworkConfigType } from '../types';

interface NetworkConfigProps {
  onSave: (config: NetworkConfigType) => void;
}

const NetworkConfig: React.FC<NetworkConfigProps> = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<NetworkConfigType>({
    rpcUrl: 'https://carrot.megaeth.com/rpc',
    chainId: '6342',
    networkName: 'MegaETH Testnet',
    currencySymbol: 'ETH'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Network Settings"
      >
        <Settings size={24} />
      </button>
    );
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Network Configuration</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RPC URL
            </label>
            <input
              type="text"
              value={config.rpcUrl}
              onChange={(e) => setConfig({ ...config, rpcUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="https://..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chain ID
            </label>
            <input
              type="text"
              value={config.chainId}
              onChange={(e) => setConfig({ ...config, chainId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="0x..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Network Name
            </label>
            <input
              type="text"
              value={config.networkName}
              onChange={(e) => setConfig({ ...config, networkName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="MegaETH Testnet"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency Symbol
            </label>
            <input
              type="text"
              value={config.currencySymbol}
              onChange={(e) => setConfig({ ...config, currencySymbol: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="METH"
              required
            />
          </div>
          
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NetworkConfig;