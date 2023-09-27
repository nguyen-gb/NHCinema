import { Link, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function RegisterHeader() {
  const { t } = useTranslation()
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='bg-quaternary py-5'>
      <div className='container'>
        <nav className='flex items-end'>
          <Link to='/'>
            <div className='bg-gradient-to-r from-tertiary to-primary bg-clip-text text-xl font-bold text-transparent lg:text-2xl'>
              NHCinema
            </div>
          </Link>
          <div className='ml-5 text-xl text-white lg:text-2xl'>{isRegister ? t('register') : t('login')}</div>
        </nav>
      </div>
    </header>
  )
}
