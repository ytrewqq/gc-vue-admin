import request from '@/utils/request'

export function getClassificatios(data) {
  return request({
    url: '/classify/querylist',
    method: 'post',
    data: data
  })
}
export function addCalssification(data) {
  return request({
    url: '/classify/save',
    method: 'post',
    data: data
  })
}

export function updateCalssification(data) {
  return request({
    url: '/classify/update',
    method: 'post',
    data: data
  })
}

export function delCalssification(data) {
  return request({
    url: '/classify/remove',
    method: 'post',
    data: data
  })
}
