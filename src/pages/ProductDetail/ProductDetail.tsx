import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { convert } from 'html-to-text'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { VscDebugStart } from 'react-icons/vsc'
import classNames from 'classnames'
import moment from 'moment'
// import { toast } from 'react-toastify'
// import DOMPurify from 'dompurify'

import productApi from 'src/apis/product.api'
import { getIdFromMovieId, isTodayShowTime } from 'src/utils/utils'
import VideoPopup from 'src/components/VideoPopup'
import DropdownCinema from 'src/components/DropdownCinema'
import showtimesApi from 'src/apis/showtimes.api'
import { AppContext } from 'src/contexts/app.context'

export default function ProductDetail() {
  // const navigate = useNavigate()
  const { i18n, t } = useTranslation('product')
  const { cinema } = useContext(AppContext)
  const navigate = useNavigate()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isHideShowTimes, setIsHideShowTimes] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())

  const { movieId } = useParams()
  const id = getIdFromMovieId(movieId as string)
  const { data: productDetailData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id)
  })
  const { data: showtimeData } = useQuery({
    queryKey: ['showtime', cinema._id, id],
    queryFn: () =>
      showtimesApi.getShowtimesByMovie({
        theater_id: cinema._id,
        movie_id: id
      })
  })

  const currentHour = currentDate.getHours()
  const currentMinute = currentDate.getMinutes()

  const product = productDetailData?.data.data
  const showtimes = showtimeData?.data.data[0].times

  const openVideoPopup = () => {
    setIsVideoOpen(true)
  }

  const closeVideoPopup = () => {
    setIsVideoOpen(false)
  }

  const handleShowShowTimes = () => {
    if (product && moment(product.release, 'DD/MM/YYYY').isBefore(moment())) {
      setIsHideShowTimes(false)
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const handleChooseTime = (showtime_id: string) => {
    navigate(`/book-tickets/${showtime_id}?format=${product?.format}`)
  }

  useEffect(() => {
    setTimeout(() => setCurrentDate(new Date()), 60 * 1000)
  }, [currentDate])

  if (isLoading)
    return (
      <div className='bg-secondary'>
        <Helmet>
          <title> | NHCinema</title>
        </Helmet>
        <div className='container'>
          <div className='grid grid-cols-12'>
            <div className='relative col-span-12'>
              <div className='relative'>
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
              </div>
              <div className='relative grid grid-cols-12 p-[15px] lg:mt-[-200px]'>
                <div className='col-span-3 hidden xl:block'>
                  <div
                    role='status'
                    className='flex h-[400px] w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700'
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
                </div>
                <div className='col-span-12 bg-transparent p-[15px] text-white xl:col-span-9'>
                  <div role='status' className='max-w-sm animate-pulse'>
                    <div className='mb-4 h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-8 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <br />
                    <br />
                    <div className='mb-2.5 h-4 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-4 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-4 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
                <div className='col-span-12 my-[20px] bg-primary p-[20px] shadow-ct3d'>
                  <div role='status' className='max-w-sm animate-pulse'>
                    <div className='mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <span className='sr-only'>Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  if (!product) return
  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{product.name} | NHCinema</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12'>
          <div className='relative col-span-12'>
            <div className='relative'>
              <img
                className='h-[250px] w-full object-cover md:h-[300px] xl:h-[473px]'
                src={product.thumbnail}
                alt={i18n.language === 'vi-VN' ? product.name : product.english_name}
              />
              <div className='absolute bottom-0 left-0 right-0 top-0 bg-quaternary/70'>
                <div className='flex h-[80%] w-full items-center justify-center'>
                  <button
                    className='h-[60px] w-[60px] cursor-pointer rounded-full bg-primary sm:h-[80px] sm:w-[80px]'
                    onClick={openVideoPopup}
                  >
                    <VscDebugStart className='h-full w-full scale-75 text-white' />
                  </button>
                </div>
              </div>
            </div>
            <div className='relative grid grid-cols-12 p-[15px] lg:mt-[-200px]'>
              <div className='col-span-3 hidden xl:block'>
                <img src={product.poster} alt='' className='h-full w-full border-2 border-white object-cover' />
              </div>
              <div className='col-span-12 bg-transparent p-[15px] text-white xl:col-span-9'>
                <h1 className='text-2xl font-semibold uppercase text-primary lg:mt-[20px]'>
                  {i18n.language === 'vi-VN'
                    ? product.name || product.english_name
                    : product.english_name || product.name}
                </h1>
                <h2 className='mt-2 text-2xl uppercase'>
                  {i18n.language === 'vi-VN'
                    ? product.english_name || product.name
                    : product.name || product.english_name}
                </h2>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('duration')}:</strong>
                  {product.duration} {t('minutes')}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('launched-from')}:</strong>
                  {product.release}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('category')}:</strong>
                  {product.genres}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('format')}:</strong>
                  {product.format}
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('director')}:</strong>
                  {product.director}
                </p>
                <p className='mt-2 flex'>
                  <strong className='inline-block w-[140px] flex-shrink-0 text-primary'>{t('performer')}:</strong>
                  <span className='line-clamp-1'>{product.performer}</span>
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>{t('age')}:</strong>
                  <span>P</span>-
                </p>
                <button
                  onClick={handleShowShowTimes}
                  className={classNames(
                    'mt-4 flex max-w-fit items-center justify-center bg-primary px-4 py-2 text-xl uppercase opacity-80 shadow-ct3d transition-all',
                    {
                      'cursor-pointer hover:opacity-100': moment(product.release, 'DD/MM/YYYY').isBefore(moment()),
                      'cursor-not-allowed': !moment(product.release, 'DD/MM/YYYY').isBefore(moment())
                    }
                  )}
                >
                  <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' className='mr-2 h-6' />
                  {moment(product.release, 'DD/MM/YYYY').isBefore(moment()) ? t('book-tickets') : t('not-yet-released')}
                </button>
              </div>
              <div className='col-span-12 my-[20px] bg-primary p-[20px] shadow-ct3d'>
                <p className='text-base text-white'>{product.description}</p>
              </div>
            </div>
          </div>
          {!isHideShowTimes && (
            <div className='col-span-12 my-[20px] p-[15px] text-white'>
              <div className='mb-[20px] flex flex-wrap items-center justify-between'>
                <p className='mb-[20px] max-w-fit border-b-2 pb-2 pl-2 pr-12 text-left text-2xl font-bold'>
                  {t('showtimes')}
                </p>
                <DropdownCinema />
              </div>
              {showtimes && showtimes?.length > 0 ? (
                showtimes.map((showtime) => (
                  <div key={showtime.time}>
                    {isTodayShowTime(showtime.time) ? (
                      <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>
                        {t('today')},{' '}
                        {new Date(showtime.time).toLocaleString(i18n.language, {
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    ) : (
                      <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>
                        {new Date(showtime.time).toLocaleString(i18n.language, {
                          month: 'long',
                          day: 'numeric',
                          weekday: 'long'
                        })}
                      </div>
                    )}
                    <div className='mb-[12px] flex flex-wrap items-center justify-start'>
                      {showtime.showtimes.map(({ showtime_id, showtime: time }) => {
                        const [hour, minute] = time.split(':').map(Number)
                        const isPastTime = hour < currentHour || (hour === currentHour && minute < currentMinute - 5)
                        return (
                          <button
                            onClick={() => handleChooseTime(showtime_id)}
                            key={showtime_id}
                            className={classNames(
                              'mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]',
                              {
                                'cursor-not-allowed bg-quaternary': isPastTime && isTodayShowTime(showtime.time),
                                'cursor-pointer bg-primary': !isPastTime || !isTodayShowTime(showtime.time)
                              }
                            )}
                            disabled={isPastTime && isTodayShowTime(showtime.time)}
                          >
                            {time}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <span className='text-lg italic'>{t('no-showtimes')}</span>
              )}
            </div>
          )}
        </div>
        <VideoPopup isOpen={isVideoOpen} videoUrl={product.trailer} onClose={closeVideoPopup} />
      </div>
    </div>
  )
}
