import shares from '@/data/shares.json';
import { Instrument } from '@/common/types/Instrument';
import bonds from '@/data/bonds.json';
import etfs from '@/data/etfs.json';
import currencies from '@/data/currencies.json';
import Currency from '@/common/types/Currency';

const sharesList = shares.instruments as Instrument[];
const bondsList = bonds.instruments as Instrument[];
const etfsList = etfs.instruments as Instrument[];
const currenciesList = currencies.instruments as Instrument[];

export const ALL_INSTRUMENTS = [...sharesList, ...bondsList, ...etfsList, ...currenciesList];

export const ALL_SHARES = [...sharesList];

export const USD_FIGI = 'BBG0013HGFT4';

export const CURRENCY_FIGI_MAP = {
  [Currency.USD]: 'BBG0013HGFT4',
  [Currency.EUR]: 'BBG0013HJJ31',
  [Currency.RUB]: 'RUB000UTSTOM',
};
