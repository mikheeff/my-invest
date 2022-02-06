import axios from 'axios';
import BackendServiceName from '@/common/types/BackendServiceName';

export default class UserService {
  static async getUserAccounts(): Promise<Account[]> {
    const { data } = await axios.post<Account[]>(BackendServiceName.USER_SERVICE, 'GetAccounts');

    return data;
  }
}
