const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  avatar: state => state.settings.avatar,
  userToken: state => state.user.userToken,
  userId: state => state.user.userId,
  userName: state => state.user.userName
}
export default getters
