import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { UserAccount } from '@/common/types/UserAccount';
import UserService from '@/services/UserService';
import { Portfolio } from '@/common/types/Portfolio';

interface UserState {
  accounts: UserAccount[];
  portfolio: Portfolio | null;
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
}

const userModule = new UserModule({
  state: {
    accounts: [],
    portfolio: null,
  },
  store,
  name: 'user',
});

export default userModule;
