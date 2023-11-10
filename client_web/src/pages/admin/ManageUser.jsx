import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { apiUpdateRoleId, apiUser } from "../../apis";
import { pathAdmin } from "../../utils/path";
import { FaSearch } from "react-icons/fa";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // const [roleId, setRoleId] = useState({
  //   uid: null,
  //   rid: null,
  // });

  const handleUserClick = (user) => {
    navigate(
      `/${pathAdmin.ADMIN}/${pathAdmin.USERDETAIL}/${user.studentData.studentCode}`,
      {
        state: { user },
      }
    );
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (searchText.length > 0) {
      navigate({
        pathname: "",
        search: createSearchParams({ name: searchText }).toString(),
      });
    } else {
      navigate({
        pathname: "",
      });
    }
  }, [searchText]);
  //console.log(searchText);

  const fetchData = async (queries) => {
    //console.log(queries);
    const response = await apiUser({
      limit: 10,
      page: queries.page,
      order: ["createdAt", "DESC"],
      ...queries,
    });
    console.log(response);
    if (response.success) {
      setData(response.response.rows);
      setCount(response.response.count);
    }
  };

  console.log(data);
  //console.log(count);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchData({ ...queries });
  }, [params]);

  const [showCheckBox, setShowCheckbox] = useState(false);
  const handleResetPointClick = () => {
    setShowCheckbox(!showCheckBox);
  };

  // useEffect(() => {
  //   if (roleId.uid > 0) {
  //     navigate({
  //       pathname: "",
  //       search: createSearchParams({ id: roleId.uid }).toString(),
  //     });
  //   }
  // }, [roleId]);
  // const [roleId, setRoleId] = useState({
  //   rid: null,
  // });

  const handUpdateRole = async (uid, rid, name) => {
    console.log(uid, rid);

    const response = await apiUpdateRoleId(
      { roleId: parseInt(rid) },
      { id: uid }
    );
  };
  return (
    <div className="w-full h-full py-2 px-[20px]">
      <h1 className=" uppercase font-[500] text-zinc-500 text-3xl mb-2">
        Quản lý Người dùng
      </h1>
      <div className="flex  justify-between">
        <div className=" pt-2">
          <button
            onClick={handleResetPointClick}
            className="bg-[#4E73DF] text-[#fff] leading-[20px] font-normal items-center pt-[5px] pr-[10px] pb-[5px] pl-[10px] rounded-md"
          >
            Reset Point
          </button>
        </div>
        <div className="flex mb-2">
          <input
            type="text"
            className=" bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Tìm sự kiện..."
            id="search-user"
            autoComplete="off"
            value={searchText}
            onChange={handleSearchChange}
          />
          <label
            htmlFor="search-user"
            className="bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]"
          >
            <FaSearch color="white" />
          </label>
        </div>
      </div>
      <div className="rounded-[8px] bg-[#fff] ">
        <table className="w-full">
          <thead className=" text-[#4E73DF]   border-b border-[#4E73DF]">
            <tr className=" ">
              {showCheckBox && <td></td>}
              <td className="w-[5%] text-center font-bold py-2">#</td>
              <td className="w-[15%] text-center font-bold">Ảnh</td>
              <td className="w-[30%] text-center font-bold">Họ & tên</td>
              <td className="w-[10%] text-center font-bold">Ngày sinh</td>
              <td className="w-[10%] text-center font-bold">Giới tính</td>
              <td className="w-[10%] text-center font-bold">Vai trò</td>
              <td className="w-[20%] text-center font-bold">Số point</td>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.length > 0 &&
              data.map((user, index) => (
                <tr
                  onClick={() => handleUserClick(user)}
                  key={user.id}
                  className="hover:bg-[#4E73DF]  hover:text-white hover:opacity-[0.85] duration-95 ease-in-out cursor-pointer"
                >
                  {showCheckBox && (
                    <td className="pl-2">
                      <input
                        onClick={(e) => e.stopPropagation()}
                        type="checkbox"
                      />
                    </td>
                  )}
                  <td className="w-[9%] text-center">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      +import.meta.env.VITE_REACT_APP_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="w-[10%] text-center py-1">
                    <div className="w-full h-[45px] flex justify-center rounded-md">
                      <img
                        src="https://vtv1.mediacdn.vn/zoom/640_400/2022/12/19/221218184732-messi-wc-trophy-16714338650611943125261-crop-1672061255342223645900.jpg"
                        alt="ảnh"
                        className="w-[100px] h-full object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="w-[5%] text-center">{user.name}</td>
                  <td className="w-[15%] text-center">{user.birthDate}</td>
                  <td className="text-center w-[10%]">
                    {user.gender === 1 ? "Nam" : "Nữ"}
                  </td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="w-[10%] text-center text-black"
                  >
                    <select
                      className="text-center border rounded-md"
                      name=""
                      value={user.roleId}
                      onChange={(e) => {
                        handUpdateRole(user.id, e.target.value, user.name);
                      }}
                    >
                      <option value={3}>Người dùng</option>
                      <option value={2}>Người tạo sự kiện</option>
                    </select>
                  </td>
                  <td className="w-[10%] text-center">
                    {user.studentData.point}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-full mt-1">
        <Pagination totalCount={count} text={"người dùng"} />
      </div>
    </div>
  );
};

export default ManageUser;
