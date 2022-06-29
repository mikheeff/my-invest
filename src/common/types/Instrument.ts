export enum InstrumentType {
  SHARE = 'share',
  CURRENCY = 'currency',
}

export interface Instrument {
  figi: string;
  ticker: string;
  name: string;
  currency: string;
  countryOfRisk: string;
}
