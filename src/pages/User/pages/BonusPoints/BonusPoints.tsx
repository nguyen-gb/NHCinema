import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import userApi from 'src/apis/user.api'

export default function BonusPoints() {
  const { t } = useTranslation('user')

  const { data } = useQuery({
    queryKey: ['bonuspoint'],
    queryFn: () => userApi.getHistoryBonusPoints()
  })

  const hisBonusPoints = data?.data.data

  return (
    <div>
      <Helmet>
        <title>{t('bonus-points')} | NHCinema</title>
        <meta name='description' content={t('bonus-points-des')} />
      </Helmet>
      <div className='container text-white'>
        <div className='my-[40px]'>
          <div className='mt-10'>
            <div className='mt-4 ring-1 ring-gray-700 sm:mx-0 sm:rounded-xl'>
              <table className='min-w-full divide-y divide-gray-700'>
                <thead>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('day-trading')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('transaction-type')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('trading-name')}
                    </th>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6'>
                      {t('score')}
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div className='py-10 text-center text-sm text-gray-500'>{t('no-data')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
