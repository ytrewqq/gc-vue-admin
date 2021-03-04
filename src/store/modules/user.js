import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, getUserId, setUserId } from '@/utils/auth'
import { resetRouter } from '@/router'
import da from "element-ui/src/locale/lang/da";

const getDefaultState = () => {
  return {
    userToken: getToken(),
    userId: getUserId(),
    userName: getName()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, userToken) => {
    state.userToken = userToken
  },
  SET_NAME: (state, name) => {
    state.userName = name
  },
  SET_ID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.userToken)
        commit('SET_NAME', data.userName)
        commit('SET_ID', data.userId)
        setToken(data.userToken)
        setName(data.userName)
        setUserId(data.userId)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      const tokenParam = { userToken: state.userToken }
      getInfo(tokenParam).then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录！')
        }
        const { userName, userId } = data
        commit('SET_NAME', userName)
        commit('SET_ID', userId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

