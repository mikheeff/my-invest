export interface Portfolio {
  expectedYield: {
    nano: number;
    units: string;
  },
  positions: {
    figi: string;
    instrumentType: string;
  }[];
}
