import { Helmet } from 'react-helmet-async'

export default function Member() {
  return (
    <div className='bg-secondary'>
      <Helmet>
        <title>Bảng giá xem phim | NHCinema</title>
        <meta name='description' content='Bảng giá xem phim 2D, 3D và ngày lễ tại rạp chiếu phim NHCinema' />
      </Helmet>
      <div className='container'>
        <div className='flex flex-col justify-start bg-white/95 p-[20px] leading-[1.6] transition-all'>
          <div className='mb-4 text-3xl text-primary'>
            Chương trình thành viên NHCinema Membership | Tích điểm và đổi thưởng
          </div>
          <strong className='mb-2 uppercase text-primary'>
            THỂ LỆ VÀ QUY ĐỊNH VỀ CHƯƠNG TRÌNH THÀNH VIÊN NHCinema
          </strong>
          <strong className='mb-2 text-primary'>1. Cách đăng ký để trở thành khách hàng thành viên NHCinema</strong>
          <ul className='mb-2'>
            <li>
              <span className='text-red-500'>
                <strong>* Nơi đăng ký bắt buộc: Quầy vé NHCinema </strong>
              </span>
              <em>
                <strong>
                  <span className='uppercase text-quaternary'>(LÀM THẺ HOÀN TOÀN MIỄN PHÍ)</span>
                </strong>
              </em>
            </li>
            <li>* Thông tin đăng ký cần có: Họ và tên, Số điện thoại, Số CMND, Ngày sinh</li>
            <li>* 1 SĐT/CMND chỉ đăng ký được duy nhất 1 tài khoản/1 thẻ thành viên với 1 mã số duy nhất</li>
            <li>* Tài khoản được quyền sử dụng ngay</li>
            <li>* Trong trường hợp mất thẻ thành viên cần mang CMND đến quầy để làm lại thẻ</li>
          </ul>
          <strong className='uppercase'>ĐỂ KÍCH HOẠT THÀNH VIÊN ONLINE VÀ MUA VÉ VỚI GIÁ ƯU ĐÃI:</strong>
          <p>
            - Tài khoản online đăng ký số điện thoại<strong>&nbsp;trùng</strong>&nbsp;với số điện thoại mà bạn đã đăng
            ký THẺ THÀNH VIÊN (trùng cả về đầu số).
          </p>
          <p className='mb-2'>
            - Số điện thoại của tài khoản online phải <strong>được xác thực</strong> trong mục TÀI KHOẢN online.
          </p>
          <p>
            <strong>
              <span className='text-primary'>2. Hướng dẫn thể lệ tích điểm</span>
            </strong>
          </p>
          {/* <div className='w-full mt-[20px]'>
            <img
              src='https://touchcinema.com/storage/tichdiem-3112-02-1.png'
              alt=''
              className='h-full w-full object-cover'
            ></img>
          </div> */}
          <p className='my-2'>
            <strong>1.000 đồng = 1 điểm</strong>
          </p>
          <p>
            Bạn có thể dễ dàng kiểm tra điểm của mình trên Website NHCinema hoặc Ứng dụng NHCinema trên điện thoại (Với
            điều kiện phải thực hiện kích hoạt thành viên online)
          </p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>Touch Member (điểm tích lũy từ 0 – 3499 điểm).</li>
            </ul>
          </em>
          <p>Khách hàng đăng kí mới khi hoàn tất thanh toán giao dịch đầu tiên được cộng ngay 100 điểm</p>
          <p>Cộng điểm đổi thưởng thêm 3% số tiền chi tiêu cho bắp nước và 5% số tiền chi tiêu cho vé</p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>Touch Vip (điểm tích lũy từ 3500 – 7999 điểm).</li>
            </ul>
          </em>
          <p>Khách hàng lên hạng thẻ VIP được tặng 1 combo (1 nước ngọt + 1 bắp ngọt) và 3 vé xem phim 2D.</p>
          <p>Cộng điểm đổi thưởng thêm 3% số tiền chi tiêu cho bắp nước và 7% số tiền chi tiêu cho vé</p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>Touch Diamond (điểm tích lũy từ 8000 điểm trở lên).</li>
            </ul>
          </em>
          <p>Khách hàng lên hạng thẻ Diamond được tặng 2 combo [2 x (1 nước ngọt + 1 bắp ngọt)] và 5 vé xem phim 2D.</p>
          <p>Cộng điểm đổi thưởng thêm 5% số tiền chi tiêu cho bắp nước và 10% số tiền chi tiêu cho vé</p>
          <p className='my-4'>
            <strong>
              Khách hàng thành viên được tự động nâng hạng khi đủ điểm lên hạng mà không cần phải đợi xét duyệt vào cuối
              năm như các rạp khác. Khách hàng cần đến quầy đổi thẻ theo cấp hạng mới để được nhận quà trước khi số điểm
              bị reset vào cuối năm.
            </strong>
          </p>
          <p className='mb-4'>
            Hạng thẻ của năm tiếp theo sẽ được tính dựa trên điểm tích lũy năm nay (tính tại thời điểm 31/12 hàng năm)
          </p>
          <p>
            <strong>
              <span className='text-primary'>3. Quà sinh nhật thành viên</span>
            </strong>
          </p>
          <p className='mt-2'>
            <strong>
              Thay lời chúc mừng đến quý khách hàng, NHCinema xin dành tặng bạn món quà nhân dịp sinh nhật của mình
            </strong>
          </p>
          <em>
            <ul className='mt-2 list-disc pl-[20px] font-medium'>
              <li>Quà tặng</li>
            </ul>
          </em>
          <p className='pl-[10px]'>- Touch Member: 1 combo (1 nước ngọt + 1 bắp ngọt)</p>
          <p className='pl-[10px]'>- Touch VIP: 1 combo (2 nước ngọt + 1 bắp ngọt) và 1 vé xem phim 2D</p>
          <p className='pl-[10px]'>- Touch Diamond: 1 combo (2 nước ngọt + 1 bắp ngọt) và 2 vé xem phim 2D</p>
          <ul className='my-2'>
            <li>* Thời gian nhận quà sinh nhật dành cho khách hàng: Trong vòng 10 ngày kể từ ngày sinh nhật.</li>
            <li>* Khách hàng thành viên nhận quà sinh nhật trực tiếp tại rạp</li>
            <li>
              * Chỉ những thành viên có ít nhất 1 giao dịch trong năm và trước thời điểm nhận quà mới được nhận phần quà
              sinh nhật từ NHCinema
            </li>
            <li>
              * Khách hàng vui lòng xuất trình giấy tờ tuỳ thân (CMND/…) tương ứng với tài khoản thành viên để nhận quà
            </li>
            <li>* Quà sinh nhật có giá trị sử dụng 1 tháng kể từ ngày sinh nhật</li>
            <li>* Nếu có nhu cầu đổi vị bắp, bạn vui lòng thanh toán thêm khoản phụ thu</li>
            <li>* Phần quà sinh nhật không có giá trị quy đổi thành tiền mặt</li>
          </ul>
          <p>
            <strong>
              <span className='text-primary'>4. Điều kiện sử dụng điểm</span>
            </strong>
          </p>
          <div className='my-2 w-full'>
            <img
              src='https://touchcinema.com/storage/tichdiem-3112-01.png'
              alt=''
              className='h-full w-full object-cover'
            />
          </div>
          <p className='mb-2'>
            <strong>
              Điểm tích lũy là điểm dùng để xét cấp bậc hạng thẻ. Điểm thưởng là điểm dùng để đổi các phần quà tương ứng
              với số điểm.
            </strong>
          </p>
          <ul>
            <li>* Khi đổi thưởng, điểm tích lũy sẽ vẫn được giữ nguyên, chỉ có điểm thưởng bị trừ đi</li>
            <li>
              * Điểm thành viên bao gồm điểm tích lũy và điểm thưởng chỉ có giá trị sử dụng trong năm. Toàn bộ điểm sẽ
              được reset về 0 vào 23h59’ ngày 31/12 hàng năm.
            </li>
            <li>* Khách hàng thành viên có thể sử dụng điểm thưởng để đổi các phần quà tương ứng như sau:</li>
          </ul>
          <ul className='my-2 list-disc pl-[30px]'>
            <li>450 điểm &nbsp;= 1 nước Aquafina</li>
            <li>500 điểm = 1 nước ngọt</li>
            <li>550 điểm = 1 nước ngọt lớn</li>
            <li>700 điểm = 1 bắp ngọt</li>
            <li>800 điểm &nbsp;= 1 bắp phô mai/ caramel</li>
            <li>1100 điểm = 1 nước ngọt + 1 bắp ngọt</li>
            <li>1150 điểm = 1 nước ngọt lớn + 1 bắp ngọt</li>
            <li>1200 điểm = 1 nước ngọt + 1 bắp phô mai/ caramel</li>
            <li>1250 điểm = 1 nước ngọt lớn + 1 bắp phô mai/ caramel</li>
            <li>1500 điểm = 2 nước ngọt + 1 bắp ngọt</li>
            <li>1600 điểm = 2 nước ngọt + 1 bắp phô mai/ caramel HOẶC 2 nước ngọt lớn + 1 bắp ngọt</li>
            <li>1700 điểm = 2 nước ngọt lớn + 1 bắp phô mai/ caramel</li>
            <li>
              <strong>1000 điểm = 1 vé 2D</strong>
            </li>
            <li>
              <strong>1200 điểm = 1 vé 3D</strong>
            </li>
          </ul>
          <ul>
            <li>* Quà tặng quy đổi từ điểm thưởng chỉ có giá trị sử dụng trong ngày thực hiện đổi</li>
            <li>* Quà tặng được đổi tại quầy hoặc đổi online ngay trong giao dịch</li>
            <li>* Không quy đổi quà ra tiền mặt hay chuyển nhượng sang tài khoản khác.</li>
            <li>* Thành viên phải cung cấp CMND hoặc thẻ thành viên để nhận quà.</li>
            <li>
              * Thông tin chương trình, quà thưởng và các ưu đãi dành cho thành viên có thể được thay đổi và cập nhật
              thường xuyên mà không báo trước.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
