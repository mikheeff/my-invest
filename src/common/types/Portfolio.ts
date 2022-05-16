export interface PortfolioPosition {
  figi: string;
  instrumentType: string;
}

export interface Portfolio {
  expectedYield: {
    nano: number;
    units: string;
  },
  positions: PortfolioPosition[];
}
