import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarURL } from 'src/utils/utils'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div className='mt-10 text-white'>
      <h3 className='mb-10 text-center text-2xl font-bold'>Thông tin cá nhân</h3>
      <div className='flex flex-wrap items-center justify-center gap-4' role='tablist' aria-orientation='horizontal'>
        <NavLink
          to='/user/profile'
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to='/user/purchase'
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          Lịch sử mua vé
        </NavLink>
        <NavLink
          to='/user/reward-points'
          className={({ isActive }) =>
            classNames(
              'inline-flex h-10 items-center justify-center rounded-full px-8 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
              {
                'bg-primary': isActive,
                'border bg-transparent hover:bg-gray-700': !isActive
              }
            )
          }
        >
          Lịch sử điểm thưởng
        </NavLink>
      </div>
    </div>
  )
}
