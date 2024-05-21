import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import moment from 'moment'

import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import { formatCurrency, formatDateToStringWithTime } from 'src/utils/utils'
import PurchaseDetail from 'src/pages/User/components/PurchaseDetail'
import { ConfirmPaymentRes } from 'src/types/payment.type'
import ReviewPopup from 'src/pages/User/components/ReviewPopup'
import paymentApi from 'src/apis/payment.api'

export default function HistoryPurchase() {
  const { t } = useTranslation('user')
  const { profile } = useContext(AppContext)

  const [bookingData, setBookingData] = useState<ConfirmPaymentRes | null>(null)
  const [isOpenPopupDetail, setIsOpenPopupDetail] = useState(false)
  const [isOpenPopupReview, setIsOpenPopupReview] = useState(false)

  const {
    data: hisBookingsData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['purchases', profile?._id],
    queryFn: () => userApi.getHistoryBooking(profile?._id as string)
  })

  const hisBookings = hisBookingsData?.data.data

  const createPaymentUrlMutation = useMutation({
    mutationFn: paymentApi.createPaymentUrl,
    onSuccess: (res) => {
      window.location.href = res.data.data
    }
  })

  const handlePayment = (bookingId: string) => {
    createPaymentUrlMutation.mutate({
      booking_id: bookingId
    })
  }

  const isPastTime = (time: string) => {
    const currentTime = moment()
    const targetTime = moment(time, 'HH:mm DD:MM:YYYY')
    if (currentTime.isAfter(targetTime)) return true
    else return false
  }

  const openPopupDetail = (bookingData: ConfirmPaymentRes) => {
    setBookingData(bookingData)
    setIsOpenPopupDetail(true)
  }

  const closePopupDetail = () => {
    setIsOpenPopupDetail(false)
    setBookingData(null)
  }

  const openPopupReview = (bookingData: ConfirmPaymentRes) => {
    setBookingData(bookingData)
    setIsOpenPopupReview(true)
  }

  const closePopupReview = () => {
    setIsOpenPopupReview(false)
    setBookingData(null)
  }

  return (
    <div>
      <Helmet>
        <title>{t('history-purchase')} | NHCinema</title>
        <meta name='description' content={t('history-purchase-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div className='mt-4 min-w-full overflow-x-auto ring-1 ring-gray-700 sm:mx-0 sm:rounded-xl'>
              <table className='min-w-full divide-y divide-gray-600'>
                <thead>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('day-trading')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('movie-name')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('cinema')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('showtime')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('amount-of-money')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('status')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hisBookings &&
                    hisBookings.map((hisBooking) => {
                      return (
                        <tr key={hisBooking._id}>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {formatDateToStringWithTime(new Date(hisBooking.created_at))}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {hisBooking.movie_name}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {hisBooking.theater_name}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {`${hisBooking.showtime} ${hisBooking.time}`}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {`${formatCurrency(hisBooking.total_amount - hisBooking.discount_price)}${t('vnd')}`}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            <span>{Number(hisBooking.payment_status) === 1 ? t('paid') : t('unpaid')}</span>
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6'
                          >
                            <button onClick={() => openPopupDetail(hisBooking)}>{t('detail')}</button>
                          </th>
                          {isPastTime(`${hisBooking.showtime} ${hisBooking.time}`) && (
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6'
                            >
                              {hisBooking.reviewed === 0 && Number(hisBooking.payment_status) === 1 ? (
                                <button onClick={() => openPopupReview(hisBooking)}>{t('review')}</button>
                              ) : (
                                <button>{t('reviewed')}</button>
                              )}
                            </th>
                          )}
                          {Number(hisBooking.payment_status) === 0 && (
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6'
                            >
                              <button
                                onClick={() => handlePayment(hisBooking._id)}
                                className='cursor-pointer text-left text-primary transition-all'
                              >
                                {t('continue-payment')}
                              </button>
                            </th>
                          )}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {!isLoading && !hisBookings && (
                <div className='py-10 text-center text-sm text-gray-500'>{t('no-data')}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <PurchaseDetail
        isOpen={isOpenPopupDetail}
        bookingData={bookingData as ConfirmPaymentRes}
        onClose={closePopupDetail}
      />

      <ReviewPopup
        isOpen={isOpenPopupReview}
        bookingData={bookingData as ConfirmPaymentRes}
        onClose={closePopupReview}
        onDone={refetch}
      />
    </div>
  )
}
