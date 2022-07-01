import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { UserAccount } from '@/common/types/UserAccount';
import UserService from '@/services/UserService';
import { Portfolio, PortfolioPosition } from '@/common/types/Portfolio';
import { Instrument } from '@/common/types/Instrument';
import MoneyUtils from '@/common/utils/MoneyUtils';
import { CURRENCY_FIGI_MAP } from '@/common/constants/allInstruments';
import Currency from '@/common/types/Currency';

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
  async getPortfolio() {
    this.portfolio = await UserService.getPortfolioById();
  }

  @Action
  async getAllAssets() {
    if (!this.accountId) {
      return;
    }

    this.isAssetsListLoading = true;

    try {
      const { positions } = await UserService.getPortfolioById(this.accountId);
      this.positions = positions;
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
