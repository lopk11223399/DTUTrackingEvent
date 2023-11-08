import React, { useState } from "react";
import { apiLogin } from "../../apis/user";
import withBaseComponent from "../../hocs/withBaseComponent";
import { pathAdmin, pathCreator } from "../../utils/path";
import { login } from "../../store/user/userSlice";
import Swal from "sweetalert2";
import { BiShow, BiHide } from "react-icons/bi";
import rightSide from "../../assets/img/right_side.png";
import clsx from "clsx";

function Login({ navigate, dispatch }) {

	const [error, setError] = useState({
		usernameErr: null,
		passwordErr: null,
	})
	const [payload, setPayload] = useState({
		username: '',
		password: '',
	})
	const [showPassword, setShowPassword] = useState(false)
	const toggleShowPassword = () => {
		setShowPassword(!showPassword)
	}
	const handleLogin = async () => {
		if (payload.username.length < 0 || payload.username === '')
			setError(prev => ({
				...prev,
				usernameErr: 'Tài khoản không được để trống',
			}))

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
    <div className="w-screen h-screen relative bg-[#F5F5F5] flex">
      <div className="w-[50%] flex items-center justify-center">
        <div className="w-[477px] flex flex-col items-center">
          <div>
            <h1 className="text-[#09090B] text-[40px] font-[400]">
              Đăng nhập vào tài khoản của bạn
            </h1>
            <p className="text-[#71717A] text-[20px] font-[400]">
              Chào mừng trở lại!{" "}
              <span className="text-red-600 font-bold">DTU</span>{" "}
              <span className="text-main font-[400]">
                Event Tracking Application
              </span>
            </p>
          </div>

          <div className="flex flex-col w-full mt-[25px]">
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
              placeholder="Tên tài khoản"
              type="text"
              className={clsx(
                "rounded-[10px] border-2 border-[#8098f9] px-[10px] py-[17px] text-[#2d31a6] text-[18px] font-[400] placeholder:text-gray-400 outline-none",
                error?.usernameErr && "border-red-400"
              )}
            />
            {error?.usernameErr !== null && (
              <small className="mt-[2px] text-red-400 text-[16px]">
                {error?.usernameErr}
              </small>
            )}
          </div>

          <div className="flex flex-col w-full mt-[25px]">
            <div
              className={clsx(
                "rounded-[10px] border-2 border-[#8098f9] px-[10px] py-[17px] flex items-center",
                error?.passwordErr && "border-red-400"
              )}
            >
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
                placeholder="Mật khẩu"
                className="text-[#2d31a6] text-[18px] font-[400] placeholder:text-gray-400 flex-1 bg-transparent outline-none"
              />
              <div onClick={toggleShowPassword} className="cursor-pointer">
                {showPassword ? <BiShow size={24} /> : <BiHide size={24} />}
              </div>
            </div>
            {error?.passwordErr !== null && (
              <small className="mt-[2px] text-red-400 text-[16px]">
                {error?.passwordErr}
              </small>
            )}
          </div>

          <div
            onClick={handleLogin}
            className="mt-[25px] cursor-pointer p-[20px] w-full flex justify-center items-center bg-[#8098F9] rounded-[10px] text-[#fff] text-[20px] font-[700]"
          >
            ĐĂNG NHẬP
          </div>
        </div>
      </div>

      <div className="w-[50%] bg-main">
        <img src={rightSide} alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

export default withBaseComponent(Login);
