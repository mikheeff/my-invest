import { Price } from '@/common/types/Price';

export interface PortfolioPosition {
  figi: string;
  instrumentType: string;
  quantity: { units: string };
  averagePositionPrice: Price;
  currentPrice: Price;
}

export interface Portfolio {
  expectedYield: {
    nano: number;
    units: string;
  },
  positions: PortfolioPosition[];
}
