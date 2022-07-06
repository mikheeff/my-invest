import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { UserAccount } from '@/common/types/UserAccount';
import UserService from '@/services/UserService';
import { Portfolio, PortfolioPosition } from '@/common/types/Portfolio';
import { Instrument, InstrumentType } from '@/common/types/Instrument';
import MoneyUtils from '@/common/utils/MoneyUtils';
import {
  ALL_ETFS,
  CURRENCY_FIGI_MAP,
  FOCUS_TYPE_INSTRUMENT_TYPE_MAP,
} from '@/common/constants/allInstruments';
import Currency from '@/common/types/Currency';
import FocusType from '@/common/types/FocusType';

interface UserState {
  accounts: UserAccount[];
  portfolio: Portfolio | null;
  positions: PortfolioPosition[];
  instruments: Instrument[];
  isAssetsListLoading: boolean;
  accountId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserModule extends UserState {}

@Module({ generateMutationSetters: true })
class UserModule extends ExtendedVuexModule<UserState> {
  @Action
  async getAccounts() {
    this.accounts = await UserService.getUserAccounts();
  }

  @Action
  async getAllAssets() {
    if (!this.accountId) {
      return;
    }

    this.isAssetsListLoading = true;

    try {
      const portfolio = await UserService.getPortfolioById(this.accountId);
      this.portfolio = portfolio;
      this.positions = portfolio.positions;
    } finally {
      this.isAssetsListLoading = false;
    }
  }

  @Action
  async getAssetsFullInfo() {
    await Promise.all(this.positions.map(async (position) => {
      const instrument = await UserService.getInstrumentById(position.figi);
      this.instruments = this.instruments.concat(instrument);
    }));
  }

  get sharesAmount(): number {
    return this.getTotalAmountByInstrumentType(InstrumentType.SHARE);
  }

  get particularSharesAmount(): number {
    if (!this.portfolio) {
      return 0;
    }

    return MoneyUtils.getNumberFromAmount(this.portfolio.totalAmountShares) / this.usdPriceInRub;
  }

  get sharesPositions(): PortfolioPosition[] {
    return this.positions.filter((pos) => pos.instrumentType === InstrumentType.SHARE);
  }

  get sharesEtfsAmount(): number {
    const sharesEtfs = this.getEtfsPositionsByInstrumentType(InstrumentType.SHARE);

    return this.getPositionsTotalAmount(sharesEtfs);
  }

  get bondsAmount(): number {
    return this.getTotalAmountByInstrumentType(InstrumentType.BONDS);
  }

  get currenciesAmount(): number {
    return this.getTotalAmountByInstrumentType(InstrumentType.CURRENCY);
  }

  get goldAmount(): number {
    const goldPosition = this.positions
      .find((pos) => pos.figi === CURRENCY_FIGI_MAP[Currency.GOLD]);

    const etfPositions = this.positions
      .filter((position) => {
        const etfInstrument = ALL_ETFS.find((i) => i.figi === position.figi);
        const isSameAssetClass = etfInstrument
          ? etfInstrument.focusType === FocusType.GOLD
          : false;

        return position.instrumentType === InstrumentType.ETF && isSameAssetClass;
      });
    const positions = goldPosition ? [goldPosition, ...etfPositions] : [...etfPositions];

    return this.getPositionsTotalAmount(positions);
  }

  get totalAmount(): number {
    if (!this.portfolio) {
      return 0;
    }

    const {
      totalAmountBonds,
      totalAmountCurrencies,
      totalAmountShares,
      totalAmountEtf,
    } = this.portfolio;

    const amounts = [totalAmountShares, totalAmountEtf, totalAmountBonds, totalAmountCurrencies];

    return amounts.reduce((acc, amount) => acc + MoneyUtils
      .getNumberFromAmount(amount), 0) / this.usdPriceInRub;
  }

  getTotalAmountByInstrumentType(instrumentType: InstrumentType) {
    const positionsByInstrumentType = this.positions
      .filter((position) => position.instrumentType === instrumentType);

    const etfPositions = this.getEtfsPositionsByInstrumentType(instrumentType);

    const positions = [...positionsByInstrumentType, ...etfPositions];

    return this.getPositionsTotalAmount(positions);
  }

  getEtfsPositionsByInstrumentType(instrumentType: InstrumentType) {
    return this.positions
      .filter((position) => {
        const etfInstrument = ALL_ETFS.find((i) => i.figi === position.figi);
        const isSameAssetClass = etfInstrument
          ? FOCUS_TYPE_INSTRUMENT_TYPE_MAP[etfInstrument.focusType] === instrumentType
          : false;

        return position.instrumentType === InstrumentType.ETF && isSameAssetClass;
      });
  }

  getPositionsTotalAmount(positions: PortfolioPosition[]): number {
    return positions.reduce((acc, position) => {
      const positionAmountInUsd = this.getPositionAmountInUsd(position);

      return acc + positionAmountInUsd;
    }, 0);
  }

  getPositionAmountInUsd(position: PortfolioPosition): number {
    const positionTotalAmount = MoneyUtils.getPositionTotalAmount(position);
    const rate = this.getCurrencyRateToUsd(position.currentPrice.currency);
    return positionTotalAmount / rate;
  }

  getCurrencyRateToUsd(currency: Currency) {
    if (currency === Currency.USD) {
      return 1;
    }

    if (currency === Currency.RUB) {
      return this.usdPriceInRub;
    }

    const currencyPosition = this.positions
      .find((pos) => pos.figi === CURRENCY_FIGI_MAP[currency]);

    if (!currencyPosition) {
      throw new Error('no such currency');
    }

    const currencyPriceInRub = MoneyUtils.getNumberFromAmount(currencyPosition.currentPrice);

    return currencyPriceInRub / this.usdPriceInRub;
  }

  get usdPriceInRub() {
    const usdPosition = this.positions
      .find((pos) => pos.figi === CURRENCY_FIGI_MAP[Currency.USD]);

    if (!usdPosition) {
      return 0;
    }

    return MoneyUtils.getNumberFromAmount(usdPosition.currentPrice);
  }
}

const userModule = new UserModule({
  state: {
    accounts: [],
    portfolio: null,
    positions: [],
    instruments: [],
    isAssetsListLoading: false,
    accountId: null,
  },
  store,
  name: 'user',
});

export default userModule;
