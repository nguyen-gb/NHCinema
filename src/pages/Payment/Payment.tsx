import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function Payment() {
  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>Đặt vé | NHCinema</title>
        <meta name='description' content='Nơi đặt vé xem phim tại rạp NHCinema' />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='flex flex-wrap gap-5 xl:flex-nowrap'>
            <div className='w-full xl:w-2/3'>
              <div className='space-y-6 rounded-2xl bg-[#1A1D23] p-4 text-sm md:p-6 md:text-base'>
                <h4 className='font-bold'>Thông tin phim</h4>
                <div>
                  <p>Phim</p>
                  <p className='font-semibold text-primary'>
                    SHIN - CẬU BÉ BÚT CHÌ: ĐẠI CHIẾN SIÊU NĂNG LỰC ~SUSHI BAY~ (LỒNG TIẾNG)
                  </p>
                </div>
                <div className='flex items-center gap-10'>
                  <div className='w-1/2'>
                    <p>Ngày giờ chiếu</p>
                    <div className='flex items-center space-x-2 text-primary'>
                      <span className='font-bold'>22:25</span>
                      <span>-</span>
                      <span className='font-semibold'> 20/09/2023</span>
                    </div>
                  </div>
                  <div>
                    <p>Ghế</p>
                    <p className='font-semibold text-primary'>I10, I9</p>
                  </div>
                </div>
                <div className='flex items-center gap-10'>
                  <div className='w-1/2'>
                    <p>Định dạng</p>
                    <p className='font-semibold text-primary'>2D</p>
                  </div>
                  <div>
                    <p>Phòng chiếu</p>
                    <p className='font-semibold text-primary'>2</p>
                  </div>
                </div>
              </div>
              <div className='mt-5 space-y-6 rounded-2xl bg-[#1A1D23] p-4 text-sm md:p-6 md:text-base'>
                <h4 className='font-bold'>Thông tin thanh toán</h4>
                <div>
                  <div className='mt-4 rounded-xl ring-1 ring-gray-700 sm:mx-0'>
                    <table className='min-w-full divide-y divide-gray-600'>
                      <thead>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            Danh mục
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            Số lượng
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            Tổng tiền
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='font-medium text-white'>Ghế (I10, I9)</div>
                          </td>
                          <td className='px-3 py-3.5 text-sm'>2</td>
                          <td className='px-3 py-3.5 text-sm'>180.000đ</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flex-1 text-sm md:text-base xl:w-1/3'>
              <div className='h-full space-y-5 rounded-2xl bg-[#1A1D23] p-4 md:p-6'>
                <h4 className='font-bold'>Phương thức thanh toán</h4>
                <div id='headlessui-radiogroup-:ra:' role='radiogroup'>
                  <div className='space-y-2' role='none'>
                    <div
                      className='relative block cursor-pointer rounded-xl border border-gray-700 bg-transparent px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                      id='headlessui-radiogroup-option-:rb:'
                      role='radio'
                      aria-checked='true'
                      data-headlessui-state='checked'
                      aria-labelledby='headlessui-label-:rc:'
                    >
                      <span className='flex items-center'>
                        <span
                          className='mr-4 flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-transparent'
                          aria-hidden='true'
                        >
                          <span className='flex h-4 w-4 items-center justify-center rounded-full border-primary bg-primary'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='lucide lucide-check'
                            >
                              <polyline points='20 6 9 17 4 12'></polyline>
                            </svg>
                          </span>
                        </span>
                        <span className='flex flex-col text-sm'>
                          <span className='flex items-center gap-2 font-medium text-white' id='headlessui-label-:rc:'>
                            <div className='h-[50px] w-[50px]'>
                              <img
                                src='https://chieuphimquocgia.com.vn/images/vnpay.svg'
                                alt=''
                                className='h-full w-full object-contain'
                              />
                            </div>
                            VNPAY
                          </span>
                        </span>
                      </span>
                      <span
                        className='pointer-events-none absolute -inset-px rounded-xl border border-primary'
                        aria-hidden='true'
                      ></span>
                    </div>
                    {/* <div
                      className='relative block cursor-pointer rounded-xl border border-gray-700 bg-transparent px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                      id='headlessui-radiogroup-option-:rd:'
                      role='radio'
                      aria-checked='false'
                      data-headlessui-state=''
                      aria-labelledby='headlessui-label-:re:'
                    >
                      <span className='flex items-center'>
                        <span
                          className='mr-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-700 bg-transparent'
                          aria-hidden='true'
                        ></span>
                        <span className='flex flex-col text-sm'>
                          <span className='flex items-center gap-2 font-medium text-white' id='headlessui-label-:re:'>
                            Payoo
                          </span>
                        </span>
                      </span>
                      <span
                        className='pointer-events-none absolute -inset-px rounded-xl border border-transparent'
                        aria-hidden='true'
                      ></span>
                    </div> */}
                  </div>
                </div>
                <h4 className='font-bold'>Chi phí</h4>
                <div>
                  <div className='flex items-center justify-between'>
                    <p>Thanh toán</p>
                    <p className='font-bold'>180.000đ</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Fee (0%)</p>
                    <p className='font-bold'>0đ</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Tổng cộng</p>
                    <p className='font-bold'>180.000đ</p>
                  </div>
                </div>
                <div className='space-y-3'>
                  <button className='inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium opacity-50 transition-colors hover:bg-primary hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none'>
                    Thanh toán
                  </button>
                  <Link
                    to='/book-tickets'
                    className='inline-flex h-10 w-full items-center justify-center rounded-full border px-8 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                  >
                    Quay lại
                  </Link>
                  <div className='mx-auto mt-4 text-center text-sm text-red-500'>
                    <b>Lưu ý:</b> Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và
                    không mua vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
