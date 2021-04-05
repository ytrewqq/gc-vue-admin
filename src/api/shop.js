import request from '@/utils/request'

export function getShops(data) {
  return request({
    url: '/shop/querylist',
    method: 'post',
    data: data
  })
}
export function addShop(data) {
  return request({
    url: '/shop/save',
    method: 'post',
    data: data
  })
}

export function updateShop(data) {
  return request({
    url: '/shop/update',
    method: 'post',
    data: data
  })
}

export function delShop(data) {
  return request({
    url: '/shop/remove',
    method: 'post',
    data: data
  })
}
