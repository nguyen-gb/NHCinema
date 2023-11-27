import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import path from 'src/constants/path'

type FormData = Pick<Schema, 'otp' | 'password' | 'confirm_password'>
const schemaLogin = schema.pick(['otp', 'password', 'confirm_password'])

export default function ForgotPassConfirm() {
  const { _id } = useParams()
  const { t } = useTranslation('login')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })

  const forgotPassMutation = useMutation({
    mutationFn: (body: FormData) => authApi.forgotPassConfirm({ ...body, user_id: _id as string })
  })
  const onSubmit = handleSubmit((body) => {
    console.log(body)
    forgotPassMutation.mutate(body, {
      onSuccess: () => {
        navigate(path.login)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{t('forgot-password')} | NHCinema</title>
        <meta name='description' content={t('forgot-password-des')} />
      </Helmet>
      <div className='container text-quaternary'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-4 lg:col-start-4'>
            <form className='rounded-[15px] bg-white p-10 shadow-ct shadow-white/30' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('forgot-password')}</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='OTP'
                name='otp'
                register={register}
                errorMessage={errors.otp?.message}
              />
              <Input
                className='mt-2'
                classNameInputCustom='pr-[34px]'
                type='password'
                placeholder={t('password')}
                name='password'
                register={register}
                errorMessage={errors.password?.message}
                autoComplete='on'
                classNameEye='absolute right-[12px] top-[12px] h-5 w-5 cursor-pointer'
              />
              <Input
                className='mt-2'
                classNameInputCustom='pr-[34px]'
                type='password'
                placeholder={t('confirm-password')}
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
                classNameEye='absolute right-[12px] top-[12px] h-5 w-5 cursor-pointer'
              />
              <div className='mt-2'>
                <Button
                  isLoading={forgotPassMutation.isLoading}
                  disabled={forgotPassMutation.isLoading}
                  type='submit'
                  className='flex w-full items-center justify-center rounded-[15px] bg-primary bg-opacity-70 px-2 py-4 text-center text-sm uppercase text-white hover:cursor-pointer hover:bg-primary'
                >
                  {t('send')}
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <Link to={path.login} className='text-quaternary/50 hover:text-quaternary'>
                  {t('login')}
                </Link>
                <span className='ml-1 text-quaternary'>/</span>
                <Link to={path.register} className='ml-1 text-quaternary/50 hover:text-quaternary'>
                  {t('register')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
