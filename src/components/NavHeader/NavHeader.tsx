import path from 'src/constants/path'
import Popover from '../Popover'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import authApi from 'src/apis/auth.api'
import { purchasesStatus } from 'src/constants/purchase'
import { getAvatarURL } from 'src/utils/utils'
import { locales } from 'src/i18n/i18n'
import useSearchProducts from 'src/hooks/useSearchProducts'

export default function NavHeader() {
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const { onSubmitSearch, register } = useSearchProducts()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    console.log(i18n.language)
  }

  return (
    <div className='flex items-center justify-between'>
      <Link to='/'>
        <div className='w-fit bg-gradient-to-r from-primary to-tertiary bg-clip-text text-xl font-bold text-transparent lg:text-2xl'>
          NHCinema
        </div>
      </Link>
      <form className='col-span-9' onSubmit={onSubmitSearch}>
        <div className='flex rounded-full border-2 border-primary bg-white p-1'>
          <input
            type='text'
            className='flex-grow rounded-full border-none bg-transparent px-3 py-1 text-black outline-none'
            placeholder='Tìm kiếm'
            {...register('name')}
          />
          <button className='flex-shrink-0 rounded-full bg-primary px-4 py-1 hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </div>
      </form>
      <div className='flex'>
        <Popover
          className='flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div className='relative rounded-[10px] border border-gray-200 bg-transparent/80 shadow-md'>
              <div className='flex flex-col py-2 pr-8 text-white'>
                <button className='px-4 py-2 text-left hover:text-primary' onClick={() => changeLanguage('vi')}>
                  Tiếng Việt
                </button>
                <button className='mt-2 px-4 py-2 text-left hover:text-primary' onClick={() => changeLanguage('en')}>
                  English
                </button>
              </div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='mx-1'>{currentLanguage}</span>
          {/* <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg> */}
        </Popover>
        {isAuthenticated && (
          <Popover
            className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
            renderPopover={
              <div className='relative rounded-[10px] border border-gray-200 bg-transparent/80 text-white shadow-md'>
                <Link to={path.profile} className='block w-full py-3 pl-4 pr-8 text-left hover:text-primary'>
                  Thông tin tài khoản
                </Link>
                {/* <Link
                  to={path.historyPurchase}
                  className='block w-full bg-white py-3 pl-4 pr-8 text-left hover:text-primary'
                >
                  Lịch sử mua vé
                </Link> */}
                <button onClick={handleLogout} className='block w-full py-3 pl-4 pr-8 text-left hover:text-primary'>
                  Đăng xuất
                </button>
              </div>
            }
          >
            {/* <div className='mr-2 h-5 w-5 flex-shrink-0'>
              <img
                src={getAvatarURL(profile?.avatar)}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div> */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            <div className='flex text-base'>{profile?.name || profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
              Đăng ký
            </Link>
            <div className='h-4 border-r-[1px] border-r-white/40 '></div>
            <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
