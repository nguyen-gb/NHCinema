import { Booking, BookingDetail, UsePoint } from './../types/booking.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'auth/booking'

const bookingApi = {
  createBooking(body: Booking) {
    return http.post<SuccessResponse<BookingDetail>>(URL, body)
  },
  getBookingDetail(id: string) {
    return http.get<SuccessResponse<BookingDetail>>(`${URL}/${id}`)
  },
  usePoint(body: UsePoint) {
    return http.post<SuccessResponse<BookingDetail>>(`${URL}/use-point`, body)
  }
}

export default bookingApi
