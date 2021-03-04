import Cookies from 'js-cookie'

const TokenKey = 'user_token'
const userName = 'user_name'
const userId = 'user_Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get(userName)
}

export function setName(name) {
  Cookies.set(userName,name)
}
export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(id) {
  Cookies.set(userId, id)
}
