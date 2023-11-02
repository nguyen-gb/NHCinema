const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  historyPoint: '/user/bonus-points',
  login: '/login',
  register: '/register',
  forgotPass: 'password/reset',
  logout: '/logout',
  movie: '/movie',
  showtimes: '/show-times',
  fare: '/fare',
  member: '/member',
  movieDetail: '/movie/:movieId',
  bookTickets: '/book-tickets/:showtimeId',
  payment: '/payment/:bookingId'
} as const

export default path
