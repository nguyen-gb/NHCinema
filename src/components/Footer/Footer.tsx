import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-quaternary py-8 text-[#9E9E9E] md:py-16'>
      <div className='container'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-3 flex flex-col items-center lg:col-span-1 lg:block'>
            <Link to='/'>
              <div className='w-fit bg-gradient-to-r from-primary to-tertiary bg-clip-text text-xl font-bold text-transparent lg:text-2xl'>
                NHCinema
              </div>
            </Link>
            <p className='text-md mt-2 text-center hover:text-white sm:text-xl lg:text-left lg:text-lg'>
              Hotline: <span className='font-bold'>+84 (0) 123 456 789</span>
            </p>
            <p className='text-md mt-2 text-center  hover:text-white sm:text-xl lg:text-left lg:text-lg'>
              Email: <span className='font-bold'>nhcinema@gmail.com</span>
            </p>
            <p className='text-md mt-2 text-center  hover:text-white sm:text-xl lg:text-left lg:text-lg'>
              Giờ làm việc: <span className='font-bold'>8h00-22h00 tất cả các ngày trong tuần</span>
            </p>
          </div>
          <div className='col-span-3 mt-2 lg:col-span-2'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <div className='uppercase text-white'>DỊCH VỤ</div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='/' className='cursor-pointer transition-colors hover:text-white'>
                      Câu Hỏi Thường Gặp
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='/' className='cursor-pointer transition-colors hover:text-white'>
                      Hướng Dẫn Đặt Vé Online
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='uppercase text-white'>KẾT NỐI VỚI CHÚNG TÔI</div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='https://www.facebook.com/' className='cursor-pointer transition-colors hover:text-white'>
                      Facebook
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='https://www.instagram.com/' className='cursor-pointer transition-colors hover:text-white'>
                      Instagram
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='https://www.youtube.com/' className='cursor-pointer transition-colors hover:text-white'>
                      Youtube
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
                <div className='mt-2 flex flex-col'>
                  <div className='group w-fit'>
                    <Link to='https://twitter.com/' className='cursor-pointer transition-colors hover:text-white'>
                      Twitter
                      <div className='h-[1px] w-full origin-right scale-x-0 bg-white transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100'></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-10 h-[0.5px] w-full bg-gradient-to-r from-primary to-tertiary'></div>
        <p className='mt-6 text-center hover:text-white'>(c) 2023 NHCinema. All copyrights reserved.</p>
      </div>
    </footer>
  )
}
