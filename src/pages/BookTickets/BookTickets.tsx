import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import moment from 'moment'
import { io } from 'socket.io-client'

import { AppContext } from 'src/contexts/app.context'
import { seatArray } from 'src/constants/product'
import path from 'src/constants/path'
import showtimesApi from 'src/apis/showtimes.api'
import { SeatType } from 'src/types/seat.type'
import bookingApi from 'src/apis/booking.api'
import { Booking } from 'src/types/booking.type'
import comboApi from 'src/apis/combo.api'
import { Combo as ComboInterface, ComboType } from 'src/types/combo.type'
import Combo from 'src/components/Combo'
import Button from 'src/components/Button'
import { calculateTicketPrice, formatCurrency } from 'src/utils/utils'
import config from 'src/constants/config'
import { Showtimes } from 'src/types/showtimes.type'

interface SeatProps {
  isBooked: boolean
  isReserved: boolean
  isSelected: boolean
  onSelect: () => void
  isDoubleSeat?: boolean
  SeatNumber: number
}

const Seat: React.FC<SeatProps> = ({
  isBooked,
  isReserved,
  isSelected,
  onSelect,
  isDoubleSeat = false,
  SeatNumber
}) => {
  const seatClasses = `${
    isDoubleSeat ? 'w-24 mx-4' : 'w-[2rem] sm:w-[2.5rem]'
  } h-[2rem] sm:h-[2.5rem] m-1 rounded-md text-white ${
    isBooked
      ? 'cursor-not-allowed bg-[#252a31]'
      : isReserved
      ? 'bg-red-500 cursor-not-allowed'
      : isSelected
      ? 'bg-primary'
      : `${isDoubleSeat ? 'bg-tertiary/80 hover:bg-tertiary' : 'bg-[#252a31] hover:bg-[#374151] cursor-pointer'}`
  }`

  return (
    <button
      className={seatClasses}
      onClick={() => {
        if (!isReserved && !isBooked) {
          onSelect()
        }
      }}
    >
      {isBooked ? 'X' : seatArray[SeatNumber - 1]}
    </button>
  )
}

const BookTickets: React.FC = () => {
  const { showtimeId } = useParams()
  const { t } = useTranslation('book-tickets')
  const { isAuthenticated, cinema } = useContext(AppContext)
  const navigate = useNavigate()
  const [reservedSeats, setReservedSeats] = useState<
    {
      seat_number: number
      status: string
      seat_type: string
    }[]
  >([])
  const [selectedSeats, setSelectedSeats] = useState<{ seat_number: number; seat_type: number }[]>([])
  const [combo, setCombo] = useState<ComboInterface[]>([])
  const [total, setTotal] = useState(0)
  const [totalCombo, setTotalCombo] = useState(0)
  const [countdownTime, setCountdownTime] = useState<number>(300)

  const formattedTime = moment.utc(countdownTime * 1000).format('mm:ss')

  const rows = 9
  const cols = 9
  const totalSeats = rows * cols

  const { data, refetch } = useQuery({
    queryKey: ['showtimes', showtimeId],
    queryFn: () => showtimesApi.getShowtimesById(showtimeId as string)
  })
  const { data: dataCombos } = useQuery({
    queryKey: ['combo'],
    queryFn: () => comboApi.getCombos()
  })
  const combos = dataCombos?.data.data.filter((combo) => combo.type === ComboType.COMBO) ?? []
  const drinks = dataCombos?.data.data.filter((combo) => combo.type === ComboType.DRINK) ?? []
  const popcorns = dataCombos?.data.data.filter((combo) => combo.type === ComboType.POPCORN) ?? []

  const createBookingMutation = useMutation({
    mutationFn: (body: Booking) => bookingApi.createBooking(body),
    onSuccess: (data) => {
      if (data.data.status === 200) {
        handleSocket()
        refetch()
        const bookingId = data.data.data._id
        navigate(`/payment/${bookingId}`)
      } else {
        refetch()
        if (data.data.message === 'Seats have been booked') {
          toast.warning(t('seat-booked'), {
            autoClose: 2000
          })
        } else {
          toast.warning(data.data.message, {
            autoClose: 2000
          })
        }
      }
    }
  })

  const toggleSeat = (seat: { seat_number: number; seat_type: SeatType }) => {
    if (!isAuthenticated) {
      navigate(`${path.login}?redirect_after_login=${window.location.pathname}`)
      return
    }

    const seatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number)
    const seatPrice = calculateTicketPrice(seat.seat_type)

    if (seatIndex === -1) {
      if (selectedSeats.length >= 10) {
        toast.warn(t('max-seat-warn'), {
          position: 'top-center',
          autoClose: 2000
        })
        return
      }

      const number = parseInt(seatArray[seat.seat_number - 1].substring(1))
      const leftSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - 1)
      const rightSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + 1)
      if (number === 2 && seat.seat_type === SeatType.single_seat) {
        for (let index = 1; index < 8; index++) {
          const seatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + index)
          if (seatIndex === -1) {
            const chooseSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - 1)
            if (chooseSeatIndex === -1) {
              toast.warn(t('empty-left-seat'), {
                position: 'top-center',
                autoClose: 2000
              })
              return
            }
          }
        }
      } else if (number === 8 && seat.seat_type === SeatType.single_seat) {
        for (let index = 1; index < 8; index++) {
          const seatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - index)
          if (seatIndex === -1) {
            const chooseSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + 1)
            if (chooseSeatIndex === -1) {
              toast.warn(t('empty-right-seat'), {
                position: 'top-center',
                autoClose: 2000
              })
              return
            }
          }
        }
      }
      const left2SeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - 2)
      const right2SeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + 2)
      if (left2SeatIndex !== -1 && leftSeatIndex === -1) {
        toast.warn(t('empty-left-seat'), {
          position: 'top-center',
          autoClose: 2000
        })
        return
      }
      if (right2SeatIndex !== -1 && rightSeatIndex === -1) {
        toast.warn(t('empty-right-seat'), {
          position: 'top-center',
          autoClose: 2000
        })
        return
      }

      setSelectedSeats([...selectedSeats, seat])
      setTotal((pre) => pre + seatPrice)
    } else {
      const number = parseInt(seatArray[seat.seat_number - 1].substring(1))
      const leftSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - 1)
      const rightSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + 1)
      if (number === 1 && seat.seat_type === SeatType.single_seat) {
        for (let index = 1; index < 8; index++) {
          const seatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + index)
          if (seatIndex === -1) {
            const chooseSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number + 1)
            if (chooseSeatIndex !== -1) {
              toast.warn(t('empty-right-seat-cancel'), {
                position: 'top-center',
                autoClose: 2000
              })
              return
            }
          }
        }
      } else if (number === 9 && seat.seat_type === SeatType.single_seat) {
        for (let index = 1; index < 8; index++) {
          const seatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - index)
          if (seatIndex === -1) {
            const chooseSeatIndex = selectedSeats.findIndex((s) => s.seat_number === seat.seat_number - 1)
            if (chooseSeatIndex !== -1) {
              toast.warn(t('empty-left-seat-cancel'), {
                position: 'top-center',
                autoClose: 2000
              })
              return
            }
          }
        }
      }

      if (leftSeatIndex !== -1 && rightSeatIndex !== -1) {
        toast.warn(t('empty-between-seat-cancel'), {
          position: 'top-center',
          autoClose: 2000
        })
        return
      }

      setSelectedSeats(selectedSeats.filter((s) => s.seat_number !== seat.seat_number))
      setTotal((pre) => pre - seatPrice)
    }
  }

  const handlePayment = () => {
    if (!isAuthenticated) {
      navigate(`${path.login}?redirect_after_login=${window.location.pathname}`)
      return
    }

    const selectedSeatsConvert = selectedSeats.map((seat) => {
      return {
        seat_number: String(seat.seat_number),
        seat_type: Number(seat.seat_type)
      }
    })
    const body = {
      theater_name: cinema.name,
      room_id: data?.data.data.room_id as string,
      movie_id: data?.data.data.movie_id as string,
      seats: selectedSeatsConvert,
      time: data?.data.data.time as string,
      showtime: data?.data.data.showtime as string,
      combos: combo.map((c) => {
        return {
          combo_id: c._id,
          combo_type: c.type,
          quantity: c.quantity
        }
      })
    }
    createBookingMutation.mutate(body)
  }

  const handleSocket = () => {
    const socket = io(config.socketUrl, { transports: ['websocket'] })

    socket.once('connect', () => {
      socket.emit('showtime', {
        showtime_id: showtimeId
      })
    })
  }

  useEffect(() => {
    data &&
      setReservedSeats(
        data.data.data.seat_array.map((seat) => {
          return {
            seat_number: Number(seat.seat_number),
            status: String(seat.status),
            seat_type: String(seat.seat_type)
          }
        })
      )
  }, [data])

  useEffect(() => {
    if (countdownTime <= 0) {
      navigate(-1)
    } else if (countdownTime > 0 && isAuthenticated) {
      setTimeout(() => setCountdownTime((prevTime) => prevTime - 1), 1000)
    }
  }, [countdownTime, navigate, isAuthenticated])

  useEffect(() => {
    const newTotalPrice = combo.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotalCombo(newTotalPrice)
  }, [combo])

  useEffect(() => {
    if (data) {
      const currentDate = new Date()
      const currentHour = currentDate.getHours()
      const currentMinute = currentDate.getMinutes()

      const [hour, minute] = data.data.data.showtime.split(':').map(Number)
      const isPastTime = hour < currentHour || (hour === currentHour && minute < currentMinute - 5)

      if (data.data.data.time === currentDate.toISOString().slice(0, 10) && isPastTime) {
        navigate(-1)
      }
    }
  }, [data, navigate])

  useEffect(() => {
    const socket = io(config.socketUrl, {
      transports: ['websocket']
    })

    socket.on('connect', () => {
      socket.on(showtimeId as string, (data: Showtimes) => {
        setReservedSeats(
          data.seat_array.map((seat) => {
            return {
              seat_number: Number(seat.seat_number),
              status: String(seat.status),
              seat_type: String(seat.seat_type)
            }
          })
        )

        const seatNumberArray = data.seat_array.map((seat) => Number(seat.seat_number))
        const isExist = selectedSeats.some((seat) => seatNumberArray.includes(seat.seat_number))
        if (isExist) {
          toast.warn(t('select-different-seats'), {
            position: 'top-center',
            autoClose: 2000
          })
          setSelectedSeats([])
          setTotal(0)
        }
      })
    })

    return () => {
      socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats])

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('book-tickets')} | NHCinema</title>
        <meta name='description' content={t('book-tickets-des')} />
      </Helmet>
      <div className='container'>
        <div className='mb-[40px]'>
          <div className='mx-4 mt-4 text-center text-sm text-red-500 md:px-6 lg:mx-auto'>
            <b>{t('note')}:</b> {t('note-des')}
          </div>
          <div className='my-5 flex items-center justify-around text-white'>
            <div className='self-end text-sm md:text-base'>
              {t('showtime')}: <span className='font-bold text-primary'>{data?.data.data.showtime}</span>
            </div>
            <div className='hidden rounded-xl border border-primary p-2 text-sm md:text-base xl:block'>
              {t('seat-selection-time')}:{' '}
              <span className={`${countdownTime <= 60 ? 'text-red-500' : 'text-primary'} font-semibold`}>
                {formattedTime}
              </span>
            </div>
            <p className='block text-sm md:text-base xl:hidden'>{formattedTime}</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='max-w-fit'>
              <img
                src='https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fscreen.png&w=1920&q=75'
                alt=''
                className='h-full w-full object-cover'
              />
              <div className='mb-6 text-center text-lg font-bold text-white'>
                {t('screening-room-number')} {data?.data.data.room_number}
              </div>
            </div>
            <div className='flex flex-wrap items-start justify-center gap-2'>
              <div className='flex flex-col items-center justify-center'>
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <div key={rowIndex} className='flex'>
                    {Array.from({ length: cols }, (_, colIndex) => {
                      const SeatNumber = rowIndex * cols + colIndex + 1
                      const seat = {
                        seat_number: SeatNumber,
                        seat_type: SeatType.single_seat
                      }
                      return (
                        <Seat
                          key={colIndex}
                          isBooked={reservedSeats.some((s) => s.seat_number === SeatNumber && s.status === 'COMPLETE')}
                          isReserved={reservedSeats.some((s) => s.seat_number === SeatNumber && s.status === 'PENDING')}
                          isSelected={selectedSeats.some((s) => s.seat_number === SeatNumber)}
                          onSelect={() => toggleSeat(seat)}
                          SeatNumber={SeatNumber}
                        />
                      )
                    })}
                  </div>
                ))}
                <div className='mt-4 flex'>
                  {Array.from({ length: 3 }, (_, index) => {
                    const SeatNumber = totalSeats + index + 1
                    const seat = {
                      seat_number: SeatNumber,
                      seat_type: SeatType.double_seat
                    }
                    return (
                      <Seat
                        key={index}
                        isBooked={reservedSeats.some((s) => s.seat_number === SeatNumber && s.status === 'COMPLETE')}
                        isReserved={reservedSeats.some((s) => s.seat_number === SeatNumber && s.status === 'PENDING')}
                        isSelected={selectedSeats.some((s) => s.seat_number === SeatNumber)}
                        onSelect={() => toggleSeat(seat)}
                        isDoubleSeat={true}
                        SeatNumber={SeatNumber}
                      />
                    )
                  })}
                </div>
                <div className='my-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white md:text-base xl:gap-8'>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-[#252A31] sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'>
                      X
                    </div>
                    {t('booked')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-red-500 sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('reserved-seat')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-primary sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('your-chosen-seat')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-[#252A31] sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('regular-seat')}
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='flex aspect-square w-4 items-center justify-center rounded-[4px] bg-tertiary/80 sm:w-6 xl:h-8 xl:w-8 xl:rounded-[8px]'></div>
                    {t('double-seat')}
                  </div>
                </div>
              </div>
              <div className='m-1'>
                <div>
                  <Combo type='Combo' items={combos} setCombo={setCombo} />
                </div>
                <div>
                  <Combo type={t('drink')} items={drinks} setCombo={setCombo} />
                </div>
                <div>
                  <Combo type={t('popcorn')} items={popcorns} setCombo={setCombo} />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-8 flex w-full flex-wrap items-center justify-between gap-y-4 text-white'>
            <div>
              <p className='mb-2'>
                {t('selected-seats')}:{' '}
                <span className='font-semibold'>
                  {selectedSeats.map((s) => seatArray[s.seat_number - 1]).join(', ')}
                </span>
              </p>
              <p className='mb-2'>
                {t('selected-combo')}:{' '}
                <span className='font-semibold'>
                  {combo.map((c) => `${c.name} (Số lượng: ${c.quantity})`).join(', ')}
                </span>
              </p>
              <p>
                {t('total-amount')}:{' '}
                <span className='font-semibold'>{`${formatCurrency(total + totalCombo)} ${t('vnd')}`}</span>
              </p>
            </div>
            <div className='flex w-full items-center justify-center gap-2 xl:w-auto'>
              <Button
                onClick={() => navigate(-1)}
                className='inline-flex h-10 items-center justify-center rounded-full border bg-transparent px-8 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              >
                {t('back')}
              </Button>
              <Button
                isLoading={createBookingMutation.isLoading}
                disabled={createBookingMutation.isLoading || Boolean(!selectedSeats.length)}
                onClick={handlePayment}
                className='inline-flex h-10 items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium transition duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
              >
                {t('payment')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTickets
