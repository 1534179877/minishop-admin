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

export function updatefloor(swiper) {
  return request({
    method: 'post',
    url: '/home/updatefloor',
    data: {
      swiper: swiper,
    },
  });
}

export function getfloor() {
  return request({
    method: 'get',
    url: '/home/floordata',
  });
}
