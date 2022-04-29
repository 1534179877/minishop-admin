import { request } from '@/network/index';

export function getswiper() {
  return request({
    method: 'get',
    url: '/home/swiperdata',
  });
}
export function updateswiper(swiper) {
  return request({
    method: 'post',
    url: '/home/updateswiper',
    data: {
      swiper: swiper,
    },
  });
}
export function deleteswiper(id) {
  return request({
    method: 'post',
    url: '/home/deleteswiper',
    data: {
      id,
    },
  });
}

export function getfloor() {
  return request({
    method: 'get',
    url: '/home/floordata',
  });
}
export function updatefloor(target, id) {
  return request({
    method: 'post',
    url: '/home/updatefloor',
    data: {
      id,
      target,
    },
  });
}

export function getgoods() {
  return request({
    method: 'get',
    url: '/categories',
  });
}
export function updategoods(activedata) {
  return request({
    method: 'post',
    url: '/categories/update',
    data: {
      activedata,
    },
  });
}
