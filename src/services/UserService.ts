import axios from 'axios';
import BackendServiceName from '@/common/types/BackendServiceName';
import ApiUtils from '@/common/utils/ApiUtils';
import { UserAccount } from '@/common/types/UserAccount';

export default class UserService {
  static async getUserAccounts(): Promise<UserAccount[]> {
    const { data } = await axios.post<UserAccount[]>(
      ApiUtils.getApiUrl(BackendServiceName.USER_SERVICE, 'GetAccounts'),
    );

    return data;
  }
}
