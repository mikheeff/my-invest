import AccountAccessLevel from '@/common/types/AccountAccessLevel';

export interface UserAccount {
  id: string;
  type: string;
  name: string;
  status: string;
  openedDate: string;
  closedDate: string;
  accessLevel: AccountAccessLevel;
}
