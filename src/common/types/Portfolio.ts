export interface PortfolioPosition {
  figi: string;
  instrumentType: string;
  quantity: { units: string }
}

export interface Portfolio {
  expectedYield: {
    nano: number;
    units: string;
  },
  positions: PortfolioPosition[];
}
