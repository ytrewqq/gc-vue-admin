import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: '/user/personal',
    method: 'post',
    data: data
  })
}

export function changePassword(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data: data
  })
}

export function personalDetail() {
  return request({
    url: '/user/personal-detail',
    method: 'get'
  })

}
