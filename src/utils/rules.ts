import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'required-field'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'rule-email'
    },
    maxLength: {
      value: 160,
      message: 'rule-length'
    },
    minLength: {
      value: 6,
      message: 'rule-length'
    }
  },
  password: {
    required: {
      value: true,
      message: 'required-field'
    },
    maxLength: {
      value: 160,
      message: 'rule-length'
    },
    minLength: {
      value: 6,
      message: 'rule-length'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'required-field'
    },
    maxLength: {
      value: 160,
      message: 'rule-length'
    },
    minLength: {
      value: 6,
      message: 'rule-length'
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'rule-confirm-pass' : undefined
  }
})

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('required-field')
    .min(6, 'rule-length')
    .max(160, 'rule-length')
    .oneOf([yup.ref(refString)], 'rule-confirm-pass')
}

export const schema = yup.object({
  name: yup.string().required('required-field'),
  email: yup.string().required('required-field').email('rule-email').min(6, 'rule-length').max(160, 'rule-length'),
  phone: yup.string().required('required-field'),
  otp: yup.string().required('required-field'),
  password: yup.string().required('required-field').min(6, 'rule-length').max(160, 'rule-length'),
  confirm_password: handleConfirmPasswordYup('password'),
  movie: yup.string().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'name-length'),
  phone: yup.string().max(20, 'phone-length'),
  email: yup.string().required('required-field').email('rule-email').min(6, 'rule-length').max(160, 'rule-length'),
  address: yup.string().max(160, 'address-length'),
  avatar: yup.string().max(1000, 'avatar-length'),
  date_of_birth: yup.date().max(new Date(), 'rule-day-of-birth'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password'),
  gender: yup.string()
})

const loginSchema = schema.omit(['confirm_password'])

export const movieSchema = yup.object({
  movie: yup.string().required()
})

export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type UserSchema = yup.InferType<typeof userSchema>
export type MovieSchema = yup.InferType<typeof movieSchema>
