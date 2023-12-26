import React, { useEffect, useState } from "react";
import { status } from "../../utils/contants";
import { BarChart } from "../../components";
import avatarDefault from "../../assets/img/avatarDefault.jpg";
import {
  apiGetEventOfAuthor,
  apiGetFivePeopleHot,
  apiGettotalRateOfAuthor,
} from "../../apis";
import { MdCancelScheduleSend, MdPendingActions } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import { TbRun } from "react-icons/tb";
import { BiBadgeCheck } from "react-icons/bi";

function dashboard() {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0]);
  const [dataUser, setDataUser] = useState([]);
  const [overView, setoverView] = useState({
    pending: 0,
    apply: 0,
    process: 0,
    success: 0,
    close: 0,
  });

  const fetch5PeopleHot = async () => {
    const response = await apiGetFivePeopleHot();
    if (response.success) setDataUser(response.response);
  };

  const fetchTotalRating = async () => {
    const response = await apiGettotalRateOfAuthor();
    if (response.success) {
      let perpect = 0;
      let good = 0;
      let medium = 0;
      let least = 0;
      let bad = 0;

      response?.response?.forEach((el) => {
        if (el.rate === 1) bad = el.totalRate;
        else if (el.rate === 2) least = el.totalRate;
        else if (el.rate === 3) medium = el.totalRate;
        else if (el.rate === 4) good = el.totalRate;
        else if (el.rate === 5) perpect = el.totalRate;
      });

      setChartData([perpect, good, medium, least, bad]);
    }
  };

  const fetchEvent = async () => {
    const response = await apiGetEventOfAuthor();
    if (response.success) {
      let pending = 0;
      let apply = 0;
      let process = 0;
      let success = 0;
      let close = 0;

      response?.response?.forEach((el) => {
        if (el.status === 1) pending = pending + 1;
        else if (el.status === 2) apply = apply + 1;
        else if (el.status === 3) process = process + 1;
        else if (el.status === 4) success = success + 1;
        else if (el.status === 5) close = close + 1;
      });

      setoverView({
        pending: pending,
        apply: apply,
        process: process,
        success: success,
        close: close,
      });
    }
  };

  useEffect(() => {
    fetch5PeopleHot();
    fetchEvent();
    fetchTotalRating();
  }, []);

  return (
    <div className="p-5 flex flex-col gap-[35px]">
      <div className="flex flex-col gap-[29px]">
        <h1 className=" uppercase font-[500] text-[#408A7E] text-3xl mb-1 ">
          dashboard
        </h1>
        <div className="grid grid-cols-5 gap-[14px] px-4 mt-[25px] pb-[15px]">
          <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[16px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
                SỰ KIỆN CHỜ DUYỆT
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {overView.pending}
              </h1>
            </div>
            <MdPendingActions fontSize={28} color="" />
          </div>
          <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[16px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                SỰ KIỆN ĐÃ DUYỆT
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {overView.apply}
              </h1>
            </div>
            <BsCheckAll fontSize={28} />
          </div>
          <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[16px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                SỰ KIỆN ĐÃ HỦY
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {overView.close}
              </h1>
            </div>
            <TbRun fontSize={28} />
          </div>
          <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[16px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                SỰ KIỆN ĐANG DIỄN RA
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {overView.process}
              </h1>
            </div>
            <BiBadgeCheck fontSize={28} />
          </div>
          <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#f63e47] flex items-center justify-between px-[16px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
            <div>
              <h2 className="text-[#413ef6] text-[11px] leading-[17px] font-bold">
                SỰ KIỆN ĐÃ KẾT THÚC
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                {overView.success}
              </h1>
            </div>
            <MdCancelScheduleSend fontSize={28} />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-[30px]">
        <div className="w-[50%] flex flex-col gap-[10px] h-[400px]">
          <h2 className="text-[#000] font-[600] text-[16px]">
            Thống kê sự kiện theo phản hồi
          </h2>
          <div className="bg-white rounded-[8px] p-[20px] flex flex-col justify-center shadow-table_1 flex-1">
            <BarChart chartData={chartData} />
            <div className="flex items-center gap-[10px] justify-around">
              <div className="flex items-center gap-[11px]">
                <div className="w-[12px] h-[12px] bg-[#04B90B] rounded-full" />
                <span className="text-[14px] font-[500] text-[#C2C2C2]">
                  Xuất sắc
                </span>
              </div>
              <div className="flex items-center gap-[11px]">
                <div className="w-[12px] h-[12px] bg-[#106AAB] rounded-full" />
                <span className="text-[14px] font-[500] text-[#C2C2C2]">
                  Tốt
                </span>
              </div>
              <div className="flex items-center gap-[11px]">
                <div className="w-[12px] h-[12px] bg-[#8D31E9] rounded-full" />
                <span className="text-[14px] font-[500] text-[#C2C2C2]">
                  Trung bình
                </span>
              </div>
              <div className="flex items-center gap-[11px]">
                <div className="w-[12px] h-[12px] bg-[#DA9F0A] rounded-full" />
                <span className="text-[14px] font-[500] text-[#C2C2C2]">
                  Kém
                </span>
              </div>
              <div className="flex items-center gap-[11px]">
                <div className="w-[12px] h-[12px] bg-[#EA8484] rounded-full" />
                <span className="text-[14px] font-[500] text-[#C2C2C2]">
                  Tệ
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex flex-col gap-[10px] h-[400px]">
          <h2 className="text-[#000] font-[600] text-[16px]">
            Danh sách thành viên tiêu biểu
          </h2>
          <table className="w-full bg-white rounded-[8px] shadow-table_1">
            <thead>
              <tr className="text-center bg-white shadow-table_1">
                <td className="rounded-l-[8px] text-[14px] font-[600] text-[#B6B6B6] w-[60%] text-start pl-[15%]">
                  Tên
                </td>
                <td className="py-[12px] text-[14px] font-[600] text-[#B6B6B6] w-[20%]">
                  Đã tham gia
                </td>
                <td className="rounded-r-[8px] text-[14px] font-[600] text-[#B6B6B6] w-[20%]">
                  Điểm
                </td>
              </tr>
            </thead>
            <tbody>
              {dataUser?.map((el, index) => (
                <tr key={index}>
                  <td className="py-[12px]">
                    <span className="flex items-center gap-[22px] px-2">
                      <img
                        src={el.userData.avatar || avatarDefault}
                        alt="avatar"
                        className="w-[38px] h-[40px] rounded-full"
                      />
                      <span className="w-[180px] text-start text-[16px] font-[600] text-[#408A7E] line-clamp-1">
                        {el.userData.name}
                      </span>
                    </span>
                  </td>
                  <td className="text-[14px] text-center font-[400] text-[#969696]">
                    {el.eventCount}
                  </td>
                  <td className="text-[14px] text-center font-[400] text-[#969696]">
                    {el.userData.studentData.point}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default dashboard;
