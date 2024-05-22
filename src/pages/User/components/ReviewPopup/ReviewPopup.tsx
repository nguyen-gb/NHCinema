import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import { ConfirmPaymentRes } from 'src/types/payment.type'
import { Review } from 'src/types/user.type'

interface Props {
  isOpen: boolean
  bookingData: ConfirmPaymentRes
  onClose: () => void
  onDone: () => void
}

export default function ReviewPopup({ isOpen, bookingData, onClose, onDone }: Props) {
  const { t } = useTranslation('user')
  const [isReady, setIsReady] = useState(false)
  const [rating, setRating] = useState(1)
  const [review, setReview] = useState('')

  const reviewMutation = useMutation({
    mutationFn: (body: Review) => userApi.reviewMovie(body)
  })

  useEffect(() => {
    setTimeout(() => {
      setIsReady(isOpen)
    }, 200)

    return () => {
      setIsReady(false)
      setRating(1)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsReady(false)

    setTimeout(() => {
      onClose()
    }, 800)
  }

  const handleSubmit = () => {
    const body = {
      booking_id: bookingData._id,
      movie_id: bookingData.movie_id,
      rating: rating,
      review: review
    }
    reviewMutation.mutate(body, {
      onSuccess: () => {
        toast.success(t('review-success'))
        handleClose()
        onDone()
      }
    })
  }

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} className='flex h-full w-full items-center justify-center bg-black/90'>
      <div
        className={classNames(
          'relative max-h-[95%] transform overflow-y-auto transition-all duration-1000 sm:min-w-[600px] lg:min-w-[800px] xl:overflow-y-visible',
          {
            'translate-y-[-150px] opacity-0': !isReady,
            'translate-y-0 opacity-100': isReady
          }
        )}
      >
        <div className='w-full space-y-2 rounded-2xl bg-white p-4 text-sm md:p-6 md:text-base'>
          <h2 className='text-lg font-bold text-primary'>{bookingData?.movie_name}</h2>
          <div className='flex max-w-fit rounded-lg py-2'>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <AiFillStar
                  key={index}
                  color={index + 1 <= rating ? 'yellow' : 'black'}
                  className='h-6 w-6 cursor-pointer'
                  onClick={() => setRating(index + 1)}
                />
              )
            })}
          </div>
          <textarea
            onChange={(e) => setReview(e.target.value)}
            placeholder={`${t('review')}...`}
            className='h-40 w-full rounded-sm border border-gray-500 p-2'
          ></textarea>
          <div className='flex justify-end'>
            <Button
              onClick={handleSubmit}
              isLoading={reviewMutation.isLoading}
              disabled={reviewMutation.isLoading}
              type='submit'
              className='rounded-[15px] bg-primary bg-opacity-70 px-8 py-2 text-center text-sm uppercase text-white hover:cursor-pointer hover:bg-primary'
            >
              {t('send')}
            </Button>
          </div>
        </div>
        <button
          className='absolute right-[1rem] top-[1rem] text-primary xl:right-[-1rem] xl:top-[-1rem]'
          onClick={handleClose}
        >
          <AiOutlineCloseCircle className='h-8 w-8' />
        </button>
      </div>
    </Modal>
  )
}
