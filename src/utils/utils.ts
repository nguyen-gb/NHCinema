import axios, { AxiosError } from 'axios'

import { DayOfWeek } from 'src/constants/date'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { SeatType } from 'src/types/seat.type'
import { ErrorResponse } from 'src/types/utils.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data.message === 'jwt expired'
  )
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function formatDateToString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export function formatDateToStringWithTime(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formattedDateTime = `${hours}:${minutes} ${day}-${month}-${year}`
  return formattedDateTime
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `@${id}`
}

export const getIdFromMovieId = (nameId: string) => {
  const arr = nameId.split('@')
  return arr[arr.length - 1]
}

export const isTodayShowTime = (date: string) => {
  const currentDate = new Date()
  const targetDate = new Date(date)
  if (
    currentDate.getDate() === targetDate.getDate() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  ) {
    return true
  } else {
    return false
  }
}

export function getCurrentDayOfWeek(): DayOfWeek {
  return new Date().getDay() as DayOfWeek
}

export function calculateTicketPrice(seatType: SeatType): number {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)
  const format = url.searchParams.get('format')

  const dayOfWeek = getCurrentDayOfWeek()

  const regularSeatPrices = {
    0: 80000,
    1: format === '2D' ? 60000 : 70000,
    2: format === '2D' ? 55000 : 60000,
    3: format === '2D' ? 60000 : 70000,
    4: format === '2D' ? 60000 : 70000,
    5: 80000,
    6: 80000
  }

  const doubleSeatPrices = {
    0: format === '2D' ? 175000 : 180000,
    1: format === '2D' ? 135000 : 160000,
    2: format === '2D' ? 120000 : 140000,
    3: format === '2D' ? 135000 : 160000,
    4: format === '2D' ? 135000 : 160000,
    5: format === '2D' ? 175000 : 180000,
    6: format === '2D' ? 175000 : 180000
  }

  if (seatType === SeatType.single_seat) {
    return regularSeatPrices[dayOfWeek]
  } else if (seatType === SeatType.double_seat) {
    return doubleSeatPrices[dayOfWeek]
  } else {
    throw new Error('Invalid seat type')
  }
}
