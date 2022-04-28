import axios from 'axios';
import { ElMessage } from 'element-plus';

const BaseUrl = 'http://localhost:7001';

const service = axios.create({
  baseURL: BaseUrl,
  timeout: 5000,
});

export function request(config) {
  //拦截
  service.interceptors.request.use(
    (config) => {
      //放行
      return config;
    },
    (error) => {
      ElMessage({
        type: 'error',
        msg: `${error}`,
      });
    }
  );

  service.interceptors.response.use(
    (result) => {
      //放行
      return result;
    },
    (error) => {
      ElMessage({
        type: 'error',
        msg: `${error}`,
      });
    }
  );

  return service(config);
}
