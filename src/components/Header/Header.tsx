import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import NavHeader from '../NavHeader'
import { Purchase } from 'src/types/purchase.type'

export default function Header() {
  const { isAuthenticated } = useContext(AppContext)

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesIncart = purchasesInCartData?.data.data

  return (
    <div className='bg-quaternary py-4 text-white'>
      <div className='container'>
        <NavHeader />
        <div className='my-4 h-[2px] w-full bg-gradient-to-r from-primary to-tertiary'></div>
        <div className='grid grid-cols-11 items-center'>
          <div className='col-span-10 flex justify-center'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              Trang chủ
            </NavLink>
            <NavLink
              to='/movie'
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              Phim
            </NavLink>
            <NavLink
              to='/show-times'
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              Lịch chiếu
            </NavLink>
            <NavLink
              to='/ticket-prices'
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              Giá vé
            </NavLink>
            <NavLink
              to='/member'
              className={({ isActive }) =>
                classNames(
                  'relative justify-self-center p-[10px] text-[14px] uppercase transition-colors hover:bg-primary',
                  {
                    'bg-primary': isActive
                  }
                )
              }
            >
              <div className='absolute bottom-0 right-[-5px] top-0 w-[11px] skew-x-[-15deg] bg-inherit'></div>
              Thành viên
            </NavLink>
          </div>
          <div className='col-span-1 justify-self-center'>
            <Popover
              renderPopover={
                <div className='max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                  {purchasesIncart && (purchasesIncart as Purchase[]).length > 0 ? (
                    <div>
                      <div className='border-b-[1px] border-quaternary/20 p-2 capitalize text-quaternary'>
                        Thông báo
                      </div>
                      <div className='max-h-[500px] overflow-y-auto'>
                        {purchasesIncart.map((purchase) => (
                          <Link
                            to={path.home}
                            className='group block border-b-[1px] border-quaternary/20 p-2 text-[12px] text-quaternary'
                            key={purchase._id}
                          >
                            <b className='transition-all group-hover:text-primary'>
                              🦀 Nhà Bà Nữ - Bánh canh cua đủ vị
                            </b>
                            <p className='line-clamp-2'>
                              Đến Touch Cinema ”book” ngay món bánh canh cua Nhà Bà Nữ. Đồng cảm với những hoài bão,
                              khát vọng và cả sự nông nổi của tuổi trẻ… 🥰
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className='z-10 flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <div className='mt-3 capitalize text-quaternary'>Không có thông báo</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to={path.cart} className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-8 w-8 text-primary'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                  />
                </svg>

                {purchasesIncart && purchasesIncart.length > 0 && (
                  <span className='absolute right-[-9px] top-[-5px] rounded-full bg-white px-[9px] py-[1px] text-xs text-primary'>
                    {purchasesIncart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
