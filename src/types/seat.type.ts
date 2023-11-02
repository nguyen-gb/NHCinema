export interface Seat {
  _id?: string
  seat_number: string
  status?: number
  seat_type: number | string
}

export enum SeatType {
  single_chair = 0,
  double_chair = 1
}
