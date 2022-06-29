import { Amount } from '@/common/types/Amount';

export interface PortfolioPosition {
  figi: string;
  instrumentType: string;
  quantity: { units: string };
  averagePositionPrice: Amount;
  currentPrice: Amount;
}

export interface Portfolio {
  expectedYield: {
    nano: number;
    units: string;
  },
  positions: PortfolioPosition[];
}
