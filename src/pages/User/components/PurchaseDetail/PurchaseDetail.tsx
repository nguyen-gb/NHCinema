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
        className={classNames('relative transform transition-all duration-1000 sm:min-w-[600px] lg:min-w-[800px]', {
          'translate-y-[-150px] opacity-0': !isReady,
          'translate-y-0 opacity-100': isReady
        })}
      >
        <div className='w-full text-white'>
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
        <button className='absolute right-[-1rem] top-[-1rem] text-primary' onClick={handleClose}>
          <AiOutlineCloseCircle className='h-8 w-8' />
        </button>
      </div>
    </Modal>
  )
}
