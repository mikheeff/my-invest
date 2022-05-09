import axios from 'axios';
import BackendServiceName from '@/common/types/BackendServiceName';
import ApiUtils from '@/common/utils/ApiUtils';
import { UserAccount } from '@/common/types/UserAccount';
import { Portfolio } from '@/common/types/Portfolio';

export default class UserService {
  static async getUserAccounts(): Promise<UserAccount[]> {
    const { data } = await axios.post<UserAccount[]>(
      ApiUtils.getApiUrl(BackendServiceName.USERS_SERVICE, 'GetAccounts'),
      {}, {
        headers: { 'content-type': 'application/json' },
      },
    );

    return data;
  }

  static async getPortfolioById(accountId = '2053831562'): Promise<Portfolio> {
    const { data } = await axios.post<Portfolio>(
      ApiUtils.getApiUrl(BackendServiceName.OPERATIONS_SERVICE, 'GetPortfolio'),
      { accountId },
    );

    return data;
  }
}
