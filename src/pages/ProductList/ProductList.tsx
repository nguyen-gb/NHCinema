import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'

import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import useQueryConfig, { QueryConfig } from 'src/hooks/useQueryConfig'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Product from 'src/components/Product'
// import Product from './components/Product'
// import Pagination from 'src/components/Pagination'
// import categoryApi from 'src/apis/category.api'
// import AsideFilter from './components/AsideFilter'
// import SortProductList from './components/SortProductList'

export default function ProductList() {
  //const queryConfig: QueryConfig = useQueryConfig()
  const [queryConfig, setQueryConfig] = useState({ category: '60afacca6ef5b902180aacaf' })
  const [isComing, setIsComing] = useState(false)

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    }
    // keepPreviousData: true,
    // staleTime: 3 * 60 * 1000
  })

  const handleClickShowing = () => {
    setIsComing(false)
    setQueryConfig({ category: '60afacca6ef5b902180aacaf' })
  }
  const handleClickComing = () => {
    setIsComing(true)
    setQueryConfig({ category: '60aba4e24efcc70f8892e1c6' })
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>Các bộ phim đang chiếu, sắp chiếu tại NHCinema | NHCinema</title>
        <meta name='description' content='Các bộ phim đang chiếu, sắp chiếu tại NHCinema' />
      </Helmet>
      <div className='container'>
        <div className='my-[40px]'>
          <div className='flex items-center justify-center gap-6 pb-[40px]'>
            <button
              onClick={handleClickShowing}
              className={classNames(
                'relative z-[1] justify-self-center text-[14px] uppercase shadow-ct3d transition-all',
                {
                  'scale-100 bg-primary': !isComing,
                  'scale-90 bg-quaternary': isComing
                }
              )}
            >
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div
                className={classNames(
                  'relative z-[9] flex items-center justify-between bg-primary p-[10px] transition-all',
                  {
                    'bg-primary': !isComing,
                    'bg-quaternary': isComing
                  }
                )}
              >
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
                <div className='mx-[15px] text-[18px] uppercase text-white'>Phim đang chiếu</div>
              </div>
            </button>
            <button
              onClick={handleClickComing}
              className={classNames(
                'relative z-[1] justify-self-center text-[14px] uppercase shadow-ct3d transition-all',
                {
                  'scale-100 bg-primary': isComing,
                  'scale-90 bg-quaternary': !isComing
                }
              )}
            >
              <div className='absolute bottom-0 right-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div className='absolute bottom-0 left-[-15px] top-0 z-[1] w-[30px] skew-x-[-15deg] bg-inherit shadow-ct3d'></div>
              <div
                className={classNames('relative z-[9] flex items-center justify-between p-[10px] transition-all', {
                  'bg-primary': isComing,
                  'bg-quaternary': !isComing
                })}
              >
                <div className='mx-[15px] text-[18px] uppercase text-white'>Phim sắp chiếu</div>
                <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' />
              </div>
            </button>
          </div>
          {productsData && (
            <div className='col-span-10'>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {/* <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
