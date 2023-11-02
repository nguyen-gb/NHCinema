import { Cinema } from 'src/types/cinema.type'

export const setCinemaToLS = (cinema: Cinema) => {
  localStorage.setItem('cinema', JSON.stringify(cinema))
}

export const getCinemaFromLS = () => {
  const result = localStorage.getItem('cinema')
  return result ? JSON.parse(result) : null
}

export const setLanguageToLS = (lan: string) => {
  localStorage.setItem('language', JSON.stringify(lan))
}

export const getLanguageFromLS = () => {
  const result = localStorage.getItem('language')
  return result ? JSON.parse(result) : null
}
