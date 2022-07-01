import Currency from '@/common/types/Currency';

export interface Amount {
  nano: number;
  units: string;
}

export interface CurrencyAmount extends Amount {
  currency: Currency;
}
