import request from '@/utils/request'

export function getComments(data) {
  return request({
    url: '/comment/all',
    method: 'post',
    data: data
  })
}

export function delComment(data) {
  return request({
    url: '/comment/del',
    method: 'post',
    data: data
  })
}
