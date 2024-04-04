import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import userApi from 'src/apis/user.api'
import BonusPointsDetail from 'src/pages/User/components/BonusPointsDetail'
import { PointHistory } from 'src/types/user.type'

export default function BonusPoints() {
  const { t } = useTranslation('user')
  const [bonusPoints, setBonusPoints] = useState<PointHistory | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['bonuspoint'],
    queryFn: () => userApi.getHistoryBonusPoints()
  })
  const hisBonusPoints = data?.data.data

  const openPopup = (bonusPoints: PointHistory) => {
    setBonusPoints(bonusPoints)
    setIsOpen(true)
  }

  const closePopup = () => {
    setIsOpen(false)
    setBonusPoints(null)
  }

  return (
    <div>
      <Helmet>
        <title>{t('bonus-points')} | NHCinema</title>
        <meta name='description' content={t('bonus-points-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div className='mt-4 min-w-full overflow-x-auto ring-1 ring-gray-700 sm:mx-0 sm:rounded-xl'>
              <table className='min-w-full divide-y divide-gray-700'>
                <thead>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('day-trading')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('trading-name')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('score')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    hisBonusPoints &&
                    hisBonusPoints.point_history.map((bonusPoints) => {
                      return (
                        <tr key={bonusPoints._id}>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {moment(bonusPoints.day_trading).format('HH:mm DD/MM/YYYY')}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {bonusPoints.name}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'
                          >
                            {bonusPoints.used_point}
                          </th>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6'
                          >
                            <button onClick={() => openPopup(bonusPoints)}>{t('detail')}</button>
                          </th>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {!isLoading && !data && <div className='py-10 text-center text-sm text-gray-500'>{t('no-data')}</div>}
            </div>
          </div>
        </div>
      </div>
      <BonusPointsDetail isOpen={isOpen} bonusPoints={bonusPoints as PointHistory} onClose={closePopup} />
    </div>
  )
}
