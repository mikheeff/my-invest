import shares from '@/data/shares.json';
import { EtfInstrument, Instrument, InstrumentType } from '@/common/types/Instrument';
import bonds from '@/data/bonds.json';
import etfs from '@/data/etfs.json';
import currencies from '@/data/currencies.json';
import Currency from '@/common/types/Currency';
import FocusType from '@/common/types/FocusType';
import Country from '@/common/types/Country';
import Region from '@/common/types/Region';

const sharesList = shares.instruments as Instrument[];
const bondsList = bonds.instruments as Instrument[];
const etfsList = etfs.instruments as EtfInstrument[];
const currenciesList = currencies.instruments as Instrument[];

export const ALL_INSTRUMENTS = [...sharesList, ...bondsList, ...etfsList, ...currenciesList];

export const ALL_SHARES = [...sharesList];

export const ALL_ETFS = [...etfsList];

export const USD_FIGI = 'BBG0013HGFT4';

export const CURRENCY_FIGI_MAP = {
  [Currency.USD]: 'BBG0013HGFT4',
  [Currency.EUR]: 'BBG0013HJJ31',
  [Currency.RUB]: 'RUB000UTSTOM',
  [Currency.GOLD]: 'BBG000VJ5YR4',
};

export const COUNTRY_REGION_MAP: Record<Country, Region> = {
  [Country.DE]: Region.EUROPE,
  [Country.US]: Region.US,
  [Country.RU]: Region.RU,
  [Country.CN]: Region.ASIA,
  [Country.KZ]: Region.ASIA,
};

export const FOCUS_TYPE_INSTRUMENT_TYPE_MAP: Partial<Record<FocusType, InstrumentType>> = {
  [FocusType.EQUITY]: InstrumentType.SHARE,
  [FocusType.FIXED_INCOME]: InstrumentType.BONDS,
  // [FocusType.GOLD]: InstrumentType.CURRENCY,
};
