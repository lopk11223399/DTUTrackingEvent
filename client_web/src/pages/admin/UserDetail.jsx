import React from "react";
import { useLocation } from "react-router";

const UserDetail = () => {
  const location = useLocation();
  const { user } = location.state || {};
  //console.log("datacheck>>>", user);

  return (
    <div>
      <h1 className="text-[24px] font-[700] m-4">Chi Tiết Người dùng</h1>
      <div className="flex ml-4 mr-4">
        <div className="basis-[35%]">
          <div className="bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-xl mr-4  h-[500px]">
            <div className="flex flex-col items-center gap-9 p-10">
              <img
                className="w-[100px] h-[100px] rounded-full object-cover  items-center"
                src="https://xelaban.com/wp-content/uploads/2022/03/honda-super-dream-1997.jpg"
                alt=""
              />

              <h2 className="text-[#4E73DF] font-bold">{user.name}</h2>
              <h4 className=" text-slate-500">Người dùng</h4>
            </div>
            <div className="pl-4 gap-10 grid font-semibold">
              <div>
                <span className="mr-4">Tổng số Point:</span>
                <span>120</span>
              </div>
              <div>
                <span className="mr-4">Sự kiện đã theo dõi:</span>
                <span>5</span>
              </div>
              <div>
                <span className="mr-4">Sự kiện Đã đăng kí tham gia:</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[65%] ">
          <div className="bg-[#fff] shadow-[0_7px_25px_rgba(0,0,0,0.08)] rounded-xl pl-10 pr-10 pb-2">
            <div className="flex pt-4">
              <div className="basis-[50%] ">
                <div className="flex h-[90px]">
                  <span>Họ&Tên:</span>
                  <h3 className="max-w-[200px] break-words">{user.name}</h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Email:</span>
                  <h3 className="max-w-[200px] break-words">{user.email}</h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Tài khoản:</span>
                  <h3 className="max-w-[200px] break-words">{user.username}</h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Ngày sinh:</span>
                  <h3 className="max-w-[200px] break-words">
                    {user.birthDate}
                  </h3>
                </div>
                <div className="flex h-[90px]">
                  <span className="max-w-[200px] break-words">Giới tính:</span>
                  <h3>{user.genrder === 1 ? "Nam" : "Nữ"}</h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Số điện thoại:</span>
                  <h3 className="max-w-[200px] break-words">0704554312</h3>
                </div>
              </div>
              <div className="basis-[50%]">
                <div className="flex h-[90px]">
                  <span>Khoa:</span>
                  <h3 className="max-w-[200px] break-words">
                    {user.studentData.program}
                  </h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Lớp:</span>
                  <h3 className="max-w-[200px] break-words">
                    {user.studentData.classCode}
                  </h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Mã sinh viên:</span>
                  <h3 className="max-w-[200px] break-words">
                    {user.studentData.studentCode}
                  </h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Địa chỉ:</span>
                  <h3 className="max-w-[200px] break-words">
                    09 Nguyễn Khoái{" "}
                  </h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Sinh viên:</span>
                  <h3 className="max-w-[200px] break-words">K26</h3>
                </div>
                <div className="flex h-[90px]">
                  <span>Năm học:</span>
                  <h3 className="max-w-[200px] break-words">2020-2024</h3>
                </div>
              </div>
            </div>
            <div className="bg-[#4E73DF] text-center h-[50px] uppercase mt-5 mb-4 leading-[50px] rounded-lg">
              <span className="text-[#fff] ">cập nhật</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
