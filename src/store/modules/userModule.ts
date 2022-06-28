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
  shares: Instrument[];
  etfs: Instrument[];
  bonds: Instrument[];
  currencies: Instrument[];
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

  @Action
  async getAllInstruments() {
    await Promise.all([
      this.getAllShares(),
      this.getAllBonds(),
      this.getAllEtfs(),
      this.getAllCurrencies(),
    ]);
  }

  @Action
  async getAllShares() {
    this.shares = await UserService.getShares();
  }

  @Action
  async getAllEtfs() {
    this.etfs = await UserService.getEtfs();
  }

  @Action
  async getAllBonds() {
    this.bonds = await UserService.getBonds();
  }

  @Action
  async getAllCurrencies() {
    this.currencies = await UserService.getCurrencies();
  }

  get allInstruments() {
    return [...this.shares, ...this.bonds, ...this.etfs, ...this.currencies];
  }
}

const userModule = new UserModule({
  state: {
    accounts: [],
    portfolio: null,
    positions: [],
    instruments: [],
    shares: [],
    bonds: [],
    etfs: [],
    currencies: [],
    isAssetsListLoading: false,
    accountId: null,
  },
  store,
  name: 'user',
});

export default userModule;
