import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineCloseCircle } from 'react-icons/ai'

import { PointHistory } from 'src/types/user.type'
import classNames from 'classnames'
import { seatArray } from 'src/constants/product'
import { SeatExchangePoint, SeatType } from 'src/types/seat.type'

interface Props {
  isOpen: boolean
  userLevel: number
  bonusPoints: PointHistory
  onClose: () => void
}

export default function BonusPointsDetail({ isOpen, userLevel, bonusPoints, onClose }: Props) {
  const { t } = useTranslation('payment')
  const [isReady, setIsReady] = useState(false)
  const ratio = userLevel === 1 ? 0.0005 : userLevel === 2 ? 0.0007 : 0.001

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
          <div className='w-full'>
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
                        <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                          {t('total-point')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonusPoints?.seats && (
                        <tr>
                          <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                            <div className='font-medium text-white'>
                              {t('seat')} (
                              {bonusPoints.seats.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')})
                            </div>
                          </td>
                          <td className='px-3 py-3.5 text-sm'>{bonusPoints?.seats.length}</td>
                          <td className='px-3 py-3.5 text-sm'>
                            {bonusPoints.used_point < 0
                              ? bonusPoints.seats.reduce(
                                  (total, seat) =>
                                    total +
                                    (seat.seat_type === SeatType.single_seat
                                      ? SeatExchangePoint.single_seat
                                      : SeatExchangePoint.double_seat),
                                  0
                                ) * -1
                              : bonusPoints.seats.reduce((total, seat) => total + (seat.price ?? 0), 0) * ratio}
                          </td>
                        </tr>
                      )}
                      {bonusPoints?.combos.map((combo) => {
                        return (
                          <tr key={combo._id}>
                            <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='font-medium text-white'>{combo.description}</div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>{combo.quantity}</td>
                            <td className='px-3 py-3.5 text-sm'>
                              {bonusPoints.used_point < 0
                                ? combo.quantity * combo.exchange_point * -1
                                : combo.quantity * combo.price * ratio}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className='absolute right-[0rem] top-[1.2rem] text-primary xl:right-[-1rem] xl:top-[0.5rem]'
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className='h-8 w-8' />
        </button>
      </div>
    </Modal>
  )
}
