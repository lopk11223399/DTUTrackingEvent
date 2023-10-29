import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

//import ImageModal from "./ImageModal";
const EventDetail = () => {
  const location = useLocation();
  const { event } = location.state || {};
  console.log("event", event);

  //   const [expandedImageUrl, setExpandedImageUrl] = useState(null);

  //   const handleImageClick = (imageUrl) => {
  //     setExpandedImageUrl(imageUrl);
  //   };

  //   const closeImageModal = () => {
  //     setExpandedImageUrl(null);
  //   };
  return (
    <div>
      <h1 className="my-2 mx-5 uppercase text-zinc-500 text-3xl">
        Chi tiết sự kiện
      </h1>
      <div className="pl-5 pr-5 max-h-[100vh] overflow-x-auto">
        <div className="flex justify-between">
          <div className="basis-[70%]">
            <h1 className=" font-bold text-[18px]">{event.title}</h1>
          </div>
          <div className="">
            <form action="" method="post">
              <label
                className="text-[#4E73DF] font-semibold"
                htmlFor="lang-select"
              >
                Trạng thái:
              </label>
              <select name="lang" id="lang-select">
                <option value="daduyet">Đã Duyệt</option>
                <option value="Choduyet">Chờ Duyệt</option>
                <option value="huy">Hủy</option>
              </select>
              {/* <button type="submit">Gửi</button> */}
            </form>
          </div>
        </div>
        <div className="flex">
          <div className="flex font-bold">
            <span>Ngày bắt đầu:</span>
            <h2>29/09/2023</h2>
          </div>
          <div className="flex font-bold ml-12">
            <span>Ngày kết thúc:</span>
            <h2>1/10/2023</h2>
          </div>
        </div>
        <div className="flex ">
          <img
            className=" rounded-xl  h-[320px] object-cover basis-[40%]"
            src={event.image}
            alt=""
          />
          <div className="basis-[60%] h-[320px] bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-xl ml-4 ">
            <h2 className=" font-bold text-[20px] text-[#4E73DF] py-2 px-3">
              Thông tin
            </h2>
            <div className="">
              <div className="grid gap-[10px] pl-4 ">
                <div>
                  <span className="mr-2">Loại sự kiện:</span>
                  <Link>Online</Link>
                </div>
                <div className="flex  items-center">
                  <span className="mr-2">Mã QR:</span>
                  <img
                    className="w-[50px] "
                    src="data:image/png;base64,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"
                    alt=""
                    // onClick={() =>
                    //   handleImageClick(
                    //     "data:image/png;base64,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"
                    //   )
                    // }
                  />
                  {/* <ImageModal
                    imageUrl={expandedImageUrl}
                    closeModal={closeImageModal}
                  ></ImageModal> */}
                </div>
                <div>
                  <span className="mr-2">Điểm:</span>
                  <span>+20</span>
                </div>
                <div>
                  <span className="mr-2">Số người tham gia:</span>
                  <span>50/100</span>
                </div>
                <div>
                  <span className="mr-2">Địa điểm:</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center pt-1">
                  <span>Người tổ chức:</span>
                  <img
                    className="w-[46px] h-[46px] ml-2 mr-2 rounded-full object-cover"
                    src="https://vnn-imgs-f.vgcloud.vn/2020/07/14/10/honda-dream-viet-12-nam-tuoi-bien-so-vip-2.jpg"
                    alt=""
                  />
                  <h3 className="text-[#4E73DF] font-semibold">
                    Nguyễn Đình Lợi
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-4 pt-4 ">
          <h2 className="font-bold text-[20px]">Mô tả</h2>
          <span className="">{event.description}</span>
        </div>
        <div className="mb-4">
          <span className="font-bold text-2xl text-blue-600">Phản hồi</span>
          <div className="flex mt-2">
            <div className="mr-4 w-12 h-12">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://vnn-imgs-f.vgcloud.vn/2020/07/14/10/honda-dream-viet-12-nam-tuoi-bien-so-vip-2.jpg"
                alt=""
              />
            </div>
            <div className="max-w-[calc(100%-70px)]">
              <div className="flex items-center">
                <span className="block font-semibold  text-[#4E73DF]">
                  Nguyễn Đình lợi
                </span>
                <div className="gap-[2px] ml-2 text-amber-400 flex">
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                </div>
              </div>
              <h2 className="text-sm line-clamp-3 ">
                gian với chương trình Gemini 8. Liên Xô muốn chứng minh họ có
                thể làm được điều đó với cấp độ khó hơn. Nhiệm vụ Liên Xô đề ra
                năm 1967 là họ sẽ phóng tàu Soyuz-1 chở Komarov lên không gian.
                Ngày hôm sau, tàu Soyuz-2 chở theo hai phi hành gia khác sẽ được
                phóng. Khi hai phương tiện kết nối, Komarov thực hiện cuộc đi bộ
                ngoài không gian để đổi chỗ với một đồng nghiệp và trở về Trái
                Đất trên tàu Soyuz-2. Các nhà thiết kế tàu vũ trụ Liên Xô gấp
                rút chuẩn bị cho việc phóng Soyuz-1 và Soyuz-2, dù nhà thiết kế
                hàng đầu Sergei Korolev đã qua đời vào năm 1966. Theo trang
                Russia Beyond, dự án do hãng thông tấn nhà nước Nga RIA Novosti
                thành lập, sự vội vã đã dẫn đến bi kịch.
              </h2>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="mr-4 w-12 h-12">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://vnn-imgs-f.vgcloud.vn/2020/07/14/10/honda-dream-viet-12-nam-tuoi-bien-so-vip-2.jpg"
                alt=""
              />
            </div>
            <div className="max-w-[calc(100%-70px)]">
              <div className="flex items-center">
                <span className="block font-semibold  text-[#4E73DF]">
                  Nguyễn Đình lợi
                </span>
                <div className="gap-[2px] ml-2 text-amber-400 flex">
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                </div>
              </div>
              <h2 className="text-sm line-clamp-3 ">
                gian với chương trình Gemini 8. Liên Xô muốn chứng minh họ có
                thể làm được điều đó với cấp độ khó hơn. Nhiệm vụ Liên Xô đề ra
                năm 1967 là họ sẽ phóng tàu Soyuz-1 chở Komarov lên không gian.
                Ngày hôm sau, tàu Soyuz-2 chở theo hai phi hành gia khác sẽ được
                phóng. Khi hai phương tiện kết nối, Komarov thực hiện cuộc đi bộ
                ngoài không gian để đổi chỗ với một đồng nghiệp và trở về Trái
                Đất trên tàu Soyuz-2. Các nhà thiết kế tàu vũ trụ Liên Xô gấp
                rút chuẩn bị cho việc phóng Soyuz-1 và Soyuz-2, dù nhà thiết kế
                hàng đầu Sergei Korolev đã qua đời vào năm 1966. Theo trang
                Russia Beyond, dự án do hãng thông tấn nhà nước Nga RIA Novosti
                thành lập, sự vội vã đã dẫn đến bi kịch.
              </h2>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="mr-4 w-12 h-12">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://vnn-imgs-f.vgcloud.vn/2020/07/14/10/honda-dream-viet-12-nam-tuoi-bien-so-vip-2.jpg"
                alt=""
              />
            </div>
            <div className="max-w-[calc(100%-70px)]">
              <div className="flex items-center">
                <span className="block font-semibold  text-[#4E73DF]">
                  Nguyễn Đình lợi
                </span>
                <div className="gap-[2px] ml-2 text-amber-400 flex">
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                </div>
              </div>
              <h2 className="text-sm line-clamp-3 ">
                gian với chương trình Gemini 8. Liên Xô muốn chứng minh họ có
                thể làm được điều đó với cấp độ khó hơn. Nhiệm vụ Liên Xô đề ra
                năm 1967 là họ sẽ phóng tàu Soyuz-1 chở Komarov lên không gian.
                Ngày hôm sau, tàu Soyuz-2 chở theo hai phi hành gia khác sẽ được
                phóng. Khi hai phương tiện kết nối, Komarov thực hiện cuộc đi bộ
                ngoài không gian để đổi chỗ với một đồng nghiệp và trở về Trái
                Đất trên tàu Soyuz-2. Các nhà thiết kế tàu vũ trụ Liên Xô gấp
                rút chuẩn bị cho việc phóng Soyuz-1 và Soyuz-2, dù nhà thiết kế
                hàng đầu Sergei Korolev đã qua đời vào năm 1966. Theo trang
                Russia Beyond, dự án do hãng thông tấn nhà nước Nga RIA Novosti
                thành lập, sự vội vã đã dẫn đến bi kịch.
              </h2>
            </div>
          </div>
          <div className="flex mt-2">
            <div className="mr-4 w-12 h-12">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src="https://vnn-imgs-f.vgcloud.vn/2020/07/14/10/honda-dream-viet-12-nam-tuoi-bien-so-vip-2.jpg"
                alt=""
              />
            </div>
            <div className="max-w-[calc(100%-70px)]">
              <div className="flex items-center">
                <span className="block font-semibold  text-[#4E73DF]">
                  Nguyễn Đình lợi
                </span>
                <div className="gap-[2px] ml-2 text-amber-400 flex">
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                  <AiFillStar></AiFillStar>
                </div>
              </div>
              <h2 className="text-sm line-clamp-3 ">
                gian với chương trình Gemini 8. Liên Xô muốn chứng minh họ có
                thể làm được điều đó với cấp độ khó hơn. Nhiệm vụ Liên Xô đề ra
                năm 1967 là họ sẽ phóng tàu Soyuz-1 chở Komarov lên không gian.
                Ngày hôm sau, tàu Soyuz-2 chở theo hai phi hành gia khác sẽ được
                phóng. Khi hai phương tiện kết nối, Komarov thực hiện cuộc đi bộ
                ngoài không gian để đổi chỗ với một đồng nghiệp và trở về Trái
                Đất trên tàu Soyuz-2. Các nhà thiết kế tàu vũ trụ Liên Xô gấp
                rút chuẩn bị cho việc phóng Soyuz-1 và Soyuz-2, dù nhà thiết kế
                hàng đầu Sergei Korolev đã qua đời vào năm 1966. Theo trang
                Russia Beyond, dự án do hãng thông tấn nhà nước Nga RIA Novosti
                thành lập, sự vội vã đã dẫn đến bi kịch.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
