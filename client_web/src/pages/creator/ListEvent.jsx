import React, { useCallback, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { apiDeleteEvent, apiGetEventOfAuthor } from "../../apis/event";
import moment from "moment/moment";
import { status } from "../../utils/contants";
import clsx from "clsx";
import withBaseComponent from "../../hocs/withBaseComponent";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { pathCreator, common } from "../../utils/path";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Pagination } from "../../components";

const {
  AiOutlineSearch,
  IoIosAdd,
  BiSolidPencil,
  BiTrash,
  AiOutlineCloseCircle,
} = icons;

function ListEvent({ navigate, location }) {
  const [params] = useSearchParams();
  const [data, setdata] = useState(null);
  const [choose, setChoose] = useState([]);
  const [checkCheckboxALl, setCheckCheckboxALl] = useState(false);
  const [search, setSearch] = useState("");
  const [statusChoose, setStatusChoose] = useState({
    status1: {
      id: 1,
      check: false,
    },
    status2: {
      id: 2,
      check: false,
    },
    status3: {
      id: 3,
      check: false,
    },
    status4: {
      id: 4,
      check: false,
    },
    status5: {
      id: 5,
      check: false,
    },
  });
  const [tool, setTool] = useState(false);
  const [getChoose, setGetChoose] = useState(false);
  const [checkChoose, setCheckChoose] = useState(false);
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = async (queries) => {
    const response = await apiGetEventOfAuthor({
      limit: 10,
      page: 1,
      ...queries,
    });
    if (response.success) {
      setdata(response.response);
      setCount(response.count);
    }
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);

    if (queries.status) queries.status = queries.status.split(",").map(Number);

    fetchData({ ...queries });
  }, [params, update]);

  useEffect(() => {
    let queries = {};

    if (search.length > 0) {
      queries.title = search;
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

    if (filter.length > 0) {
      queries.status = filter.join(",");
      navigate({
        pathname: location.pathname,
        search: createSearchParams(queries).toString(),
      });
    }
  }, [search, filter]);

  const handleChoose = async (flag) => {
    if (flag === "addAll") {
      const response = await apiGetEventOfAuthor();
      if (response.success) {
        setChoose(
          response?.response?.map((el) =>
            !choose.some((e) => e === el.id.toString())
              ? el.id.toString()
              : choose.find((e) => e === el.id.toString())
          )
        );
        setCheckCheckboxALl(true);
      }
    } else if (flag === "removeAll") {
      setCheckCheckboxALl(false);
      setChoose([]);
    }
  };

  const handleCreateEvent = (data) => {
    return Swal.fire({
      title: "Thông báo",
      text: 'Bạn muốn tạo mới một bản sao sự kiện "' + data.title + '"',
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then((rs) => {
      if (rs.isConfirmed) {
        navigate(`/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`, {
          state: {
            data: data,
            type: "create",
          },
        });
      }
    });
  };

  const handleStatusChoose = (sid) => {
    if (sid === 1) {
      const check = !statusChoose.status1.check;
      setStatusChoose((prev) => ({ ...prev, status1: { id: 1, check } }));

      if (sid === 1 && check) {
        setFilter((prev) => [...prev, sid]);
      } else {
        const indexToRemove = filter.indexOf(sid);
        const updatedArray = [...filter];
        updatedArray.splice(indexToRemove, 1);
        setFilter(updatedArray);
      }
    } else if (sid === 2) {
      const check = !statusChoose.status2.check;
      setStatusChoose((prev) => ({ ...prev, status2: { id: 2, check } }));

      if (sid === 2 && check) {
        setFilter((prev) => [...prev, sid]);
      } else {
        const indexToRemove = filter.indexOf(sid);
        const updatedArray = [...filter];
        updatedArray.splice(indexToRemove, 1);
        setFilter(updatedArray);
      }
    } else if (sid === 3) {
      const check = !statusChoose.status3.check;
      setStatusChoose((prev) => ({ ...prev, status3: { id: 3, check } }));

      if (sid === 3 && check) {
        setFilter((prev) => [...prev, sid]);
      } else {
        const indexToRemove = filter.indexOf(sid);
        const updatedArray = [...filter];
        updatedArray.splice(indexToRemove, 1);
        setFilter(updatedArray);
      }
    } else if (sid === 4) {
      const check = !statusChoose.status4.check;
      setStatusChoose((prev) => ({ ...prev, status4: { id: 4, check } }));

      if (sid === 4 && check) {
        setFilter((prev) => [...prev, sid]);
      } else {
        const indexToRemove = filter.indexOf(sid);
        const updatedArray = [...filter];
        updatedArray.splice(indexToRemove, 1);
        setFilter(updatedArray);
      }
    } else if (sid === 5) {
      const check = !statusChoose.status5.check;
      setStatusChoose((prev) => ({ ...prev, status5: { id: 5, check } }));

      if (sid === 5 && check) {
        setFilter((prev) => [...prev, sid]);
      } else {
        const indexToRemove = filter.indexOf(sid);
        const updatedArray = [...filter];
        updatedArray.splice(indexToRemove, 1);
        setFilter(updatedArray);
      }
    }
  };

  useEffect(() => {
    window.onclick = (event) => {
      if (!(event.target.id === "filter")) setTool(false);
    };
  }, []);

  const handleDeleteIcon = (eid, name) => {
    if (!eid) return;
    else {
      let array = [eid];

      return Swal.fire({
        title: "Thông báo",
        text:
          'Bạn muốn muốn xóa sự kiện "' +
          name +
          '". Điều này sẽ xóa sự kiện và không thể khôi phục. Nếu như bạn đã chắc chắn với quyết định của mình vui lòng chọn xác nhận!',
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Xác nhận",
      }).then(async (rs) => {
        if (rs.isConfirmed) {
          const response = await apiDeleteEvent({ eventIds: array });
          if (response.success) {
            toast.success(response.mess);
            render();
          }
        }
      });
    }
  };

  const handleDeleteEvents = () => {
    return Swal.fire({
      title: "Thông báo",
      text: `Bạn muốn muốn xóa ${choose.length} sự kiện đã chọn. Điều này sẽ xóa sự kiện và không thể khôi phục. Nếu như bạn đã chắc chắn với quyết định của mình vui lòng chọn xác nhận!`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteEvent({ eventIds: choose });
        if (response.success) {
          toast.success(response.mess);
          render();
          setChoose([]);
        }
      }
    });
  };

  return (
    <div className="px-[12px] pt-[70px]">
      <div className="z-10 flex justify-between items-center bg-white fixed top-0 right-0 left-[327px] px-[12px] shadow-table">
        <h1 className="text-[24px] font-[700] text-[#408A7E]">
          Danh sách sự kiện của tôi
        </h1>
        <div className="flex gap-[17px] py-[15px]">
          <div className="w-[292px] px-[12px] py-[6px] flex items-center gap-3 rounded-[4px] border border-[#408A7E]">
            <span>
              <AiOutlineSearch size={16} color="#868686" />
            </span>
            <input
              value={search}
              onChange={(text) => setSearch(text.target.value)}
              placeholder="Tìm kiếm"
              type="text"
              className="bg-transparent flex-1 outline-none text-[14px] font-[400] text-[#408A7E] placeholder:text-[#868686]"
            />
            {search.length > 0 && (
              <span className="cursor-pointer" onClick={() => setSearch("")}>
                <AiOutlineCloseCircle size={16} color="#868686" />
              </span>
            )}
          </div>
          <div
            onClick={() =>
              navigate(`/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`)
            }
            className="flex items-center py-[6px] px-[12px] cursor-pointer gap-[9px] w-[178px] bg-[#408A7E] rounded-[4px]"
          >
            <span>
              <IoIosAdd size={24} color="#FFFFFF" />
            </span>
            <p className="text-white text-[14px] font-[400] flex-1">
              Tạo sự kiện mới
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-[11px] h-[70px] py-[20px]">
          {checkChoose ? (
            <div className="flex items-center gap-[11px] pl-[31px]">
              <input
                type="checkbox"
                id="slectAll"
                className="w-[24px] h-[24px] cursor-pointer"
                checked={checkCheckboxALl}
              />
              {choose.length > 0 ? (
                <label
                  onClick={() => {
                    handleChoose("addAll");
                  }}
                  className="text-[#408A7E] text-[14px] font-[700] cursor-pointer"
                  htmlFor="slectAll"
                >
                  {`Đang chọn (${choose.length})`}
                </label>
              ) : (
                <label
                  onClick={() => {
                    handleChoose("addAll");
                  }}
                  className="text-[#747474] text-[14px] font-[700] cursor-pointer"
                  htmlFor="slectAll"
                >
                  Chọn tất cả
                </label>
              )}
            </div>
          ) : (
            <span
              onClick={() => setCheckChoose(true)}
              className="cursor-pointer bg-[#408A7E] text-[14px] font-[700] py-1 w-[120px] text-center rounded-[8px] text-white"
            >
              Chọn
            </span>
          )}
          <p className="text-[#9D9D9D] text-[14px] font-[400]">{`${count} sự kiện`}</p>
          {checkChoose && (
            <span
              onClick={() => {
                setCheckChoose(false);
                setChoose([]);
                setCheckCheckboxALl(false);
              }}
              className="cursor-pointer bg-[#408A7E] text-[14px] font-[700] py-1 w-[120px] text-center rounded-[8px] text-white"
            >
              Tắt
            </span>
          )}
          {choose.length > 0 && (
            <span
              onClick={() => handleChoose("removeAll")}
              className="cursor-pointer bg-[#408A7E] text-[14px] font-[700] py-1 w-[120px] text-center rounded-[8px] text-white"
            >
              Bỏ chọn tất cả
            </span>
          )}
          {choose.length > 0 && (
            <span
              onClick={handleDeleteEvents}
              className="cursor-pointer bg-[#408A7E] text-[14px] font-[700] py-1 w-[120px] text-center rounded-[8px] text-white"
            >
              Xóa
            </span>
          )}
        </div>
        <div className="flex items-center gap-[12px] relative">
          <span
            id="filter"
            onClick={() => setTool(!tool)}
            className={clsx(
              "text-[18px] text-[#408A7E] font-[600] w-[120px] py-1 border border-[#408A7E] rounded-[8px] cursor-pointer text-center hover:bg-[#408A7E] hover:text-white",
              tool && "bg-[#408A7E] text-white"
            )}
          >
            Lọc
          </span>
          {tool && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bg-white p-[12px] w-[200px] right-0 top-[100%] rounded-[8px] shadow-table flex flex-col gap-2"
            >
              {choose.length > 0 && choose.length !== data.length && (
                <div className="flex items-center gap-[8px]">
                  <input
                    type="checkbox"
                    id="allChoose"
                    className="w-[16px] h-[16px] cursor-pointer"
                    onChange={() => setGetChoose(!getChoose)}
                    defaultChecked={getChoose}
                  />
                  <label
                    htmlFor="allChoose"
                    className={clsx(
                      "text-[16px] font-[400] cursor-pointer",
                      getChoose ? "text-[#408A7E]" : "text-[#C2C2C2]"
                    )}
                  >
                    Lấy đã chọn
                  </label>
                </div>
              )}
              {status.map((el) => (
                <div className="flex items-center gap-[8px]" key={el.id}>
                  <input
                    onChange={() => handleStatusChoose(el.id)}
                    type="checkbox"
                    id={el.id}
                    className="w-[16px] h-[16px] cursor-pointer"
                    defaultChecked={
                      el.id === statusChoose.status1.id
                        ? statusChoose.status1.check
                        : el.id === statusChoose.status2.id
                        ? statusChoose.status2.check
                        : el.id === statusChoose.status3.id
                        ? statusChoose.status3.check
                        : el.id === statusChoose.status4.id
                        ? statusChoose.status4.check
                        : statusChoose.status5.check
                    }
                  />
                  <label
                    htmlFor={el.id}
                    className={clsx(
                      "text-[16px] font-[400] cursor-pointer",
                      el.id === statusChoose.status1.id &&
                        statusChoose.status1.check
                        ? "text-[#408A7E]"
                        : el.id === statusChoose.status2.id &&
                          statusChoose.status2.check
                        ? "text-[#408A7E]"
                        : el.id === statusChoose.status3.id &&
                          statusChoose.status3.check
                        ? "text-[#408A7E]"
                        : el.id === statusChoose.status4.id &&
                          statusChoose.status4.check
                        ? "text-[#408A7E]"
                        : el.id === statusChoose.status5.id &&
                          statusChoose.status5.check
                        ? "text-[#408A7E]"
                        : "text-[#C2C2C2]"
                    )}
                  >
                    {el.text}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <table className="w-full">
        <thead className="h-[68px] rounded-[8px] bg-white shadow-table">
          <tr className="">
            {checkChoose && <td className="w-[10%]"></td>}
            <td className="text-[14px] font-[700] text-[#5F5F5F] w-[25%] pl-2">
              Tên sự kiện
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F] w-[10%] text-center">
              Trạng thái
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F]  w-[15%] text-center">
              Số người tham gia
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F]  w-[15%] text-center">
              Ngày tạo
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F] w-[10%] text-center">
              Tạo biến thể
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F] w-[10%] text-center">
              Chỉnh sửa
            </td>
            <td className="text-[14px] font-[700] text-[#5F5F5F] w-[5%] text-center">
              Xóa
            </td>
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => (
            <tr
              onClick={(e) => {
                e.stopPropagation();
                return navigate(
                  `/${pathCreator.CREATOR}/${common.DETAILEVENT}/${el.id}`
                );
              }}
              key={el.id}
              className="border-b border-[#D3D3D3] cursor-pointer hover:bg-white hover:shadow-md"
            >
              {checkChoose && (
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="text-center w-[10%]"
                >
                  <input
                    type="checkbox"
                    id={el.id}
                    className="w-[24px] h-[24px] cursor-pointer"
                    onChange={(e) => {
                      if (choose.some((el) => el === e.target.id)) {
                        const indexToRemove = choose.indexOf(e.target.id);
                        const newArray = [...choose];
                        newArray.splice(indexToRemove, 1);
                        setCheckCheckboxALl(false);
                        setChoose(newArray);
                      } else setChoose((prev) => [e.target.id, ...prev]);
                      if (
                        choose.length === 0 ||
                        choose.length === data.length
                      ) {
                        setGetChoose(false);
                      }
                    }}
                    checked={choose.some((e) => e === el.id.toString())}
                  />
                </td>
              )}
              <td className="w-[25%] py-[12px] pl-2">
                <p className="line-clamp-1">{el.title}</p>
              </td>
              <td className="text-center w-[10%]">
                <span className="flex justify-center">
                  <div
                    className={clsx(
                      "w-[100px] rounded-md",
                      status?.find((e) => e.id === el.status).id === 1 &&
                        "bg-gray-400 text-white",
                      status?.find((e) => e.id === el.status).id === 2 &&
                        "bg-green-400 text-white",
                      status?.find((e) => e.id === el.status).id === 3 &&
                        "bg-red-300 text-white",
                      status?.find((e) => e.id === el.status).id === 4 &&
                        "bg-gray-400 text-white",
                      status?.find((e) => e.id === el.status).id === 5 &&
                        "bg-red-600 text-white"
                    )}
                  >
                    {status?.find((e) => e.id === el.status).text}
                  </div>
                </span>
              </td>
              <td className="text-center w-[15%]">{`${el.userJoined.length}/${el.limitParticipant}`}</td>
              <td className="text-center w-[15%]">
                {moment(el.createdAt).fromNow()}
              </td>
              <td onClick={(e) => e.stopPropagation()} className="w-[10%]">
                <span
                  onClick={() => handleCreateEvent(el)}
                  className="w-full cursor-pointer flex items-center justify-center bg-[#408A7E] py-[3px] rounded-md"
                >
                  <span>
                    <IoIosAdd size={24} color="#FFFFFF" />
                  </span>
                  <span className="text-white text-[14px] font-[400]">
                    Tạo sự kiện
                  </span>
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()} className="w-[10%]">
                <span
                  onClick={() =>
                    navigate(
                      `/${pathCreator.CREATOR}/${pathCreator.UPDATE}/${el.id}`,
                      {
                        state: {
                          type: "update",
                          pathname: location.pathname,
                        },
                      }
                    )
                  }
                  className="cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]"
                >
                  <BiSolidPencil size={19} />
                </span>
              </td>
              <td onClick={(e) => e.stopPropagation()} className="w-[5%]">
                <span
                  onClick={() => handleDeleteIcon(el.id, el.title)}
                  className="cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]"
                >
                  <BiTrash size={19} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full my-3">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
}

export default withBaseComponent(ListEvent);
