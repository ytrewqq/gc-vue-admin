import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters: {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    avatar: state => state.settings.avatar,
    userToken: state => state.user.userToken,
    userId: state => state.user.userId,
    userName: state => state.user.userName
  }
})

export default store
