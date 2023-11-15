import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";

import { PolarArea, Bar } from "react-chartjs-2";
import { apiGetChart, apiUser } from "../../apis";
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
  const [data1, setData1] = useState([]);
  const [params] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetChart({ year: "2023" });
      if (response.success) {
        setData(response.response);
      }
    };

    fetchData();
  }, []);
  //console.log(data);
  const [userData, setUserData] = useState([]);
  const fetchData = async (queries) => {
    //console.log(queries);
    const response = await apiUser({
      limit: 10,
      page: queries.page,
      order: ["createdAt", "DESC"],
      ...queries,
    });

    if (response.success) {
      setUserData(response.response.rows);
    }
  };
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchData({ ...queries });
  }, [params]);
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
          <h1 className="pl-2 pt-1 font-[500] text-[#408A7E]">
            Tổng sự kiện theo tháng
          </h1>
          <div className="w-full h-full">
            <Bar data={dataChart} options={options}></Bar>
          </div>
        </div>
      </div>
      <div className="flex mt-4">
        <div className="basis-[60%] ml-4 mr-4 ">
          <div className="flex justify-between ">
            <h2 className=" font-bold text-[20px] text-[#408A7E]">
              Danh sách sinh viên
            </h2>
            <Link
              to="/admin/manage-users"
              className="bg-[#408A7E] text-[#fff] items-center pt-[5px] pr-[10px] pb-[5px] pl-[10px] rounded-md"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="w-full bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] p-4 ">
            <div className=" overflow-x-auto max-h-[460px]">
              <table className="w-full  ">
                <thead className="text-center text-[#408A7E]">
                  <tr>
                    <td className="pr-9">ID</td>
                    <td>Ảnh</td>
                    <td>Họ & Tên</td>
                    <td>Giới tính</td>
                    <td>Vai trò</td>
                    <td>Số points</td>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {userData.length > 0 &&
                    userData.map((user, index) => (
                      <tr key={user.id}>
                        <td className="pr-9">{index + 1}</td>
                        <td className="w-[50px] ">
                          <img
                            className="w-[50px] h-[50px] rounded-full object-cover"
                            src="https://vtv1.mediacdn.vn/zoom/640_400/2022/12/19/221218184732-messi-wc-trophy-16714338650611943125261-crop-1672061255342223645900.jpg"
                            alt=""
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.gender === 1 ? "Nam" : "Nữ"}</td>
                        <td>
                          {user.roleId === 2
                            ? "Người tạo sự kiện"
                            : "Người dùng"}
                        </td>
                        <td>{user.studentData.point}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="basis-[40%] mr-4  ">
          <div className="flex justify-between ">
            <h2 className=" font-bold text-[20px] text-[#408A7E] ml-4 mb-1">
              Chi tiết
            </h2>
          </div>
          <div className=" bg-[#fff] grid gap-5 max-h-[500px] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-[20px] p-4 ">
            <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#408A7E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold">
                  TỔNG PHẢN HỒI
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  40,000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} color="" />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN(THÁNG)
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  240,000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#36B9CC] text-[11px] leading-[17px] font-bold">
                  TỔNG SỰ KIỆN(NĂM)
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  240,000
                </h1>
              </div>
              <FaRegCalendarMinus fontSize={28} />
            </div>
            <div className=" h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-2xl transform hover:scale-[103%] transition duration-300 ease-out">
              <div>
                <h2 className="text-[#F6C23E] text-[11px] leading-[17px] font-bold">
                  TỔNG ĐÁNH GIÁ
                </h2>
                <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                  240,000
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
