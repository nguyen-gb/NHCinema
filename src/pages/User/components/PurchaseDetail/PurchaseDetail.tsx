import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import { seatArray } from 'src/constants/product'
import { ConfirmPaymentRes } from 'src/types/payment.type'
import { formatCurrency } from 'src/utils/utils'

interface Props {
  isOpen: boolean
  bookingData: ConfirmPaymentRes
  onClose: () => void
}

export default function PurchaseDetail({ isOpen, bookingData, onClose }: Props) {
  const { t } = useTranslation('payment')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsReady(isOpen)
    }, 200)

    return () => {
      setIsReady(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsReady(false)

    setTimeout(() => {
      onClose()
    }, 800)
  }
  return (
    <Modal ariaHideApp={false} isOpen={isOpen} className='flex h-full w-full items-center justify-center bg-black/90'>
      <div
        className={classNames(
          'relative max-h-[95%] transform overflow-y-auto transition-all duration-1000 sm:min-w-[600px] lg:min-w-[800px] xl:overflow-y-visible',
          {
            'translate-y-[-150px] opacity-0': !isReady,
            'translate-y-0 opacity-100': isReady
          }
        )}
      >
        <div className='flex flex-wrap gap-5 text-white xl:flex-nowrap'>
          <div className='w-full xl:w-2/3'>
            <div className='space-y-6 rounded-2xl bg-[#1A1D23] p-4 text-sm md:p-6 md:text-base'>
              <h4 className='font-bold'>{t('movie-inf')}</h4>
              <div>
                <p>{t('movie')}</p>
                <p className='font-semibold text-primary'>{bookingData?.movie_name}</p>
              </div>
              <div className='flex items-center gap-10'>
                <div className='w-1/2'>
                  <p>{t('show-date-and-time')}</p>
                  <div className='flex items-center space-x-2 text-primary'>
                    <span className='font-bold'>{bookingData?.showtime}</span>
                    <span>-</span>
                    <span className='font-semibold'>{bookingData?.time}</span>
                  </div>
                </div>
                <div>
                  <p>{t('seat')}</p>
                  <p className='font-semibold text-primary'>
                    {bookingData?.seats.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-10'>
                <div className='w-1/2'>
                  <p>{t('format')}</p>
                  <p className='font-semibold text-primary'>{bookingData?.format}</p>
                </div>
                <div>
                  <p>{t('cinema-room')}</p>
                  <p className='font-semibold text-primary'>{bookingData?.room_number}</p>
                </div>
              </div>
              <div className='flex items-center gap-10'>
                <div className='w-1/2'>
                  <p>{t('total-amount')}</p>
                  <p className='font-semibold text-primary'>
                    {formatCurrency(bookingData?.total_amount)}
                    {t('vnd')}
                  </p>
                </div>
                <div>
                  <p>{t('cinema-room')}</p>
                  <p className='font-semibold text-primary'>{bookingData?.room_number}</p>
                </div>
              </div>
            </div>
            <div className='mt-5 space-y-6 rounded-2xl bg-[#1A1D23] p-4 text-sm md:p-6 md:text-base'>
              <h4 className='font-bold'>{t('billing-infor')}</h4>
              <div>
                <div className='mt-4 rounded-xl ring-1 ring-gray-700 sm:mx-0'>
                  <table className='min-w-full divide-y divide-gray-600'>
                    <thead>
                      <tr>
                        <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                          {t('category')}
                        </th>
                        <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                          {t('quantity')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                          <div className='font-medium text-white'>
                            {t('seat')} (
                            {bookingData?.seats.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')})
                          </div>
                        </td>
                        <td className='px-3 py-3.5 text-sm'>{bookingData?.seats.length}</td>
                      </tr>
                      {bookingData?.combos.map((combo) => {
                        return (
                          <tr key={combo._id}>
                            <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='font-medium text-white'>{combo.description}</div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>{combo.quantity}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex-1 text-sm md:text-base xl:w-1/3'>
            <div className='h-full space-y-5 rounded-2xl bg-[#1A1D23] p-4 md:p-6'>
              <h4 className='font-bold'>{t('payment-methods')}</h4>
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
              <h4 className='font-bold'>{t('expense')}</h4>
              <div>
                <div className='flex items-center justify-between'>
                  <p>{t('payment')}</p>
                  <p className='font-bold'>
                    {formatCurrency((bookingData?.total_amount ?? 0) + (bookingData?.discount_price ?? 0))}
                    {t('vnd')}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>VAT (10%)</p>
                  <p className='font-bold'>
                    {formatCurrency((bookingData?.total_amount ?? 0) * 0.1)}
                    {t('vnd')}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>{t('discount')}</p>
                  <p className='font-bold'>
                    {formatCurrency(bookingData?.discount_price ?? 0)}
                    {t('vnd')}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p>{t('total')}</p>
                  <p className='font-bold'>
                    {formatCurrency(bookingData?.total_amount ?? 0)}
                    {t('vnd')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className='absolute right-[1rem] top-[1rem] text-primary xl:right-[-1rem] xl:top-[-1rem]'
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className='h-8 w-8' />
        </button>
      </div>
    </Modal>
  )
}
