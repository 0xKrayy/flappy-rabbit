export interface Rabbit {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
}

export interface Pipe {
  x: number;
  gapStart: number;
  passed: boolean;
}

export interface GameState {
  rabbit: Rabbit;
  pipes: Pipe[];
  frameCount: number;
  lastPipeFrame: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string;
}

export interface NetworkConfig {
  rpcUrl: string;
  chainId: string;
  networkName: string;
  currencySymbol: string;
}