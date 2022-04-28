import { request } from '@/network/index';

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

export function getusers() {
  return request({
    method: 'get',
    url: '/user/getuser',
  });
}
