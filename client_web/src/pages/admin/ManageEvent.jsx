import React, { useCallback, useEffect, useState } from "react";
import { apiGetEvents, apiUpdateStatus } from "../../apis/event";
import moment from "moment/moment";
import { Pagination } from "../../components";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { status } from "../../utils/contants";
import Swal from "sweetalert2";
import icons from "../../utils/icons";
import clsx from "clsx";
import { toast } from "react-toastify";
import withBaseComponent from "../../hocs/withBaseComponent";
import { pathAdmin, common } from "../../utils/path";
import { FaSearch } from "react-icons/fa";
const {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiFillCheckSquare,
  AiOutlineCheckSquare,
  AiFillCloseSquare,
  AiOutlineCloseSquare,
} = icons;

function ManageEvent({ navigate }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const fetchData = async (queries) => {
    const response = await apiGetEvents({
      limit: 10,
      page: queries.page,
      order: ["createdAt", "DESC"],
      ...queries,
    });
    if (response.success) {
      setData(response.response);
      setCount(response.count);
    }
  };

  // useEffect(() => {
  // 	// Hàm kiểm tra khoảng thời gian
  // 	const checkTimeDifference = async () => {
  // 		// Lấy danh sách createdAt từ mảng và chuyển đổi thành đối tượng Date
  // 		const dateTimes = data.map(item => ({
  // 			time: new Date(item.createdAt),
  // 			eid: item.id,
  // 			status: item.status,
  // 		}))
  // 		// Tìm DateTime nhỏ nhất
  // 		const minDateTime = dateTimes.reduce((min, current) => {
  // 			const currentDate = new Date(current.time)
  // 			return currentDate < min
  // 				? {
  // 						time: currentDate,
  // 						eid: current.eid,
  // 						status: current.status,
  // 				  }
  // 				: min
  // 		}, new Date())
  // 		// Lấy thời gian hiện tại
  // 		const currentTime = new Date()
  // 		// Tính toán khoảng thời gian
  // 		const timeDifference = currentTime - minDateTime.time
  // 		// So sánh với 2 phút (2 * 60 * 1000 milliseconds)
  // 		const twoMinutesInMillis = 2 * 60 * 1000
  // 		// Kiểm tra nếu khoảng thời gian nhỏ hơn 2 phút
  // 		const isWithinTwoMinutes = timeDifference < twoMinutesInMillis

  // 		// Nếu thời gian nhỏ nhất nhỏ hơn 2 phút, thì bạn có thể thực hiện các hành động cần thiết ở đây
  // 		if (isWithinTwoMinutes) {
  // 			if (minDateTime.status === 1) {
  // 				await apiUpdateStatus(minDateTime.eid, { status: 2 })
  // 				render()
  // 				clearInterval(intervalId) // Dừng kiểm tra khi điều kiện được đáp ứng
  // 			} else if (minDateTime.status === 2) {
  // 				await apiUpdateStatus(minDateTime.eid, { status: 3 })
  // 				render()
  // 				clearInterval(intervalId) // Dừng kiểm tra khi điều kiện được đáp ứng
  // 			} else if (minDateTime.status === 3) {
  // 				await apiUpdateStatus(minDateTime.eid, { status: 4 })
  // 				render()
  // 				clearInterval(intervalId) // Dừng kiểm tra khi điều kiện được đáp ứng
  // 			}
  // 		}
  // 	}

  // 	// Lặp kiểm tra mỗi 10 giây (có thể điều chỉnh thời gian theo ý muốn)
  // 	const intervalId = setInterval(checkTimeDifference, 1000)

  // 	// Hủy bỏ interval khi component unmount
  // 	return () => clearInterval(intervalId)
  // }, [data])

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchData({ ...queries });
  }, [params, update]);

  useEffect(() => {
    let queries = {};

    if (searchText.length > 0) {
      queries.title = searchText;
      navigate({
        pathname: location.pathname,
        search: createSearchParams(queries).toString(),
      });
    } else {
      delete queries.title;
      navigate({
        pathname: location.pathname,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [searchText]);

  const handleAcceptEvent = (eid, sid, name) => {
    if (sid === 1) {
      return Swal.fire({
        title: "Thông báo",
        text: `Bạn có xác nhận duyệt sự kiện ${name} này không?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 2 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    } else if (sid === 2) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này sắp diễn ra. Bạn có muốn hủy bỏ không?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 5 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    } else if (sid === 3) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này đang trong quá trình diễn. Bạn không thể thao tác trên sự kiện này.`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      });
    } else if (sid === 4) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này đã kết thúc. Bạn không thể thao tác trên sự kiện này.`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      });
    } else if (sid === 5) {
      return Swal.fire({
        title: "Thông báo",
        text: `Bạn muốn mở lại sự kiện ${name} này?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 2 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    }
  };

  const handleCloseEvent = (eid, sid, name) => {
    if (sid === 1) {
      return Swal.fire({
        title: "Thông báo",
        text: `Bạn có xác nhận hủy sự kiện ${name} này không?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 5 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    } else if (sid === 2) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này sắp diễn ra. Bạn có muốn hủy bỏ không?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 5 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    } else if (sid === 3) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này đang trong quá trình diễn. Bạn không thể thao tác trên sự kiện này.`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      });
    } else if (sid === 4) {
      return Swal.fire({
        title: "Thông báo",
        text: `Sự kiện ${name} này đã kết thúc. Bạn không thể thao tác trên sự kiện này.`,
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      });
    } else if (sid === 5) {
      return Swal.fire({
        title: "Thông báo",
        text: `Bạn muốn mở lại sự kiện ${name} này?`,
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const reponse = await apiUpdateStatus(eid, { status: 2 });
          if (reponse.success) {
            toast.success(reponse.mess);
            render();
          } else {
            toast.error(reponse.mess);
            render();
          }
        }
      });
    }
  };

  return (
    <div className="px-[12px] pt-[70px]">
      <div className="z-10 flex justify-between items-center bg-white fixed top-0 right-0 left-[327px] px-[12px] shadow-table">
        <h1 className="text-[24px] font-[700] text-[#408A7E]">
          Quản lý sự kiện
        </h1>
        <div className="flex gap-[17px] py-[15px]">
          <div className="w-[292px]  flex items-center gap-3 rounded-[7px] border border-[#408A7E]">
            <label
              htmlFor="search-event"
              className="bg-[#408A7E] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tl-[5px] rounded-bl-[5px]"
            >
              <FaSearch color="white" />
            </label>
            <input
              id="search-event"
              autoComplete="off"
              value={searchText}
              onChange={(text) => setSearchText(text.target.value)}
              placeholder="Tìm kiếm"
              type="text"
              className="bg-transparent flex-1 outline-none text-[14px] font-[400] text-[#408A7E] placeholder:text-[#868686]"
            />
            {searchText.length > 0 && (
              <span
                className="cursor-pointer"
                onClick={() => setSearchText("")}
              >
                <AiOutlineCloseCircle size={16} color="#868686" />
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-[8px]">
        <table className="w-full">
          <thead className="h-[50px] rounded-t-[8px] text-[#408A7E] border border-b-[#408A7E] shadow-table">
            <tr className=" ">
              <td className="w-[5%] text-[14px] font-[700]  text-center py-2">
                #
              </td>
              <td className="w-[15%] text-[14px] font-[700]  text-center">
                Ảnh
              </td>
              <td className="w-[30%] text-[14px] font-[700] ">Tên sự kiện</td>
              <td className="w-[10%] text-[14px] font-[700]  text-center">
                Loại
              </td>
              <td className="w-[10%] text-[14px] font-[700]  text-center">
                Trạng thái
              </td>
              <td className="w-[10%] text-[14px] font-[700]  text-center">
                Ngày tạo
              </td>
              <td className="w-[10%] text-[14px] font-[700]  text-center">
                Duyệt
              </td>
              <td className="w-[10%] text-[14px] font-[700]  text-center">
                Không duyệt
              </td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((event, index) => (
                <tr
                  onClick={(e) => {
                    e.stopPropagation();
                    return navigate(
                      `/${pathAdmin.ADMIN}/${common.DETAILEVENT}/${event.id}`
                    );
                  }}
                  key={event.id}
                  className="border-b border-[#D3D3D3] cursor-pointer hover:bg-white hover:shadow-md"
                >
                  <td className="w-[5%] text-center">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      +import.meta.env.VITE_REACT_APP_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="w-[15%] text-center py-2">
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
                    <div
                      className={clsx(
                        "w-[100px] rounded-md",
                        status?.find((e) => e.id === event.status).id === 1 &&
                          "bg-gray-400 text-white",
                        status?.find((e) => e.id === event.status).id === 2 &&
                          "bg-green-400 text-white",
                        status?.find((e) => e.id === event.status).id === 3 &&
                          "bg-red-300 text-white",
                        status?.find((e) => e.id === event.status).id === 4 &&
                          "bg-gray-400 text-white",
                        status?.find((e) => e.id === event.status).id === 5 &&
                          "bg-red-600 text-white"
                      )}
                    >
                      {status?.find((e) => e.id === event.status).text}
                    </div>
                  </td>
                  <td className="w-[10%] text-center">
                    {moment(event.createdAt).fromNow()}
                  </td>
                  <td onClick={(e) => e.stopPropagation()} className="w-[10%]">
                    {event.status === 1 || event.status === 5 ? (
                      <span
                        onClick={() =>
                          handleAcceptEvent(event.id, event.status, event.title)
                        }
                        className="cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]"
                      >
                        <AiOutlineCheckSquare size={22} />
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          handleAcceptEvent(event.id, event.status, event.title)
                        }
                        className="cursor-pointer flex items-center justify-center text-[#408A7E]"
                      >
                        <AiFillCheckSquare size={22} />
                      </span>
                    )}
                  </td>
                  <td onClick={(e) => e.stopPropagation()} className="w-[10%]">
                    {event.status === 5 ? (
                      <span
                        onClick={() =>
                          handleCloseEvent(event.id, event.status, event.title)
                        }
                        className="cursor-pointer flex items-center justify-center text-red-600"
                      >
                        <AiFillCloseSquare size={22} />
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          handleCloseEvent(event.id, event.status, event.title)
                        }
                        className="cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-red-600"
                      >
                        <AiOutlineCloseSquare size={22} />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full my-3">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
}

export default withBaseComponent(ManageEvent);
