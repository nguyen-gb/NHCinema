import classNames from 'classnames'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AiFillStar } from 'react-icons/ai'
import { BiCategory, BiTime, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ShowTimes() {
  const { i18n, t } = useTranslation('show-times')
  const [isToday, setIsToday] = useState(true)
  const [isTomorrow, setIsTomorrow] = useState(false)
  const [isDayAfterTomorrow, setIsDayAfterTomorrow] = useState(false)

  const currentDate = new Date()
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)
  const dayAfterTomorrow = new Date(currentDate)
  dayAfterTomorrow.setDate(currentDate.getDate() + 2)

  const handleChangeDay = (day: Date) => {
    if (day === tomorrow) {
      setIsToday(false)
      setIsTomorrow(true)
      setIsDayAfterTomorrow(false)
    } else if (day === dayAfterTomorrow) {
      setIsToday(false)
      setIsTomorrow(false)
      setIsDayAfterTomorrow(true)
    } else {
      setIsToday(true)
      setIsTomorrow(false)
      setIsDayAfterTomorrow(false)
    }
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('show-times')} | NHCinema</title>
        <meta name='description' content={t('show-times-des')} />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px]'>
          <div className='mb-[10px] text-lg uppercase text-primary'>{t('schedule')}</div>
          <div className='mb-[20px] flex items-center justify-start'>
            <button
              onClick={() => handleChangeDay(currentDate)}
              className={classNames(
                'group ml-[10px] flex cursor-pointer flex-col items-center justify-between hover:text-white',
                {
                  'text-white': isToday,
                  'text-quaternary': isToday
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isToday,
                  'bg-white': !isToday
                })}
              >
                {t('today')}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isToday,
                  'bg-white': !isToday
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{currentDate.getDate()}</div>
                <div className='text-center text-lg'>
                  {currentDate.toLocaleString(i18n.language, { month: 'long' })}
                </div>
              </div>
            </button>
            <button
              onClick={() => handleChangeDay(tomorrow)}
              className={classNames(
                'group ml-[10px] flex cursor-pointer flex-col items-center justify-between hover:text-white',
                {
                  'text-white': isTomorrow,
                  'text-quaternary': !isTomorrow
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                {tomorrow.toLocaleString(i18n.language, { weekday: 'long' })}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{tomorrow.getDate()}</div>
                <div className='text-center text-lg'>{tomorrow.toLocaleString(i18n.language, { month: 'long' })}</div>
              </div>
            </button>
            <button
              onClick={() => handleChangeDay(dayAfterTomorrow)}
              className={classNames(
                'group ml-[10px] flex cursor-pointer flex-col items-center justify-between hover:text-white',
                {
                  'text-white': isDayAfterTomorrow,
                  'text-quaternary': !isDayAfterTomorrow
                }
              )}
            >
              <div
                className={classNames('w-full px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                {dayAfterTomorrow.toLocaleString(i18n.language, { weekday: 'long' })}
              </div>
              <div
                className={classNames('w-full px-6 py-2 group-hover:bg-secondary', {
                  'bg-secondary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{dayAfterTomorrow.getDate()}</div>
                <div className='text-center text-lg'>
                  {dayAfterTomorrow.toLocaleString(i18n.language, { month: 'long' })}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className='bg-tertiary p-[20px] text-lg uppercase text-white'>{t('movie-schedule')}</div>
        <div className='flex flex-col justify-start bg-white/95'>
          {false &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='relative m-3 flex bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary'
              >
                <div
                  role='status'
                  className='animate-pulse space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0'
                >
                  <div className='flex h-48 w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700 sm:w-96'>
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
                  <div className='w-full'>
                    <div className='mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-2 max-w-[360px] rounded-full bg-gray-200 dark:bg-gray-700'></div>
                  </div>
                  <span className='sr-only'>Loading...</span>
                </div>
              </div>
            ))}
          {true &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='relative m-3 flex bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary'
              >
                <div className='mr-[40px] max-w-[220px] flex-shrink-0'>
                  <img
                    src='https://touchcinema.com/medias/hinh-phim-2021/the-inseparables-poster-poster.jpg'
                    alt=''
                    className='h-full w-full object-cover'
                  />
                </div>
                <div className='flex-grow bg-white p-[20px]'>
                  <Link to=''>
                    <h3 className='text-xl uppercase text-quaternary'>Tình Bạn Diệu Kỳ (Lồng Tiếng)</h3>
                  </Link>
                  <h3 className='mb-[10px] text-base uppercase text-quaternary'>THE INSEPARABLES</h3>
                  <div className='mb-[20px] flex max-w-fit rounded-lg bg-secondary px-4 py-2'>
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                    <AiFillStar color='yellow' className='h-6 w-6' />
                  </div>
                  <div className='mb-[20px] grid grid-cols-3'>
                    <span className='col-span-1 flex items-start'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiTime className='mx-1' />
                        {t('duration')}:
                      </strong>
                      119 {t('minutes')}
                    </span>
                    <span className='col-span-1 flex items-start'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiCategory className='mx-1' />
                        {t('genre')}:
                      </strong>
                      Hài Hước, Tình Cảm
                    </span>
                    <span className='col-span-1 flex items-start'>
                      <strong className='mr-1 flex flex-shrink-0 items-center'>
                        <BiUser className='mx-1' />
                        {t('director')}:
                      </strong>
                      Lee Han
                    </span>
                  </div>
                  <div className='flex flex-wrap text-white'>
                    <div
                      className={classNames(
                        'mb-[8px] mr-[8px] max-w-fit rounded-md border border-tertiary px-[20px] py-[8px]',
                        {
                          'cursor-not-allowed bg-quaternary': true,
                          'cursor-pointer bg-primary': false
                        }
                      )}
                    >
                      13:15
                    </div>
                    <div
                      className={classNames(
                        'mb-[8px] mr-[8px] max-w-fit rounded-md border border-tertiary px-[20px] py-[8px]',
                        {
                          'cursor-not-allowed bg-quaternary': true,
                          'cursor-pointer bg-primary': false
                        }
                      )}
                    >
                      13:35
                    </div>
                    <div
                      className={classNames(
                        'mb-[8px] mr-[8px] max-w-fit rounded-md border border-tertiary px-[20px] py-[8px]',
                        {
                          'cursor-not-allowed bg-quaternary': false,
                          'cursor-pointer bg-primary': true
                        }
                      )}
                    >
                      15:15
                    </div>
                  </div>
                </div>
                <div className='absolute right-[100px] top-[-1px]'>
                  <div className='max-h-fit rounded-sm bg-secondary px-3 pb-5 pt-4 text-center text-lg text-white shadow-ct3d shadow-quaternary'>
                    T16
                  </div>
                </div>
                <div className='absolute right-[40px] top-[-1px]'>
                  <div className='rounded-sm bg-tertiary px-3 py-4 text-center text-lg text-white shadow-ct3d shadow-quaternary'>
                    <p className='text-2xl font-semibold underline'>01</p>
                    <p>09</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
