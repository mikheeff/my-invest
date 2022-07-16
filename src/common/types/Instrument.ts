import FocusType from '@/common/types/FocusType';

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
  countriesOfRisk?: string;
  countriesOfRiskName?: string;
  countryOfRiskName: string;
}

export interface EtfInstrument extends Instrument {
  focusType: FocusType;
}
