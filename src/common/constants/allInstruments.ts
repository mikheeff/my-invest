import shares from '@/data/shares.json';
import { Instrument } from '@/common/types/Instrument';
import bonds from '@/data/bonds.json';
import etfs from '@/data/etfs.json';
import currencies from '@/data/currencies.json';

const sharesList = shares.instruments as Instrument[];
const bondsList = bonds.instruments as Instrument[];
const etfsList = etfs.instruments as Instrument[];
const currenciesList = currencies.instruments as Instrument[];

export const ALL_INSTRUMENTS = [...sharesList, ...bondsList, ...etfsList, ...currenciesList];

export const ALL_SHARES = [...sharesList];
