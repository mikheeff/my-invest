import BackendServiceName from '@/common/types/BackendServiceName';
import { API_URL, BACKEND_SERVICE_ROUTE_MAP } from '@/common/constants/apiConstants';

export default class ApiUtils {
  static getApiUrl(serviceName: BackendServiceName, resourcePath: string): string {
    return `${API_URL}${BACKEND_SERVICE_ROUTE_MAP[serviceName]}/${resourcePath}`;
  }
}
