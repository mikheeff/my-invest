import { BackendServiceName } from '@/common/types/BackendServiceName';
import { API_URL } from '@/common/constants/apiConstants';

export default class ApiUtils {
  static getApiUrl(serviceName: BackendServiceName, resourcePath: string) {
    return `${API_URL}${serviceName}/${resourcePath}`;
  }
}
