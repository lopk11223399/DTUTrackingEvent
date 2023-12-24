import React, { useState } from "react";
import { apiLogin } from "../../apis/user";
import withBaseComponent from "../../hocs/withBaseComponent";
import { pathAdmin, pathCreator } from "../../utils/path";
import { login } from "../../store/user/userSlice";
import Swal from "sweetalert2";
import { BiShow, BiHide } from "react-icons/bi";

import clsx from "clsx";
import img from "../../assets/img/img-01.png";
import { Tilt } from "react-tilt";

import { FaLock, FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
function Login({ navigate, dispatch }) {
  const [error, setError] = useState({
    usernameErr: null,
    passwordErr: null,
  });
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    if (payload.username.length < 0 || payload.username === "")
      setError((prev) => ({
        ...prev,
        usernameErr: "Tài khoản không được để trống",
      }));

    if (payload.password.length < 0 || payload.password === "")
      setError((prev) => ({
        ...prev,
        passwordErr: "Mật khẩu không được để trống",
      }));

    if (error.usernameErr === null || error.passwordErr === null) {
      const response = await apiLogin(payload);
      if (response.success === true) {
        dispatch(
          login({
            isLoggedIn: true,
            token: response.token,
            current: response.user,
          })
        );
        if (+response.user.roleId === 1) {
          navigate(`/${pathAdmin.ADMIN}`);
        } else if (+response.user.roleId === 2) {
          navigate(`/${pathCreator.CREATOR}`);
        } else
          Swal.fire(
            "Thông báo",
            "Tài khoản chưa được cấp quyền đăng nhập",
            "error"
          );
      } else Swal.fire("Thông báo", response.mess, "error");
    }
  };

  return (
    <div className="w-full my-0 mx-auto">
      <div className="w-full min-h-screen flex flex-wrap justify-center items-center p-[15px] bg-gradient-to-tl from-green-600 to-indigo-600">
        <div className="w-[960px] bg-white rounded-lg overflow-hidden flex flex-wrap justify-between pt-[100px] pr-[130px] pb-[33px] pl-[95px]">
          <Tilt options={{ scale: 1.2 }}>
            <div className="w-[316px] h-[400px]">
              <img className="max-w-full" src={img} alt="IMG" />
            </div>
          </Tilt>

          <form className="w-[294px] pt-[20px]">
            <span className="font-bold uppercase text-[24px] text-gray-800 leading-6 text-center w-full block pb-54">
              Đăng nhập
            </span>
            <div className="flex flex-col w-full mt-[25px] ">
              <div
                className={clsx(
                  "rounded-[10px] flex items-center border-2 border-[#408A7E] px-[6px] py-[6px] text-[#2e6b61] text-[18px] font-[400] placeholder:text-gray-400 outline-none",
                  error?.usernameErr && "border-red-400"
                )}
              >
                <FaUser className=" mr-2"></FaUser>
                <input
                  value={payload.username}
                  id="username"
                  onChange={(text) => {
                    setError((prev) => ({ ...prev, usernameErr: null }));
                    setPayload((prev) => ({
                      ...prev,
                      username: text.target.value,
                    }));
                  }}
                  placeholder="Tên tài khoản..."
                  type="text"
                  className=" outline-none bg-white"
                />
              </div>
              {error?.usernameErr !== null && (
                <small className="mt-[2px] text-red-400 text-[16px]">
                  {error?.usernameErr}
                </small>
              )}
            </div>
            <div className="flex flex-col w-full mt-[25px]">
              <div
                className={clsx(
                  "rounded-[10px] border-2 border-[#408A7E] text-[#2e6b61] px-[6px] py-[6px] flex items-center",
                  error?.passwordErr && "border-red-400"
                )}
              >
                <FaLock className="mr-2 "></FaLock>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={payload.password}
                  onChange={(text) => {
                    setError((prev) => ({ ...prev, passwordErr: null }));
                    setPayload((prev) => ({
                      ...prev,
                      password: text.target.value,
                    }));
                  }}
                  placeholder="Mật khẩu..."
                  className="text-[#2e6b61] text-[18px] font-[400] placeholder:text-gray-400 flex-1 bg-transparent outline-none"
                />
                {payload.password.length > 0 && (
                  <div onClick={toggleShowPassword} className="cursor-pointer">
                    {showPassword ? <BiShow size={23} /> : <BiHide size={23} />}
                  </div>
                )}
              </div>
              {error?.passwordErr !== null && (
                <small className="mt-[2px] text-red-400 text-[16px]">
                  {error?.passwordErr}
                </small>
              )}
            </div>
            <div
              onClick={handleLogin}
              className="mt-[25px] cursor-pointer p-[6px] w-full flex justify-center items-center bg-[#408A7E] rounded-[10px] text-[#fff] text-[20px] font-[700] hover:bg-[#777]"
            >
              ĐĂNG NHẬP
            </div>
            <div className="text-center text-[15px] pt-[12px] text-[#2e6b61] uppercase hover:underline cursor-pointer">
              <Link to="/forgot">quên mật khẩu?</Link>
            </div>

            <div className="text-center pt-[136px]">
              <a className="txt2" href="#">
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(Login);
