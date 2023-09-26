/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { Autoplay, Scrollbar, A11y, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import Slider from 'src/components/Slider'
// import Product from './components/Product'
// import Pagination from 'src/components/Pagination'
// import categoryApi from 'src/apis/category.api'
// import AsideFilter from './components/AsideFilter'
// import SortProductList from './components/SortProductList'

export default function Home() {
  const queryConfig: QueryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })

  // const { data: categoriesData } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => {
  //     return categoryApi.getCategories()
  //   }
  // })

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>Trang chủ | NHCinema</title>
        <meta name='description' content='Trang chủ của dự án NHCinema' />
      </Helmet>
      <div className='mb-[40px]'>
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Scrollbar, Pagination, A11y]}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false
          }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {productsData &&
            productsData.data.data.products.splice(0, 5).map((_, index) => (
              <SwiperSlide key={index}>
                <div className='w-full'>
                  <img
                    className='h-full w-full object-cover'
                    src='https://touchcinema.com/storage/slider-app/1920x1080-1694062369.jpg'
                    alt=''
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='container'>
        <div className='mb-[40px]'>
          <div className='flex items-center justify-center pb-[40px]'>
            <div className='relative z-[1] justify-self-center bg-primary text-[14px] uppercase shadow-ct3d transition-colors'>
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='relative z-[9] flex items-center justify-between bg-primary p-[10px]'>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
                <div className='mx-[15px] text-[18px] uppercase text-white'>Phim đang chiếu</div>
              </div>
            </div>
          </div>
          {productsData && <Slider products={productsData.data.data.products} />}
        </div>
        <div className='mb-[40px]'>
          <div className='flex items-center justify-center pb-[40px]'>
            <div className='relative z-[1] justify-self-center bg-primary text-[14px] uppercase shadow-ct3d transition-colors'>
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[15deg] bg-inherit shadow-ct3d'></div>
              <div className='relative z-[9] flex items-center justify-between bg-primary p-[10px]'>
                <div className='mx-[15px] text-[18px] uppercase text-white'>Phim sắp chiếu</div>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
              </div>
            </div>
          </div>
          {productsData && <Slider products={productsData.data.data.products} />}
        </div>
      </div>
    </div>
  )
}
