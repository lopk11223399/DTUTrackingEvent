import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { apiUser } from "../../apis";
import { pathAdmin } from "../../utils/path";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  const [statusEvent, setStatusEvent] = useState(false);
  const navigate = useNavigate();
  const handleUserClick = (user) => {
    navigate(
      `/${pathAdmin.ADMIN}/${pathAdmin.USERDETAIL}/${user.studentData.studentCode}`,
      {
        state: { user },
      }
    );
  };
  const fetchData = async (queries) => {
    const response = await apiUser({
      limit: 10,
      page: queries.page,
      order: ["createdAt", "DESC"],
    });
    if (response.success === 0) {
      setData(response.response.rows);
      setCount(response.response.count);
      setStatusEvent(false);
    }
  };
  console.log(data);
  //console.log(count);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    fetchData({ ...queries });
  }, [params, statusEvent]);

  // const handleUpdateStatus = async (eid, status) => {
  //   if (status === 1) {
  //     Swal.fire({
  //       title: "Thông báo",
  //       text: "Bạn có xác nhận duyệt sự kiện",
  //       icon: "question",
  //       showCancelButton: true,
  //       cancelButtonText: "Hủy",
  //       confirmButtonText: "Xác nhận",
  //     }).then(async (rs) => {
  //       if (rs.isConfirmed) {
  //         const reponse = await apiUpdateStatus(eid, { status: 2 });
  //         console.log(reponse);
  //         setStatusEvent(true);
  //       }
  //     });
  //   } else if (status === 5) {
  //     Swal.fire({
  //       title: "Thông báo",
  //       text: "Bạn có muốn duyệt sự kiện lại không",
  //       icon: "question",
  //       showCancelButton: true,
  //       cancelButtonText: "Hủy",
  //       confirmButtonText: "Xác nhận",
  //     }).then(async (rs) => {
  //       if (rs.isConfirmed) {
  //         const reponse = await apiUpdateStatus(eid, { status: 2 });
  //         console.log(reponse);
  //       }
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Thông báo",
  //       text: "Sự kiện bạn đã được duyệt rồi",
  //       icon: "info",
  //       confirmButtonText: "Xác nhận",
  //     });
  //   }
  // };
  // const handleCancelStatus = async (eid, status) => {
  //   if (status === 5) {
  //     Swal.fire({
  //       title: "Thông báo",
  //       text: "Sự kiện đã bị hủy",
  //       icon: "error",
  //       confirmButtonText: "Xác nhận",
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Thông báo",
  //       text: "Bạn có muốn hủy sự kiện",
  //       icon: "question",
  //       showCancelButton: true,
  //       cancelButtonText: "Hủy",
  //       confirmButtonText: "Xác nhận",
  //     }).then(async (rs) => {
  //       if (rs.isConfirmed) {
  //         const reponse = await apiUpdateStatus(eid, { status: 5 });
  //         console.log(reponse);
  //       }
  //     });
  //   }
  // };
  return (
    <div className="w-full h-full py-2 px-[20px]">
      <h1 className="text-[24px] font-[700] mb-2">Quản lý Người dùng</h1>
      <div className="rounded-[8px] bg-[#fff] ">
        <table className="w-full">
          <thead className=" text-[#4E73DF]   border-b border-[#4E73DF]">
            <tr className=" ">
              <td className="w-[5%] text-center font-bold py-2">#</td>
              <td className="w-[15%] text-center font-bold">Ảnh</td>
              <td className="w-[30%] text-center font-bold">Họ & tên</td>
              <td className="w-[10%] text-center font-bold">Ngày sinh</td>
              <td className="w-[10%] text-center font-bold">Giới tính</td>
              <td className="w-[10%] text-center font-bold">Vai trò</td>
              <td className="w-[20%] text-center font-bold">Số point</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((user, index) => (
                <tr
                  onClick={() => handleUserClick(user)}
                  key={user.id}
                  className="hover:bg-[#4E73DF] hover:text-white hover:opacity-[0.85] duration-95 ease-in-out cursor-pointer"
                >
                  <td className="w-[5%] text-center">
                    {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                      +import.meta.env.VITE_REACT_APP_LIMIT +
                      index +
                      1}
                  </td>
                  <td className="w-[15%] text-center py-1">
                    <div className="w-full h-[45px] flex justify-center rounded-md">
                      <img
                        src="https://vtv1.mediacdn.vn/zoom/640_400/2022/12/19/221218184732-messi-wc-trophy-16714338650611943125261-crop-1672061255342223645900.jpg"
                        alt="ảnh"
                        className="w-[100px] h-full object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="w-[10%] text-center">{user.name}</td>
                  <td className="w-[15%] text-center">{user.birthDate}</td>
                  <td className="text-center w-[10%]">
                    {user.gender === 1 ? "Nam" : "Nữ"}
                  </td>
                  <td className="w-[15%] text-center ">
                    {user.roleID === 2 ? "Người tạo sự kiện" : "Người dùng"}
                  </td>
                  <td className="w-[15%] text-center">
                    {user.studentData.point}
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
};

export default ManageUser;
