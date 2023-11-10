const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  historyPoint: '/user/bonus-points',
  login: '/login',
  register: '/register',
  verify: '/verify/:userId',
  forgotPass: '/password/reset',
  logout: '/logout',
  movie: '/movie',
  showtimes: '/show-times',
  fare: '/fare',
  member: '/member',
  movieDetail: '/movie/:movieId',
  bookTickets: '/book-tickets/:showtimeId',
  payment: '/payment/:bookingId',
  paymentDetail: '/payment-detail'
} as const

export default path
