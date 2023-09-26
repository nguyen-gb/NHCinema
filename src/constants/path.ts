const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  productDetail: '/movie/:nameId',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart'
} as const

export default path
