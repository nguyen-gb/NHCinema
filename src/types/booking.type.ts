import { Seat } from './seat.type'

export interface Booking {
  theater_name: string
  room_id: string
  movie_id: string
  seats: Seat[]
  time: string
  showtime: string
}

export interface BookingDetail {
  _id: string
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
}
