import classNames from 'classnames'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AiFillStar } from 'react-icons/ai'
import { BiCategory, BiTime, BiUser } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

export default function ShowTimes() {
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
        <title>Lịch chiếu phim | NHCinema</title>
        <meta
          name='description'
          content='Hiển thị lịch chiếu theo ngày của những bộ phim đang và sắp được chiếu tại các rạp NHCinema'
        />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px]'>
          <div className='mb-[10px] text-lg uppercase text-primary'>Xem lịch chiếu theo ngày</div>
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
                className={classNames('px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isToday,
                  'bg-white': !isToday
                })}
              >
                Hôm nay
              </div>
              <div
                className={classNames('w-full p-2 group-hover:bg-secondary', {
                  'bg-secondary': isToday,
                  'bg-white': !isToday
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{currentDate.getDate()}</div>
                <div className='text-center text-lg'>{currentDate.toLocaleString('vi-VN', { month: 'long' })}</div>
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
                className={classNames('px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                {daysOfWeek[tomorrow.getDay()]}
              </div>
              <div
                className={classNames('w-full p-2 group-hover:bg-secondary', {
                  'bg-secondary': isTomorrow,
                  'bg-white': !isTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{tomorrow.getDate()}</div>
                <div className='text-center text-lg'>{tomorrow.toLocaleString('vi-VN', { month: 'long' })}</div>
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
                className={classNames('px-8 py-[1px] text-lg group-hover:bg-primary', {
                  'bg-primary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                {daysOfWeek[dayAfterTomorrow.getDay()]}
              </div>
              <div
                className={classNames('w-full p-2 group-hover:bg-secondary', {
                  'bg-secondary': isDayAfterTomorrow,
                  'bg-white': !isDayAfterTomorrow
                })}
              >
                <div className='text-center text-[50px] font-semibold'>{dayAfterTomorrow.getDate()}</div>
                <div className='text-center text-lg'>{dayAfterTomorrow.toLocaleString('vi-VN', { month: 'long' })}</div>
              </div>
            </button>
          </div>
        </div>
        <div className='bg-tertiary p-[20px] text-lg uppercase text-white'>Lịch chiếu phim</div>
        <div className='flex flex-col justify-start bg-white/95'>
          <div className='relative m-3 flex bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary'>
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
                    Thời lượng:
                  </strong>
                  119 phút
                </span>
                <span className='col-span-1 flex items-start'>
                  <strong className='mr-1 flex flex-shrink-0 items-center'>
                    <BiCategory className='mx-1' />
                    Thể loại:
                  </strong>
                  Hài Hước, Tình Cảm
                </span>
                <span className='col-span-1 flex items-start'>
                  <strong className='mr-1 flex flex-shrink-0 items-center'>
                    <BiUser className='mx-1' />
                    Đạo diễn:
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
          <div className='relative m-3 flex bg-primary px-[20px] py-[10px] shadow-ct3d shadow-quaternary'>
            <div className='mr-[40px] max-w-[220px] flex-shrink-0'>
              <img
                src='https://touchcinema.com/uploads/an-mang-o-venice/365410761-869161804566249-201531106378275548-n-poster.jpg'
                alt=''
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex-grow bg-white p-[20px]'>
              <Link to=''>
                <h3 className='text-xl uppercase text-quaternary'>ÁN MẠNG Ở VENICE</h3>
              </Link>
              <h3 className='mb-[10px] text-base uppercase text-quaternary'>A HAUNTING IN VENICE</h3>
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
                    Thời lượng:
                  </strong>
                  103 phút
                </span>
                <span className='col-span-1 flex items-start'>
                  <strong className='mr-1 flex flex-shrink-0 items-center'>
                    <BiCategory className='mx-1' />
                    Thể loại:
                  </strong>
                  Kinh Dị, Tâm Lý, Tội Phạm
                </span>
                <span className='col-span-1 flex items-start'>
                  <strong className='mr-1 flex flex-shrink-0 items-center'>
                    <BiUser className='mx-1' />
                    Đạo diễn:
                  </strong>
                  Kenneth Branagh
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
        </div>
      </div>
    </div>
  )
}
