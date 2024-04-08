// type Role = 'User' | 'Admin'

import { Combo } from 'src/types/combo.type'
import { Seat } from 'src/types/seat.type'

export interface User {
  _id: string
  name: string
  phone: string
  email: string
  date_of_birth?: string
  gender?: string
}

export interface BonusPointsRes {
  _id: string
  user_id: string
  rating_point: number
  consumption_point: number
  level: number
  is_gift: number
  point_history: PointHistory[]
}

export interface PointHistory {
  _id: string
  name: string
  seats: Seat[]
  combos: Combo[]
  used_point: number
  day_trading: string
}

export interface Review {
  booking_id: string
  movie_id: string
  rating: number
  review: string
}

export interface UserReview {
  user_id: string
  rating: number
  review: string
  user_name: string
}
