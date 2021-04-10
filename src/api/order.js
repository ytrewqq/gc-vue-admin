import request from '@/utils/request'

export function getOrders(data) {
  return request({
    url: '/order/query',
    method: 'post',
    data: data
  })
}

export function updateOrder(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data: data
  })
}
