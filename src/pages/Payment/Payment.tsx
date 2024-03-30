import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'

import bookingApi from 'src/apis/booking.api'
import { formatCurrency } from 'src/utils/utils'
import { seatArray } from 'src/constants/product'
import paymentApi from 'src/apis/payment.api'
import { SeatExchangePoint, SeatType } from 'src/types/seat.type'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import { Combo } from 'src/types/combo.type'

export default function Payment() {
  const { t } = useTranslation('payment')
  const { bookingId } = useParams()
  const [totalPointRegularSeat, setTotalPointRegularSeat] = useState(0)
  const [totalPointDoubleSeat, setTotalPointDoubleSeat] = useState(0)
  const [totalPointCombo, setTotalPointCombo] = useState(0)
  const [totalAmountRegularSeat, setTotalAmountRegularSeat] = useState(0)
  const [totalAmountDoubleSeat, setTotalAmountDoubleSeat] = useState(0)

  const [regularSeatExchange, setRegularSeatExchange] = useState<
    {
      seat_number: string
    }[]
  >([])
  const [doubleSeatExchange, setDoubleSeatExchange] = useState<
    {
      seat_number: string
    }[]
  >([])

  const [combosExchange, setCombosExchange] = useState<Combo[]>([])
  const [quantityCombosExchange, setQuantityCombosExchange] = useState<{ [combo_id: string]: number }>({})
  const [pointCombosExchange, setPointCombosExchange] = useState<{ [combo_id: string]: number }>({})

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => bookingApi.getBookingDetail(bookingId as string),
    onError: () => {
      navigate(path.home)
    }
  })

  const bookingData = data?.data.data
  const userPoint = bookingData?.exchange_point ?? 0

  const regularSeat = useMemo(() => {
    return bookingData?.seats.filter((seat) => seat.seat_type === SeatType.single_seat) ?? []
  }, [bookingData])

  const doubleSeat = useMemo(() => {
    return bookingData?.seats.filter((seat) => seat.seat_type === SeatType.double_seat) ?? []
  }, [bookingData])

  const combos = bookingData?.combos ?? []

  const createPaymentUrlMutation = useMutation({
    mutationFn: paymentApi.createPaymentUrl,
    onSuccess: (res) => {
      window.location.href = res.data.data
    }
  })

  const usePointMutation = useMutation({
    mutationFn: bookingApi.usePoint,
    onSuccess: () => {
      handlePayment()
    }
  })

  const handleAddRegularSeatExchange = () => {
    if (
      userPoint >= totalPointRegularSeat + totalPointDoubleSeat + totalPointCombo + SeatExchangePoint.single_seat &&
      regularSeatExchange.length < regularSeat.length
    ) {
      const seat_number = regularSeat[regularSeatExchange.length].seat_number
      setRegularSeatExchange((pre) => [...pre, { seat_number: String(seat_number) }])
      setTotalPointRegularSeat((pre) => pre + SeatExchangePoint.single_seat)
      setTotalAmountRegularSeat((pre) => pre - (regularSeat[regularSeatExchange.length].price as number))
    }
  }

  const handleRemoveRegularSeatExchange = () => {
    if (regularSeatExchange.length > 0) {
      const seat_number = regularSeat[regularSeatExchange.length - 1].seat_number
      setRegularSeatExchange((pre) => {
        return pre.filter((seat) => seat.seat_number !== seat_number)
      })
      setTotalPointRegularSeat((pre) => pre - SeatExchangePoint.single_seat)
      setTotalAmountRegularSeat((pre) => pre + (regularSeat[regularSeatExchange.length - 1].price as number))
    }
  }

  const handleAddDoubleSeatExchange = () => {
    if (
      userPoint >= totalPointRegularSeat + totalPointDoubleSeat + totalPointCombo + SeatExchangePoint.double_seat &&
      doubleSeatExchange.length < doubleSeat.length
    ) {
      const seat_number = doubleSeat[doubleSeatExchange.length].seat_number
      setDoubleSeatExchange((pre) => [...pre, { seat_number: String(seat_number) }])
      setTotalPointDoubleSeat((pre) => pre + SeatExchangePoint.double_seat)
      setTotalAmountDoubleSeat((pre) => pre - (doubleSeat[doubleSeatExchange.length].price as number))
    }
  }

  const handleRemoveDoubleSeatExchange = () => {
    if (doubleSeatExchange.length > 0) {
      const seat_number = doubleSeat[doubleSeatExchange.length - 1].seat_number
      setDoubleSeatExchange((pre) => {
        return pre.filter((seat) => seat.seat_number !== seat_number)
      })
      setTotalPointDoubleSeat((pre) => pre - SeatExchangePoint.double_seat)
      setTotalAmountDoubleSeat((pre) => pre + (doubleSeat[doubleSeatExchange.length - 1].price as number))
    }
  }

  const handleAddCombosExchange = (item: Combo) => {
    if (
      userPoint >= totalPointRegularSeat + totalPointDoubleSeat + totalPointCombo + item.exchange_point &&
      (combosExchange.filter((c) => c._id === item._id)[0]?.quantity ?? 0) <
        combos.filter((c) => c._id === item._id)[0].quantity
    ) {
      setCombosExchange((pre) => {
        const existsInArray = pre.some((combo) => combo._id === item._id)
        if (existsInArray) {
          return pre.map((combo) => {
            if (item._id === combo._id) {
              return {
                ...combo,
                quantity: combo.quantity + 1
              }
            }
            return combo
          })
        } else {
          return [
            ...pre,
            {
              ...item,
              quantity: 1
            }
          ]
        }
      })
      setTotalPointCombo((pre) => pre + item.exchange_point)
    }
  }

  const handleRemoveCombosExchange = (item: Combo) => {
    if (combosExchange.filter((c) => c._id === item._id).length > 0) {
      setCombosExchange((pre) => {
        const existsInArray = pre.some((combo) => combo._id === item._id && combo.quantity > 1)
        if (existsInArray) {
          return pre.map((combo) => {
            if (item._id === combo._id) {
              return {
                ...combo,
                quantity: combo.quantity - 1
              }
            }
            return combo
          })
        } else {
          return pre.filter((combo) => item._id !== combo._id)
        }
      })
      setTotalPointCombo((pre) => pre - item.exchange_point)
    }
  }

  const handleUsePoint = () => {
    if (regularSeatExchange.length > 0 || doubleSeatExchange.length > 0 || combosExchange.length > 0) {
      const body = {
        booking_id: bookingId as string,
        seats: [...regularSeatExchange, ...doubleSeatExchange],
        combos: combosExchange.map((combo) => {
          return {
            combo_id: combo._id,
            quantity: combo.quantity
          }
        })
      }
      usePointMutation.mutate(body)
    } else {
      handlePayment()
    }
  }

  const handlePayment = () => {
    createPaymentUrlMutation.mutate({
      booking_id: bookingId as string
    })
  }

  useEffect(() => {
    const quantities: { [combo_id: string]: number } = {}
    combosExchange.forEach((combo) => {
      quantities[combo._id] = combo.quantity
    })
    setQuantityCombosExchange(quantities)

    const points: { [combo_id: string]: number } = {}
    combosExchange.forEach((combo) => {
      points[combo._id] = combo.exchange_point * combo.quantity
    })
    setPointCombosExchange(points)
  }, [combosExchange])

  useEffect(() => {
    setTotalAmountRegularSeat(regularSeat.reduce((sum, seat) => sum + (seat.price as number), 0))
    setTotalAmountDoubleSeat(doubleSeat.reduce((sum, seat) => sum + (seat.price as number), 0))
  }, [regularSeat, doubleSeat])

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('payment')} | NHCinema</title>
        <meta name='description' content={t('payment-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='flex flex-wrap gap-5 xl:flex-nowrap'>
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
              </div>
              <div className='mt-5 space-y-6 rounded-2xl bg-[#1A1D23] p-4 text-sm md:p-6 md:text-base'>
                <h4 className='font-bold'>{t('billing-infor')}</h4>
                <div>
                  <div className='mt-4 overflow-x-auto rounded-xl ring-1 ring-gray-700 sm:mx-0'>
                    <table className='min-w-full divide-y divide-gray-600'>
                      <thead>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {t('category')}
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            {t('quantity')}
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            {t('total-amount')}
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            {t('quantity-converted-by-point')}
                          </th>
                          <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-white'>
                            {t('total-point')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {regularSeat && regularSeat.length > 0 && (
                          <tr>
                            <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='font-medium text-white'>
                                {t('regular-seat')} (
                                {regularSeat.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')})
                              </div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>{regularSeat.length}</td>
                            <td className='px-3 py-3.5 text-sm'>
                              {formatCurrency(totalAmountRegularSeat)}
                              {t('vnd')}
                            </td>
                            <td className='px-3 py-3.5 text-sm'>
                              <div className='flex space-x-4'>
                                <button
                                  type='button'
                                  className='rounded-sm bg-primary text-white'
                                  onClick={handleRemoveRegularSeatExchange}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                                  </svg>
                                </button>
                                <span className='font-bold text-white'>{regularSeatExchange.length}</span>
                                <button
                                  type='button'
                                  className='rounded-sm bg-primary text-white'
                                  onClick={handleAddRegularSeatExchange}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>
                              {regularSeatExchange.length * SeatExchangePoint.single_seat}
                            </td>
                          </tr>
                        )}
                        {doubleSeat && doubleSeat?.length > 0 && (
                          <tr>
                            <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                              <div className='font-medium text-white'>
                                {t('double-seat')} (
                                {doubleSeat.map((seat) => seatArray[Number(seat.seat_number) - 1]).join(', ')})
                              </div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>{doubleSeat.length}</td>
                            <td className='px-3 py-3.5 text-sm'>
                              {formatCurrency(totalAmountDoubleSeat)}
                              {t('vnd')}
                            </td>
                            <td className='px-3 py-3.5 text-sm'>
                              <div className='flex space-x-4'>
                                <button
                                  type='button'
                                  className='rounded-sm bg-primary text-white'
                                  onClick={handleRemoveDoubleSeatExchange}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                                  </svg>
                                </button>
                                <span className='font-bold text-white'>{doubleSeatExchange.length}</span>
                                <button
                                  type='button'
                                  className='rounded-sm bg-primary text-white'
                                  onClick={handleAddDoubleSeatExchange}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                  >
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className='px-3 py-3.5 text-sm'>
                              {doubleSeatExchange.length * SeatExchangePoint.double_seat}
                            </td>
                          </tr>
                        )}
                        {combos.length > 0 &&
                          combos.map((combo) => {
                            return (
                              <tr key={combo._id}>
                                <td className='relative py-4 pl-4 pr-3 text-sm sm:pl-6'>
                                  <div className='font-medium text-white'>{combo.description}</div>
                                </td>
                                <td className='px-3 py-3.5 text-sm'>{combo.quantity}</td>
                                <td className='px-3 py-3.5 text-sm'>
                                  {formatCurrency(
                                    (combo.quantity - (quantityCombosExchange[combo._id] ?? 0)) * combo.price
                                  )}
                                  {t('vnd')}
                                </td>
                                <td className='px-3 py-3.5 text-sm'>
                                  <div className='flex space-x-4'>
                                    <button
                                      type='button'
                                      className='rounded-sm bg-primary text-white'
                                      onClick={() => handleRemoveCombosExchange(combo)}
                                    >
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                      >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
                                      </svg>
                                    </button>
                                    <span className='font-bold text-white'>
                                      {quantityCombosExchange[combo._id] ?? 0}
                                    </span>
                                    <button
                                      type='button'
                                      className='rounded-sm bg-primary text-white'
                                      onClick={() => handleAddCombosExchange(combo)}
                                    >
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                      >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                                <td className='px-3 py-3.5 text-sm'>{pointCombosExchange[combo._id] ?? 0}</td>
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
                      {formatCurrency(bookingData?.total_amount ?? 0)}
                      {t('vnd')}
                    </p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>Fee (0%)</p>
                    <p className='font-bold'>0{t('vnd')}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <p>{t('total')}</p>
                    <p className='font-bold'>
                      {formatCurrency(bookingData?.total_amount ?? 0)}
                      {t('vnd')}
                    </p>
                  </div>
                </div>
                <div className='space-y-3'>
                  <Button
                    isLoading={createPaymentUrlMutation.isLoading}
                    disabled={createPaymentUrlMutation.isLoading}
                    onClick={handleUsePoint}
                    className='inline-flex h-10 w-full items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium transition-all hover:scale-105 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none'
                  >
                    {t('payment')}
                  </Button>
                  <Button
                    onClick={() => navigate(-1)}
                    className='inline-flex h-10 w-full items-center justify-center rounded-full border px-8 py-2 text-sm font-medium transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                  >
                    {t('back')}
                  </Button>
                  <div className='mx-auto mt-4 text-center text-sm text-red-500'>
                    <b>{t('note')}:</b> {t('note-des')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
