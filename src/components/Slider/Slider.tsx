/* eslint-disable import/no-unresolved */
import { Autoplay, Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Product as ProductType } from 'src/types/product.type'
import Product from '../Product'

const breakpoints = {
  '1024': {
    slidesPerView: 4
  },
  '768': {
    slidesPerView: 3
  },
  '540': {
    slidesPerView: 2
  },
  '0': {
    slidesPerView: 1
  }
}

interface Props {
  products: ProductType[]
}

export default function Slider({ products }: Props) {
  return (
    <Swiper
      breakpoints={breakpoints}
      modules={[Autoplay, Navigation, A11y]}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false
      }}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {products &&
        products.map((product, index) => (
          <SwiperSlide key={index}>
            <Product product={product} />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
