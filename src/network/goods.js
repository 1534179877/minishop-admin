import { request } from '@/network/index';

//获取所有的swiper
export function getswiper() {
  return request({
    method: 'get',
    url: '/home/swiperdata',
  });
}
//跟新swiper
export function updateswiper(swiper) {
  return request({
    method: 'post',
    url: '/home/updateswiper',
    data: {
      swiper: swiper,
    },
  });
}
// 删除swiper
export function deleteswiper(id) {
  return request({
    method: 'post',
    url: '/home/deleteswiper',
    data: {
      id,
    },
  });
}
//  获取楼层
export function getfloor() {
  return request({
    method: 'get',
    url: '/home/floordata',
  });
}
//修改该楼层  target: 目标商品   id 楼层id
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
//删除楼层
export function deletefloor(target, id) {
  return request({
    method: 'post',
    url: '/home/deletefloor',
    data: {
      id,
      target,
    },
  });
}
//获取菜单
export function getgoods() {
  return request({
    method: 'get',
    url: '/categories',
  });
}
//更新  acticedata 更新的信息
export function updategoods(activedata) {
  return request({
    method: 'post',
    url: '/categories/update',
    data: {
      activedata,
    },
  });
}
// 删除 cat中的某一个 一级二级三级都可以
export function deletegoods(scope) {
  return request({
    method: 'post',
    url: '/categories/delete',
    data: {
      scope,
    },
  });
}
export function getitem() {
  return request({
    method: 'get',
    url: '/goods/getgoods',
  });
}

export function updateitem(activedata) {
  return request({
    method: 'post',
    url: '/goods/updateitem',
    data: {
      activedata,
    },
  });
}

export function getorder() {
  return request({
    method: 'get',
    url: '/goods/getorder',
  });
}

export function updateorder(activedata) {
  return request({
    method: 'post',
    url: '/goods/updateorder',
    data: {
      activedata,
    },
  });
}
