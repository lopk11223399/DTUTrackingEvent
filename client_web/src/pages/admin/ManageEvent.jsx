import React, { useEffect, useState } from "react";
import { apiGetEvents, apiUpdateStatus } from "../../apis/event";
import moment from "moment/moment";
import "moment/locale/vi";
import { Pagination } from "../../components";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { status } from "../../utils/contants";
import Swal from "sweetalert2";
import { pathAdmin } from "../../utils/path";
import { FaSearch } from "react-icons/fa";

moment.locale("vi");

function ManageEvent() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  const [statusEvent, setStatusEvent] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleUserClick = (event) => {
    navigate(`/${pathAdmin.ADMIN}/eventdetail/${event.id}`, {
      state: { event },
    });
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (searchText.length > 0) {
      navigate({
        pathname: "",
        search: createSearchParams({ title: searchText }).toString(),
      });
    } else {
      navigate({
        pathname: "",
      });
    }
  }, [searchText]);
  const fetchData = async (queries) => {
    //console.log(queries);
    const response = await apiGetEvents({
      limit: 10,
      page: queries.page,
      order: ["createdAt", "DESC"],
      ...queries,
    });
    if (response.success) {
      //console.log(response.count);
      //console.log(response.response);
      setData(response.response);
      setCount(response.count);
      setStatusEvent(false);
    }
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);

    fetchData({ ...queries });
  }, [params]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchData({ ...queries });
  }, [statusEvent]);
  //console.log(data);

  const handleUpdateStatus = async (eid, status) => {
    if (status === 1) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn có xác nhận duyệt sự kiện",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          setStatusEvent(true);
          const reponse = await apiUpdateStatus(eid, { status: 2 });
          //console.log(reponse);
        }
      });
    } else if (status === 5) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn có muốn duyệt sự kiện lại không",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          setStatusEvent(true);
          const reponse = await apiUpdateStatus(eid, { status: 2 });
          //console.log(reponse);
        }
      });
    } else {
      Swal.fire({
        title: "Thông báo",
        text: "Sự kiện bạn đã được duyệt rồi",
        icon: "info",
        confirmButtonText: "Xác nhận",
      });
    }
  };
  const handleCancelStatus = async (eid, status) => {
    if (status === 5) {
      Swal.fire({
        title: "Thông báo",
        text: "Sự kiện đã bị hủy",
        icon: "error",
        confirmButtonText: "Xác nhận",
      });
    } else {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn có muốn hủy sự kiện",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          setStatusEvent(true);
          const reponse = await apiUpdateStatus(eid, { status: 5 });
          //console.log(reponse);
        }
      });
    }
  };
  console.log(statusEvent);
  return (
    <div className="w-full h-full py-2 px-[20px]">
      <h1 className=" uppercase text-zinc-500 font-[500] text-3xl mb-2">
        Quản lý sự kiện
      </h1>
      <div className="flex mb-2 justify-end">
        <div className="flex ">
          <input
            type="text"
            className=" bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Tìm sự kiện..."
            id="search-event"
            autoComplete="off"
            value={searchText}
            onChange={handleSearchChange}
          />
          <label
            htmlFor="search-event"
            className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]"
          >
            <FaSearch color="white" />
          </label>
        </div>
      </div>
      <div className="rounded-[8px] bg-[#fff] ">
        <table className="">
          <thead className=" text-[#4E73DF]   border-b border-[#4E73DF]">
            <tr className=" ">
              <td className="w-[5%] text-center font-bold py-2">#</td>
              <td className="w-[15%] text-center font-bold">Ảnh</td>
              <td className="w-[30%] text-center font-bold">Tên sự kiện</td>
              <td className="w-[10%] text-center font-bold">Loại</td>
              <td className="w-[10%] text-center font-bold">Trạng thái</td>
              <td className="w-[10%] text-center font-bold">Ngày tạo</td>
              <td className="w-[20%] text-center font-bold">Duyệt sự kiện</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((event, index) => (
                <tr
                  onClick={() => handleUserClick(event)}
                  key={event.id}
                  className="hover:bg-[#4E73DF] hover:text-white hover:opacity-[0.85] duration-95 ease-in-out cursor-pointer"
                >
                  <td className="w-[5%] text-center">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      +import.meta.env.VITE_REACT_APP_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="w-[15%] text-center py-1">
                    <div className="w-full h-[45px] flex justify-center">
                      <img
                        src={event.image}
                        alt="ảnh"
                        className="w-[100px] h-full object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="w-[30%]">
                    <p className="line-clamp-2">{event.title}</p>
                  </td>
                  <td className="w-[10%] text-center">
                    {!event.typeEvent ? "Offline" : "Online"}
                  </td>
                  <td className="text-center w-[10%]">
                    {status.find((e) => e.id === event.status)?.text}
                  </td>
                  <td className="w-[10%] text-center">
                    {moment(event.createdAt).fromNow()}
                  </td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="w-[20%] text-center"
                  >
                    <div className="flex items-center justify-center gap-1 text-white">
                      <div
                        onClick={() =>
                          handleUpdateStatus(event.id, event.status)
                        }
                        className="px-2 w-[58px] bg-green-400 rounded-md cursor-pointer"
                      >
                        Duyệt
                      </div>
                      <div
                        onClick={() => {
                          handleCancelStatus(event.id, event.status);
                        }}
                        className="px-2 w-[58px] bg-red-500 rounded-md cursor-pointer"
                      >
                        Huỷ
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-1">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
}

export default ManageEvent;
