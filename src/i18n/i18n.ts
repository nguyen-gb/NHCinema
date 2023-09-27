import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import HEADER_EN from 'src/locales/en/header.json'
import LOGIN_EN from 'src/locales/en/login.json'
import HOME_EN from 'src/locales/en/home.json'

import HEADER_VN from 'src/locales/vn/header.json'
import LOGIN_VN from 'src/locales/vn/login.json'
import HOME_VN from 'src/locales/vn/home.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    header: HEADER_EN,
    login: LOGIN_EN,
    home: HOME_EN
  },
  vi: {
    header: HEADER_VN,
    login: LOGIN_VN,
    home: HOME_VN
  }
}

export const defaultNS = 'header'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['header', 'login', 'home'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
