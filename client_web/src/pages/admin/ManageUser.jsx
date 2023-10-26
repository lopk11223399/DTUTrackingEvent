import React, { useEffect, useState } from "react";
import { Pagination } from "../../components";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import { apiUser } from "../../apis";

const ManageUser = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [params] = useSearchParams();
  const [statusEvent, setStatusEvent] = useState(false);
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
  console.log(count);
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
        </table>
      </div>
      <div className="w-full mt-1">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
};

export default ManageUser;
