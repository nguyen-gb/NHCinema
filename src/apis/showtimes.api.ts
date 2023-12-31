import { Product } from 'src/types/product.type'
import { Showtimes, Times } from 'src/types/showtimes.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/showtime'

const showtimesApi = {
  getShowtimesByDate(params: { theater_id: string; time: string }) {
    return http.get<SuccessResponse<Product[]>>(`${URL}/times`, {
      params: params
    })
  },
  getShowtimesById(id: string) {
    return http.get<SuccessResponse<Showtimes>>(`${URL}/${id}/seats`)
  },
  getShowtimesByMovie(params: { theater_id: string; movie_id: string }) {
    return http.get<SuccessResponse<Times[]>>(`${URL}/time-by-movie`, {
      params: params
    })
  }
}

export default showtimesApi
