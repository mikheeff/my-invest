import AccountAccessLevel from '@/common/types/AccountAccessLevel';

export interface Account {
  id: string;
  type: string;
  name: string;
  status: string;
  openedDate: string;
  closedDate: string;
  accessLevel: AccountAccessLevel;
}
