import React, { useEffect, useState } from "react";
import avatarDefault from "../../assets/img/avatarDefault.jpg";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { PolarArea, Bar, Pie, Doughnut, Line, Radar } from "react-chartjs-2";

import {
  apiGetChart,
  apiGetEvents,
  apiGetFivePeopleHot,
  apiGettotalRateOfAuthor,
  apiUser,
  facultyChart,
  typeEventChart,
} from "../../apis";
import { FaRegCalendarMinus } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const data1 = {
  labels: ["Năm 1", "Năm 2", "Năm 3", "Năm 4"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [event, setEvent] = useState([]);
  const [dataFaculty, setDataFaculty] = useState([]);
  const [typeEvent, setTypeEvent] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dataUser, setDataUser] = useState([]);
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0]);
  const [overView, setoverView] = useState({
    pending: 0,
    apply: 0,
    process: 0,
    success: 0,
    close: 0,
  });
  const fetchfacultyChart = async () => {
    const response = await facultyChart();
    if (response.success) setDataFaculty(response.response);
  };
  const fetchTypeEvent = async () => {
    const response = await typeEventChart();
    if (response.success) setTypeEvent(response.response);
  };

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
      setEvent(response.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetChart({ year: selectedYear });
      if (response.success) {
        setData(response.response);
      }
    };
    fetchEvent();
    fetchData();
    fetch5PeopleHot();
    fetchTotalRating();
    fetchfacultyChart();
    fetchTypeEvent();
  }, [selectedYear]);

  const typeEventData = {
    labels: typeEvent.map((t) => `Sự kiện ${t.typeEvent}`),
    datasets: [
      {
        data: typeEvent.map((t) =>
          t.typeEvent === "Online" ? t.countOnline : t.countOffline
        ),
        backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const dataChart = {
    labels: data.map((month) => `Tháng ${month.month}`),
    datasets: [
      {
        fill: true,
        label: "Sự kiện theo tháng",
        data: data.map((total) => total.totalEvent),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };
  const options1 = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const options = {
    plugins: {
      legend: false,
      maintainAspectRatio: false,
    },
    scales: {
      y: {
        beginAtZero: true, // Đảm bảo bắt đầu từ 0
      },
    },
  };
  //console.log(userData);
  return (
    <div className="pb-6 overflow-auto h-screen">
      <h1 className=" uppercase font-[500] text-[#408A7E] text-3xl mb-1 p-4">
        dasnhboard
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
          <FaRegCalendarMinus fontSize={28} color="" />
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
          <FaRegCalendarMinus fontSize={28} />
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
          <FaRegCalendarMinus fontSize={28} />
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
          <FaRegCalendarMinus fontSize={28} />
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
          <FaRegCalendarMinus fontSize={28} />
        </div>
      </div>
      <div className="flex">
        <div className="basis-[50%] flex">
          <h1 className="pl-4 pt-4 font-bold text-[20px] text-[#408A7E] mb-2">
            Tổng số sinh viên
          </h1>
        </div>
        <div className="basis-[50%]">
          <h1 className="pl-2 pt-4 font-bold text-[20px] text-[#408A7E] mb-2">
            Tổng sự kiện theo tháng
          </h1>
        </div>
      </div>
      <div className="flex ">
        <div className="basis-[50%] ml-4 mr-4 bg-[#fff] p-2   shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-lg h-[300px]">
          <div className="w-full h-full">
            <Pie data={data1} options={{ maintainAspectRatio: false }}></Pie>
          </div>
        </div>
        <div className="basis-[50%] flex-col justify-center items-center mr-4 bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-lg h-[300px] ">
          <div className="flex justify-end pt-2 px-[26px]">
            <div>
              <label className="text-[#408A7E] font-semibold" htmlFor="">
                Chọn năm:
              </label>
              <select
                className=" outline-none border rounded ml-1 "
                name=""
                id=""
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="2023">Năm 2023</option>
                <option value="2022">Năm 2022</option>
                <option value="2021">Năm 2021</option>
                <option value="2020">Năm 2020</option>
              </select>
            </div>
          </div>
          <div className="w-full ">
            <Line
              className="px-4 pb-5"
              data={dataChart}
              options={options}
            ></Line>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-[30px] px-4 py-7">
        <div className="w-[65%] flex flex-col gap-[10px] h-[400px]">
          <h1 className="font-bold text-[20px] text-[#408A7E]">
            Danh sách thành viên tiêu biểu
          </h1>
          <table className="w-full bg-white rounded-[8px] shadow-table_1">
            <thead>
              <tr className="text-center bg-white shadow-table_1">
                <td className="rounded-l-[8px] text-[14px] font-[600] text-[#B6B6B6] w-[60%] text-start pl-[24px]">
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
        <div className="w-[35%] flex flex-col gap-[10px] h-[400px]">
          <h1 className="font-bold text-[20px] text-[#408A7E]">Loại sự kiện</h1>
          <div className="bg-white rounded-[8px] py-2 px-2 flex flex-col justify-center shadow-table_1 flex-1">
            <div>
              <span className="h-[10%]  font-medium pl-2">Tổng sự kiện:</span>
              <span className="pl-1">{event.length}</span>
            </div>
            <div className="w-full h-[90%]">
              <Doughnut
                data={typeEventData}
                options={{ maintainAspectRatio: false }}
              ></Doughnut>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div className="basis-[50%] flex">
            <h1 className="pl-4  font-bold text-[20px] text-[#408A7E] mb-2">
              Phản hồi sự kiện
            </h1>
          </div>
          <div className="basis-[50%]">
            <h1 className="pl-2  font-bold text-[20px] text-[#408A7E] mb-2">
              Tổng sự kiện theo tháng
            </h1>
          </div>
        </div>
        <div className="flex ">
          <div className="basis-[50%] ml-4 mr-4 bg-[#fff] p-2   shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-lg h-[300px]">
            <div className="w-full h-full">
              <PolarArea
                data={data1}
                options={{ maintainAspectRatio: false }}
              ></PolarArea>
            </div>
          </div>
          <div className="basis-[50%] flex justify-center items-center mr-4 bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-lg h-[300px] ">
            <div className="w-full ">
              <Bar className="p-5" data={dataChart} options={options}></Bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
