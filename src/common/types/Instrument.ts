export enum InstrumentType {
  SHARE = 'share',
  CURRENCY = 'currency',
  ETF = 'etf',
  BONDS = 'bond',
}

export interface Instrument {
  figi: string;
  ticker: string;
  name: string;
  currency: string;
  countryOfRisk: string;
}
