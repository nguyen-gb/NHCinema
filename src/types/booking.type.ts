import { Combo } from './combo.type'
import { Seat } from './seat.type'

export interface Booking {
  theater_name: string
  room_id: string
  movie_id: string
  time: string
  showtime: string
  seats: Seat[]
  combos: { combo_id: string; combo_type: number; quantity: number }[]
}

export interface BookingDetail {
  _id: string
  code: string
  theater_name: string
  user_id: string
  user_name: string
  movie_id: string
  movie_name: string
  format: string
  room_id: string
  room_number: string
  seats: Seat[]
  time: string
  showtime: string
  payment_method: number
  payment_status: number
  total_amount: number
  expireAt: string
  combos: Combo[]
  exchange_point: number
  movie_poster: string
}

export interface UsePoint {
  booking_id: string
  seats: {
    seat_number: string
  }[]
  combos: {
    combo_id: string
    quantity: number
  }[]
}
