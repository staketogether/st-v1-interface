interface Contract {
  address: string;
  blockchain: string;
  blockchainId: string;
  decimals: number;
}

export interface MobulaMarketAsset {
  market_cap: number;
  market_cap_diluted: number;
  liquidity: number;
  price: number;
  off_chain_volume: number;
  volume: number;
  volume_change_24h: number;
  volume_7d: number;
  is_listed: boolean;
  price_change_24h: number;
  price_change_1h: number;
  price_change_7d: number;
  price_change_1m: number;
  price_change_1y: number;
  ath: number;
  atl: number;
  name: string;
  symbol: string;
  logo: string;
  rank: number;
  contracts: Contract[];
}

export interface MobulaMarketAssetResponse {
  data: MobulaMarketAsset;
}