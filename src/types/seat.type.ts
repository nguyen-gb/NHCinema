export interface Seat {
  _id?: string
  seat_number: string | number
  seat_type: number | string
  status?: number | string
  price?: number
}

export enum SeatType {
  single_seat = 0,
  double_seat = 1
}

export enum SeatExchangePoint {
  single_seat = 1000,
  double_seat = 2000
}
