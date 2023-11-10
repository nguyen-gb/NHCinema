import { ConfirmPaymentRes } from 'src/types/payment.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

export const USER_API = 'auth/user'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile(id: string) {
    return http.get<SuccessResponse<User>>(`${USER_API}/${id}`)
  },
  updateProfile(body: User) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  getHistoryBooking(id: string) {
    return http.get<SuccessResponse<ConfirmPaymentRes[]>>(`auth/booking/${id}/user`)
  }
}

export default userApi
