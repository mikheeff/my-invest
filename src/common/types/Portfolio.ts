import { Amount, CurrencyAmount } from '@/common/types/CurrencyAmount';

export interface PortfolioPosition {
  figi: string;
  instrumentType: string;
  quantity: Amount;
  averagePositionPrice: CurrencyAmount;
  currentPrice: CurrencyAmount;
}

export interface Portfolio {
  expectedYield: Amount,
  positions: PortfolioPosition[];
}
