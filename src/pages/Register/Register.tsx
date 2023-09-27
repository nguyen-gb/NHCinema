import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const schemaRegister = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { t } = useTranslation('login')
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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
        <title>{t('register')} | NHCinema</title>
        <meta name='description' content='Đăng ký tài khoản dự án Shopee Clone' />
      </Helmet>
      <div className='container text-quaternary'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-10 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-4 lg:col-start-4'>
            <form className='rounded-[15px] bg-white p-10 shadow-ct shadow-white/30' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>{t('register')}</div>
              <Input
                className='mt-6'
                type='email'
                placeholder={t('email')}
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
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
                classNameInputCustom='pr-[34px]'
                type='password'
                placeholder={t('confirm-password')}
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                autoComplete='on'
                classNameEye='absolute right-[12px] top-[12px] h-5 w-5 cursor-pointer'
              />
              <Button
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
                type='submit'
                className='flex w-full items-center justify-center rounded-[15px] bg-primary bg-opacity-70 px-2 py-4 text-sm uppercase text-white hover:cursor-pointer hover:bg-primary'
              >
                {t('register')}
              </Button>
              <div className='mt-6 flex items-center justify-center'>
                <Link to='/password/reset' className='text-quaternary/50 hover:text-quaternary'>
                  {t('forgot-password')}
                </Link>
                <span className='ml-1 text-quaternary'>/</span>
                <Link to='/login' className='ml-1 text-quaternary/50 hover:text-quaternary'>
                  {t('login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
