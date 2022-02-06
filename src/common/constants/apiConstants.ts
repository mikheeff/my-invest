import BackendServiceName from '@/common/types/BackendServiceName';

export const API_URL = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.';

export const BACKEND_SERVICE_ROUTE_MAP: Record<BackendServiceName, string> = {
  [BackendServiceName.USER_SERVICE]: 'UserService',
};
