import axios from 'axios';
import BackendServiceName from '@/common/types/BackendServiceName';
import ApiUtils from '@/common/utils/ApiUtils';
import { UserAccount } from '@/common/types/UserAccount';
import { Portfolio } from '@/common/types/Portfolio';
import { Instrument } from '@/common/types/Instrument';

export default class UserService {
  static async getUserAccounts(): Promise<UserAccount[]> {
    const { data: { accounts } } = await axios.post<{ accounts: UserAccount[] }>(
      ApiUtils.getApiUrl(BackendServiceName.USERS_SERVICE, 'GetAccounts'),
      {}, {
        headers: { 'content-type': 'application/json' },
      },
    );

    return accounts;
  }

  static async getPortfolioById(accountId = '2053831562'): Promise<Portfolio> {
    const { data } = await axios.post<Portfolio>(
      ApiUtils.getApiUrl(BackendServiceName.OPERATIONS_SERVICE, 'GetPortfolio'),
      { accountId },
    );

    return data;
  }

  static async getInstrumentById(figi: string): Promise<Instrument> {
    const { data: { instrument } } = await axios.post<{ instrument: Instrument }>(
      ApiUtils.getApiUrl(BackendServiceName.INSTRUMENTS_SERVICE, 'GetInstrumentBy'),
      { id: figi, id_type: 'INSTRUMENT_ID_TYPE_FIGI' },
    );

    return instrument;
  }
}
