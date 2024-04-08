import { Product, ProductListConfig } from 'src/types/product.type'
import { UserReview } from 'src/types/user.type'
import { Params, ReviewSuccessResponse, SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'unauth/movie'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<Product[]>>(URL, {
      params: params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  getProductReview(id: string, params: Params) {
    return http.get<ReviewSuccessResponse<UserReview[]>>(`auth/review/${id}/movie`, {
      params: params
    })
  }
}

export default productApi
