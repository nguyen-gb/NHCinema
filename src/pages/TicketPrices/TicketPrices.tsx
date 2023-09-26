import classNames from 'classnames'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

export default function TicketPrices() {
  const [is2D, setIs2D] = useState(true)
  const [is3D, setIs3D] = useState(false)
  const [isHoliday, setIsHoliday] = useState(false)

  const handleChangeType = (type: number) => {
    if (type === 2) {
      setIs2D(false)
      setIs3D(true)
      setIsHoliday(false)
    } else if (type === 3) {
      setIs2D(false)
      setIs3D(false)
      setIsHoliday(true)
    } else {
      setIs2D(true)
      setIs3D(false)
      setIsHoliday(false)
    }
  }

  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>Bảng giá xem phim | NHCinema</title>
        <meta name='description' content='Bảng giá xem phim 2D, 3D và ngày lễ tại rạp chiếu phim NHCinema' />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px] transition-all'>
          <div className='mb-[10px] text-lg uppercase text-primary'>Giá Vé rạp NHCinema</div>
          <div className='flex items-end justify-start transition-all'>
            <button
              onClick={() => handleChangeType(1)}
              className={classNames('mr-1 cursor-pointer rounded-md px-6 text-xl uppercase text-white transition-all', {
                'bg-primary py-4': is2D,
                'bg-tertiary py-2': !is2D
              })}
            >
              Giá vé 2D
            </button>
            <button
              onClick={() => handleChangeType(2)}
              className={classNames('mr-1 cursor-pointer rounded-md px-6 text-xl uppercase text-white transition-all', {
                'bg-primary py-4': is3D,
                'bg-tertiary py-2': !is3D
              })}
            >
              Giá vé 3D
            </button>
            <button
              onClick={() => handleChangeType(3)}
              className={classNames(
                'mr-1 cursor-pointer rounded-md px-6  text-xl uppercase text-white transition-all',
                {
                  'bg-primary py-4': isHoliday,
                  'bg-tertiary py-2': !isHoliday
                }
              )}
            >
              Ngày lễ
            </button>
          </div>
          <div className='my-2 h-[1px] w-full bg-gradient-to-r from-primary to-tertiary'></div>
          {is2D && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slider-tv/z4045880677164-1ba77b4619d45e773581092b6319ac62.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <p className='mb-2'>
                  <strong>Ghi chú:</strong>
                </p>
                <p className='mb-2'>
                  - Bảng giá trên áp dụng cho khách hàng có thẻ thành viên, khách hàng không có thẻ thành viên phụ thu
                  10.000đ/vé đối với ghế thường, 20.000đ/vé đối với ghế đôi
                </p>
                <p className='mb-2'>
                  - Bảng giá trên áp dụng cho suất chiếu thông thường, suất chiếu sớm (suất chiếu đặc biệt, suất chiếu
                  sneakshow) phụ thu 10.000đ/vé đối với ghế thường, 20.000đ/vé đối với ghế đôi
                </p>
                <p className='mb-2'>
                  - Giá vé khi đặt vé trực tuyến trên website và ứng dụng NHCinema là giá vé người lớn
                </p>
                <p className='mb-2'>
                  - Giá vé học sinh, sinh viên được áp dụng cho người từ 22 tuổi trở xuống khi mua vé tại quầy
                </p>
                <p className='mb-2'>
                  - Giá vé trẻ em, người cao tuổi, đối tượng ưu tiên áp dụng cho trẻ em, người từ 60 tuổi trở lên, người
                  có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn và các đối tượng khác theo quy định của
                  pháp luật khi mua vé tại quầy
                </p>
                <p className='mb-2'>
                  - Người khuyết tật đặc biệt nặng được miễn giá vé, người khuyết tật nặng được giảm 50% giá vé khi mua
                  vé tại quầy
                </p>
                <p className='mb-2'>
                  - Khách hàng khi đến rạp xem phim vui lòng chứng thực được độ tuổi phù hợp với phim, được quy định căn
                  cứ vào Thông tư số 12/2015/TT-BVHTTDL của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch có hiệu lực thi
                  hành từ ngày 01/01/2017. NHCinema có quyền từ chối việc bán vé hoặc vào phòng chiếu nếu khách hàng
                  không tuân thủ đúng theo quy định.
                </p>
              </div>
            </>
          )}
          {is3D && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slide-web/z3998808944858-ecbdc76834918b00c5fd6f4a796926dd.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <ul>
                  <li className='mb-2'>
                    - Suất chiếu sớm / Suất chiếu đặc biệt: theo quy định của hãng phim và nhà phát hành thì suất chiếu
                    sớm / suất chiếu đặc biệt có phụ thu 10.000 đồng so với giá vé của suất chiếu đã khởi chiếu chính
                    thức
                  </li>
                  <li className='mb-2'>
                    - Khách hàng khi đến rạp xem phim vui lòng chứng thực được độ tuổi phù hợp với phim, được quy định
                    căn cứ vào Thông tư số 12/2015/TT-BVHTTDL của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch có hiệu lực
                    thi hành từ ngày 01/01/2017. NHCinema có quyền từ chối việc bán vé hoặc vào phòng chiếu nếu khách
                    hàng không tuân thủ đúng theo quy định.
                  </li>
                </ul>
              </div>
            </>
          )}
          {isHoliday && (
            <>
              <div className='mb-4 w-full'>
                <img
                  src='https://touchcinema.com/storage/slide-web/z4103264955341-3bb1395fb3108359cda4af45aee336f4.jpg'
                  alt=''
                  className='w-full object-cover'
                />
              </div>
              <div className='text-base'>
                <p className='mb-2'>
                  <strong>Ghi chú: </strong>
                </p>
                <p className='mb-2'>
                  - Giá vé ngày Lễ áp dụng vào: 01/01, 14/02, 08/03, 10/03 Âm lịch, 30/04, 01/05, 02/09, 20/10, 24/12 và
                  ngày nghỉ bù của người lao động theo quy định của pháp luật
                </p>
                <p className='mb-2'>
                  - Bảng giá trên áp dụng cho khách hàng có thẻ thành viên, khách hàng không có thẻ thành viên phụ thu
                  10.000đ/vé đối với ghế thường, 20.000đ/vé đối với ghế đôi
                </p>
                <p className='mb-2'>
                  - Bảng giá trên áp dụng cho suất chiếu thông thường, suất chiếu sớm (suất chiếu đặc biệt, suất chiếu
                  sneakshow) phụ thu 10.000đ/vé đối với ghế thường, 20.000đ/vé đối với ghế đôi
                </p>
                <p className='mb-2'>
                  - Giá vé khi đặt vé trực tuyến trên website và ứng dụng NHCinema là giá vé người lớn
                </p>
                <p className='mb-2'>
                  - Giá vé học sinh, sinh viên được áp dụng cho người từ 22 tuổi trở xuống khi mua vé tại quầy
                </p>
                <p className='mb-2'>
                  - Giá vé trẻ em, người cao tuổi, đối tượng ưu tiên áp dụng cho trẻ em, người từ 60 tuổi trở lên, người
                  có công với cách mạng, người có hoàn cảnh đặc biệt khó khăn và các đối tượng khác theo quy định của
                  pháp luật khi mua vé tại quầy
                </p>
                <p className='mb-2'>
                  - Người khuyết tật đặc biệt nặng được miễn giá vé, người khuyết tật nặng được giảm 50% giá vé khi mua
                  vé tại quầy
                </p>
                <p className='mb-2'>
                  - Khách hàng khi đến rạp xem phim vui lòng chứng thực được độ tuổi phù hợp với phim, được quy định căn
                  cứ vào Thông tư số 12/2015/TT-BVHTTDL của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch có hiệu lực thi
                  hành từ ngày 01/01/2017. NHCinema có quyền từ chối việc bán vé hoặc vào phòng chiếu nếu khách hàng
                  không tuân thủ đúng theo quy định.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
