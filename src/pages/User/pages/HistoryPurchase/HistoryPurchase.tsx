import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'

import userApi from 'src/apis/user.api'
import { AppContext } from 'src/contexts/app.context'
import { formatCurrency, formatDateToStringWithTime } from 'src/utils/utils'
import paymentApi from 'src/apis/payment.api'

export default function HistoryPurchase() {
  const { t } = useTranslation('user')
  const { profile } = useContext(AppContext)

  const { data: hisBookingsData } = useQuery({
    queryKey: ['purchases', profile?._id],
    queryFn: () => userApi.getHistoryBooking(profile?._id as string)
  })

  const createPaymentUrlMutation = useMutation({
    mutationFn: paymentApi.createPaymentUrl,
    onSuccess: (res) => {
      window.location.href = res.data.data
    }
  })

  const hisBookings = hisBookingsData?.data.data

  const handlePayment = (bookingId: string) => {
    createPaymentUrlMutation.mutate({
      booking_id: bookingId
    })
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
                      {t('showtime')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('ticket-number')}
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
                    hisBookings.map((hisBooking, index) => {
                      return (
                        <tr key={index}>
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
                            {`${hisBooking.showtime} ${hisBooking.time}`}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {hisBooking.seats.length}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {`${formatCurrency(hisBooking.total_amount)} ${t('vnd')}`}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            <p>{Number(hisBooking.payment_status) === 1 ? t('paid') : t('unpaid')}</p>
                            <button onClick={() => handlePayment(hisBooking._id)} className='cursor-pointer'>
                              {Number(hisBooking.payment_status) === 0 && `(${t('continue-payment')})`}
                            </button>
                          </th>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {!hisBookings && <div className='py-10 text-center text-sm text-gray-500'>{t('no-data')}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
