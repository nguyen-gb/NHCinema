import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import paymentApi from 'src/apis/payment.api'
import path from 'src/constants/path'
import { seatArray } from 'src/constants/product'
import { PaymentParams } from 'src/types/payment.type'
import { formatCurrency } from 'src/utils/utils'

export default function PaymentDetailNoLogin() {
  const { t } = useTranslation('payment-detail')
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)

  const params: PaymentParams = {
    vnp_Amount: searchParams.get('vnp_Amount') ?? '',
    vnp_BankCode: searchParams.get('vnp_BankCode') ?? '',
    vnp_BankTranNo: searchParams.get('vnp_BankTranNo') ?? '',
    vnp_CardType: searchParams.get('vnp_CardType') ?? '',
    vnp_OrderInfo: searchParams.get('vnp_OrderInfo') ?? '',
    vnp_PayDate: searchParams.get('vnp_PayDate') ?? '',
    vnp_ResponseCode: searchParams.get('vnp_ResponseCode') ?? '',
    vnp_TmnCode: searchParams.get('vnp_TmnCode') ?? '',
    vnp_TransactionNo: searchParams.get('vnp_TransactionNo') ?? '',
    vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus') ?? '',
    vnp_TxnRef: searchParams.get('vnp_TxnRef') ?? '',
    vnp_SecureHash: searchParams.get('vnp_SecureHash') ?? ''
  }

  const { data, isLoading } = useQuery({
    queryKey: ['payment', { ...params }],
    queryFn: () => paymentApi.confirmPayment(params)
  })

  // if (data && !data.data.data) {
  //   navigate(path.home)
  // }
  return (
    <div className='bg-white'>
      <Helmet>
        <title>{t('payment-detail')} | NHCinema</title>
        <meta name='description' content={t('payment-detail-des')} />
      </Helmet>
      <div className='container'>
        {isLoading && (
          <div className='flex flex-col items-center justify-center gap-6 py-[40px]'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]'>
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
            <h2 className='text-center text-xl font-semibold text-quaternary'>{t('processing-your-payment')}</h2>
            <p className='w-1/3 text-center text-quaternary'>{t('payment-wait')}</p>
          </div>
        )}
        {!isLoading && data && (
          <div className='flex flex-col items-center justify-center bg-white p-10'>
            <div className='flex flex-col items-center justify-center gap-6 bg-primary p-4 text-white'>
              <span className='text-center text-xl font-bold uppercase'>{t('congratulation')}</span>
              <span className='text-center'>{t('congratulation-des')}</span>
              <div className='flex w-full items-center justify-center bg-white p-6 text-quaternary'>
                <div className='grid grid-cols-2 gap-10'>
                  <div className='col-span-1 text-left'>
                    <p className='mb-1'>{t('booking_id')}:</p>
                    <p className='mb-1'>{t('orderer')}:</p>
                    <p className='mb-1'>{t('cinema')}:</p>
                    <p className='mb-1'>{t('room')}:</p>
                    <p className='mb-1'>{t('movie-name')}:</p>
                    <p className='mb-1'>{t('showtime')}:</p>
                    <p className='mb-1'>{t('seat')}:</p>
                    <p className='mb-1'>Combo:</p>
                    <p className='mb-1'>{t('total')}:</p>
                  </div>
                  <div className='col-span-1 flex flex-col text-left'>
                    <strong className='mb-1'>{data.data.data._id}</strong>
                    <strong className='mb-1'>{data.data.data.user_name}</strong>
                    <strong className='mb-1'>{data.data.data.theater_name}</strong>
                    <strong className='mb-1'>{data.data.data.room_number}</strong>
                    <strong className='mb-1'>{data.data.data.movie_name}</strong>
                    <strong className='mb-1'>{`${data.data.data.showtime} ${data.data.data.time}`}</strong>
                    <strong className='mb-1'>
                      {data.data.data.seats.map((s) => seatArray[Number(s.seat_number) - 1]).join(', ')}
                    </strong>
                    <strong className='mb-1'>
                      {data.data.data.combos.length > 0
                        ? data.data.data.combos.map((combo) => `${combo.name} (${combo.quantity})`).join(', ')
                        : '-'}
                    </strong>
                    <strong className='mb-1'>
                      {formatCurrency(data.data.data.total_amount)} {t('vnd')}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
