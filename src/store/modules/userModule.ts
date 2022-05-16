import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { UserAccount } from '@/common/types/UserAccount';
import UserService from '@/services/UserService';
import { Portfolio, PortfolioPosition } from '@/common/types/Portfolio';
import { Instrument } from '@/common/types/Instrument';

interface UserState {
  accounts: UserAccount[];
  portfolio: Portfolio | null;
  positions: PortfolioPosition[];
  instruments: Instrument[];
  isAssetsListLoading: boolean;
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
  async getAllAssets(accountId: string | null) {
    if (!accountId) {
      return;
    }

    this.isAssetsListLoading = true;

    try {
      const { positions } = await UserService.getPortfolioById(accountId);
      this.positions = this.positions.concat(positions);
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
}

const userModule = new UserModule({
  state: {
    accounts: [],
    portfolio: null,
    positions: [],
    instruments: [],
    isAssetsListLoading: false,
  },
  store,
  name: 'user',
});

export default userModule;
