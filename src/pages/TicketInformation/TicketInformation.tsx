import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import bookingApi from 'src/apis/booking.api'
import path from 'src/constants/path'
import { seatArray } from 'src/constants/product'

export default function TicketInformation() {
  const { ticketId } = useParams()
  const { t } = useTranslation('payment-detail')
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => bookingApi.getBookingDetail(ticketId as string),
    onError: () => {
      navigate(path.home)
    }
  })

  const ticketData = data?.data.data

  return (
    <>
      {isLoading && (
        <div className='flex min-h-screen animate-pulse items-center justify-center bg-gradient-to-r from-primary/50 to-tertiary/50'>
          <div className='my-6 animate-pulse rounded-2xl bg-white p-6 shadow-2xl'>
            <div
              role='status'
              className='flex h-[500px] w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700'
            >
              <svg
                className='h-10 w-10 text-gray-200 dark:text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>
            </div>

            <h1 className='mb-4 text-center text-3xl font-bold capitalize text-gray-800'>{t('movie-ticket')}</h1>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('code')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('movie-name')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('cinema')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('room')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('showtime')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('seat')}:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            <div className='mb-4 flex animate-pulse items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>Combo:</h2>
              <div className='mb-2.5 h-4 w-[200px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>
          </div>
        </div>
      )}
      {ticketData && !isLoading && (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-primary/50 to-tertiary/50'>
          <div className='m-6 rounded-2xl bg-white p-6 shadow-2xl'>
            <div role='status' className='flex h-[500px] w-full items-center justify-center rounded-lg'>
              <img
                src={ticketData?.movie_poster}
                alt='Movie Poster'
                className='mb-4 h-full rounded-lg object-contain'
              />
            </div>

            <h1 className='mb-4 text-center text-3xl font-bold capitalize text-gray-800'>{t('movie-ticket')}</h1>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('code')}:</h2>
              <p className='text-right leading-5 text-gray-700'>{ticketData.code}</p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('movie-name')}:</h2>
              <p className='text-right leading-5 text-gray-700'>{ticketData.movie_name}</p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('cinema')}:</h2>
              <p className='text-right leading-5 text-gray-700'>{ticketData.theater_name}</p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('room')}:</h2>
              <p className='text-right leading-5 text-gray-700'>{ticketData.room_number}</p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('showtime')}:</h2>
              <p className='text-right leading-5 text-gray-700'>{`${ticketData.showtime} ${ticketData.time}`}</p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>{t('seat')}:</h2>
              <p className='text-right leading-5 text-gray-700'>
                {ticketData.seats.map((s) => seatArray[Number(s.seat_number) - 1]).join(', ')}
              </p>
            </div>

            <div className='mb-4 flex items-start justify-between gap-4'>
              <h2 className='text-xl font-semibold leading-5 text-gray-800'>Combo:</h2>
              <p className='text-right leading-5 text-gray-700'>
                {ticketData.combos.length > 0
                  ? ticketData.combos.map((combo) => `${combo.name} (${combo.quantity})`).join(', ')
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
