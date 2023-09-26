import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { convert } from 'html-to-text'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { VscDebugStart } from 'react-icons/vsc'
import classNames from 'classnames'
import VideoPopup from 'src/components/VideoPopup'

export default function ProductDetail() {
  const { t } = useTranslation('product')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [buyCount, setBuyCount] = useState(1)
  const [idCinema, setIdCinema] = useState('Cinema Võ Văn Ngân')

  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const imageRef = useRef<HTMLImageElement>(null)

  const queryConfig: ProductListConfig = { page: '1', limit: '20', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  const addToCartMutation = useMutation(purchaseApi.addToCart)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 1) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image

    //Cách 1: Lấy offsetX, offsetY đơn giản khi xử lý được bubble event
    const { offsetX, offsetY } = event.nativeEvent

    //Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    //const offsetX = event.pageX - (rect.x + window.scrollX)
    //const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalWidth / rect.width)
    const left = offsetX * (1 - naturalHeight / rect.height)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.width = 'unset'

    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 2000 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  const openVideoPopup = () => {
    setIsVideoOpen(true)
  }

  const closeVideoPopup = () => {
    setIsVideoOpen(false)
  }

  const handleSelectCinema = (event: any) => {
    setIdCinema(event.target.value)
  }

  if (!product) return null
  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>{product.name} | NHCinema</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-12'>
          <div className='relative col-span-12'>
            <div className='relative'>
              <img
                className='w-full object-contain'
                src='https://touchcinema.com/storage/slider-app/2048x858-01.png'
                alt=''
              />
              <div className='absolute bottom-0 left-0 right-0 top-0 bg-quaternary/70'>
                <div className='flex h-[80%] w-full items-center justify-center'>
                  <button className='h-[80px] w-[80px] cursor-pointer rounded-full bg-primary' onClick={openVideoPopup}>
                    <VscDebugStart className='h-full w-full scale-75 text-white' />
                  </button>
                </div>
              </div>
            </div>
            <div className='relative mt-[-200px] grid grid-cols-12 p-[15px]'>
              <div className='col-span-3'>
                <img
                  src='https://touchcinema.com/uploads/phim-2021/1200x1800-01-poster.jpg'
                  alt=''
                  className='h-full w-full border-2 border-white object-cover'
                />
              </div>
              <div className='col-span-9 bg-transparent p-[15px] text-white'>
                <h1 className='mt-[20px] text-2xl font-semibold uppercase text-primary'>
                  Shin - Cậu Bé Bút Chì: Đại Chiến Siêu Năng Lực ~Sushi Bay~ (Lồng Tiếng)
                </h1>
                <h2 className='mt-2 text-2xl uppercase'>
                  CRAYON SHINCHAN: BATTLE OF SUPERNATURAL POWERS ~FLYING SUSHI~
                </h2>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Thời lượng:</strong>
                  94 phút
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Khởi chiếu từ:</strong>
                  Ngày 25/08/2023
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Thể loại:</strong>
                  Hoạt Hình
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Định dạng:</strong>
                  2D
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Đạo diễn:</strong>
                  Hitoshi One
                </p>
                <p className='mt-2 flex'>
                  <strong className='inline-block w-[140px] flex-shrink-0 text-primary'>Diễn viên:</strong>
                  <span className='line-clamp-1'>
                    Yumiko Kobayashi, Miki Narahashi, Aoi Morikawa, Satomi Kourogi, Suzuki Mogura
                  </span>
                </p>
                <p className='mt-2'>
                  <strong className='inline-block w-[140px] text-primary'>Độ tuổi:</strong>
                  <span>P</span>-
                </p>
                <div className='mt-4 flex max-w-fit cursor-pointer items-center justify-center bg-primary px-4 py-2 text-xl uppercase opacity-80 shadow-ct3d transition-all hover:opacity-100'>
                  <img src='https://touchcinema.com/images/icons/icon-ticket.png' alt='' className='mr-2 h-6' />
                  Đặt vé
                </div>
              </div>
              <div className='col-span-12 my-[20px] bg-primary p-[20px] shadow-ct3d'>
                <p className='text-base text-white'>
                  Phim xoay quanh câu chuyện về hai nguồn sáng đặc biệt từ vũ trụ mang theo siêu năng lực đặc biệt tới
                  Trái Đất. Một nguồn sáng tích cực “nhập” vào nhóc Shin, khiến cặp mông núng nính của cậu trở nên nóng
                  bỏng và có khả năng điều khiển những đồ vật xung quanh theo ý muốn. Một thanh niên trẻ khác tên
                  Mitsuru Hiriya cũng nhận được siêu năng lực này. Đồng thời, một nhà khoa học xấu xa khác nhăm nhe ý
                  định lợi dụng siêu năng lực của Hiriya để trở thành bá chủ.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-12 my-[20px] p-[15px] text-white'>
            <div className='mb-[20px] flex items-center justify-between'>
              <p className='max-w-fit border-b-2 pb-2 pl-2 pr-12 text-left text-2xl font-bold'>Lịch chiếu</p>
              <div className='group relative inline-block text-left'>
                <div className='min-w-[200px]'>
                  <span className='rounded-md shadow-sm'>
                    <button
                      type='button'
                      className='inline-flex w-full justify-center rounded-md bg-primary px-6 py-3 text-white'
                    >
                      {idCinema}
                    </button>
                  </span>
                </div>
                <div className='absolute right-0 mt-[1px] hidden min-w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block'>
                  <div className='py-1'>
                    <button
                      onClick={(event) => handleSelectCinema(event)}
                      value='Cinema Võ Văn Ngân'
                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-quaternary'
                    >
                      Cinema Võ Văn Ngân
                    </button>
                    <button
                      onClick={(event) => handleSelectCinema(event)}
                      value='Cinema Bình Thạnh'
                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-quaternary'
                    >
                      Cinema Bình Thạnh
                    </button>
                    <button
                      onClick={(event) => handleSelectCinema(event)}
                      value='Cinema Gò Vấp'
                      className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-quaternary'
                    >
                      Cinema Gò Vấp
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>Hôm nay, ngày 12/9</div>
            <div className='mb-[12px] flex flex-wrap items-center justify-start'>
              <div
                className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                  'cursor-not-allowed bg-quaternary': true,
                  'cursor-pointer bg-primary': false
                })}
              >
                13:15
              </div>
              <div
                className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                  'cursor-not-allowed bg-quaternary': true,
                  'cursor-pointer bg-primary': false
                })}
              >
                13:35
              </div>
            </div>
            <div className='mb-[20px] max-w-fit bg-tertiary px-[20px] py-[8px] font-semibold'>Thứ Tư, ngày 13/9</div>
            <div className='mb-[12px] flex flex-wrap items-center justify-start'>
              <Link
                to='/book-tickets'
                className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                  'cursor-not-allowed bg-quaternary': false,
                  'cursor-pointer bg-primary': true
                })}
              >
                13:35
              </Link>
              <Link
                to='/book-tickets'
                className={classNames('mb-[8px] mr-[8px] rounded-md border border-white px-[20px] py-[8px]', {
                  'cursor-not-allowed bg-quaternary': false,
                  'cursor-pointer bg-primary': true
                })}
              >
                15:15
              </Link>
            </div>
          </div>
        </div>
        <VideoPopup isOpen={isVideoOpen} videoUrl='https://youtu.be/sNQhWlwitr4' onClose={closeVideoPopup} />
      </div>
    </div>
  )
}
