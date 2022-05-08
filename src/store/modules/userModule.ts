import { Action, Module } from 'vuex-class-modules';
import store from '@/store';
import ExtendedVuexModule from '@/store/ExtendedVuexModule';
import { UserAccount } from '@/common/types/UserAccount';
import UserService from '@/services/UserService';

interface UserState {
  accounts: UserAccount[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserModule extends UserState {}

@Module({ generateMutationSetters: true })
class UserModule extends ExtendedVuexModule<UserState> {
  @Action
  async getAccounts() {
    this.accounts = await UserService.getUserAccounts();
  }
}

const userModule = new UserModule({
  state: {
    accounts: [],
  },
  store,
  name: 'user',
});

export default userModule;
