import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";

import { PolarArea, Bar, Doughnut } from "react-chartjs-2";
import { apiGetChart, apiGetEvents, apiUser } from "../../apis";
import { FaRegCalendarMinus } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = () => {
  const [data, setData] = useState([]);
  const [params] = useSearchParams();
  const [overView, setoverView] = useState({
    pending: 0,
    apply: 0,
    process: 0,
    success: 0,
    close: 0,
  });

  const fetchEvent = async () => {
    const response = await apiGetEvents();
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
    const fetchData = async () => {
      const response = await apiGetChart({ year: "2023" });
      if (response.success) {
        setData(response.response);
      }
    };
    fetchEvent();
    fetchData();
  }, []);

  const dataChart = {
    labels: data.map((month) => `Tháng ${month.month}`),
    datasets: [
      {
        label: "Số lượng sự kiện theo tháng",
        data: data.map((total) => total.totalEvent),
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(54, 162, 235)",
          "rgba(153, 102, 255)",
          "rgba(201, 203, 207)",
          "rgba(200, 100, 255)",
          "rgba(100, 50, 200)",
          "rgba(100, 150, 100)",
          "rgba(220, 100, 0)",
          "rgba(0, 100, 220)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const dataChart1 = {
    labels: ["Chờ duyệt", "Đã duyệt", "Đã hủy", "Đang diễn ra", "Đã kết thúc"],
    datasets: [
      {
        label: "Trạng thái sự kiện",
        data: [
          overView.pending,
          overView.apply,
          overView.close,
          overView.process,
          overView.success,
        ],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64)",
          "rgba(255, 205, 86)",
          "rgba(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Tắt hiển thị legend (header)
        maintainAspectRatio: false,
      },
    },
  };
  //console.log(userData);
  return (
    <div>
      <h1 className="m-2 ml-4 uppercase text-zinc-500 text-3xl">Thống kê</h1>
      <div className="flex">
        <div className="basis-[45%] flex">
          <h1 className="pl-4 pt-1 font-[500] text-[#408A7E] ">
            Tổng số sinh viên:
          </h1>
          <span className="pt-1">5</span>
        </div>
        <div className="basis-[55%]">
          <h1 className="pl-2 pt-1 font-[500] text-[#408A7E] ">
            Tổng sự kiện theo tháng
          </h1>
        </div>
      </div>
      <div className="flex ">
        <div className="basis-[45%] ml-4 mr-4 bg-[#fff]   shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] h-[300px]">
          <div className="w-full h-full">
            <PolarArea
              data={dataChart}
              options={{ maintainAspectRatio: false }}
            ></PolarArea>
          </div>
        </div>
        <div className="basis-[55%] mr-4 bg-[#fff]   shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] h-[300px] ">
          <div className="w-full h-full pl-1">
            <Bar className="" data={dataChart} options={options}></Bar>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="basis-[60%] ml-4 mr-4 ">
          <div className="flex justify-between ">
            <h2 className=" font-bold text-[20px] text-[#408A7E]">
              Trạng thái sự kiện
            </h2>
            <Link
              to="/admin/manage-event"
              className="bg-[#408A7E] text-[#fff] items-center pt-[5px] pr-[10px] pb-[5px] pl-[10px] rounded-md mb-2"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="w-full bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] p-4 ">
            <div className=" overflow-x-auto h-[570px]">
              <div className="w-full h-full">
                <Doughnut
                  data={dataChart1}
                  options={{ maintainAspectRatio: false }}
                ></Doughnut>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[40%] mr-4  ">
          <div className="flex justify-between ">
            <h2 className=" font-bold text-[20px] text-[#408A7E] ml-1 mb-2">
              Chi tiết
            </h2>
          </div>
          <div className=" bg-[#fff] grid gap-5 max-h-[610px] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] p-4 ">
            <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#408A7E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN CHỜ DUYỆT
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {overView.pending}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN ĐÃ DUYỆT
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {overView.apply}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#36B9CC] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN ĐÃ HỦY
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {overView.close}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#F6C23E] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN ĐANG DIỄN RA
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {overView.process}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#f63e47] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#413ef6] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN ĐÃ KẾT THÚC
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  {overView.success}
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
