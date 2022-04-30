import { request } from '@/network/index';
//登录
export function login(userName, password) {
  return request({
    method: 'post',
    url: '/user/login',
    data: {
      userName,
      password,
    },
  });
}
//获取所以用户信息
export function getusers() {
  return request({
    method: 'get',
    url: '/user/getuser',
  });
}
