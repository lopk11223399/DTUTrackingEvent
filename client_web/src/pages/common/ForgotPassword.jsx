import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { Tilt } from "react-tilt";
import img from "../../assets/img/img-01.png";
import { forgotPassword } from "../../apis/user";
import withBaseComponent from "../../hocs/withBaseComponent";

import { AiOutlineRollback } from "react-icons/ai";

const ForgotPassword = ({ navigate }) => {
  const [forGot, setForGot] = useState({
    email: "",
  });
  const handleForgotPassword = async () => {
    const response = await forgotPassword({ email: forGot.email });
    if (response.success === true) {
      alert(`Mật khẩu mới của bạn là ${response.newPassword}`);
    }
  };
  return (
    <div className="w-full my-0 mx-auto">
      <div className="w-full min-h-screen flex flex-wrap justify-center items-center p-[15px] bg-gradient-to-tl from-green-600 to-indigo-600">
        <div className="w-[960px] relative bg-white rounded-lg overflow-hidden flex flex-wrap justify-between pt-[100px] pr-[130px] pb-[33px] pl-[95px]">
          <div>
            <div
              onClick={() => navigate(-1)}
              className="flex items-center absolute top-0 left-0 py-4 pl-5 cursor-pointer text-[#B2B2B2] hover:text-[#418A7E]"
            >
              <span>
                <AiOutlineRollback size={21} />
              </span>
              <span className="text-[18px] font-[600]">Quay lại</span>
            </div>
            <Tilt options={{ scale: 1.2 }}>
              <div className="w-[316px] h-[400px]">
                <img className="max-w-full" src={img} alt="IMG" />
              </div>
            </Tilt>
          </div>

          <form className="w-[294px] pt-[20px]">
            <span className="font-bold uppercase text-[24px] text-gray-800 leading-6 text-center w-full block pb-54">
              Quên mật khẩu
            </span>
            <div className="pt-[30px]">
              <div className="flex flex-col w-full mt-[25px] ">
                <div className="rounded-[10px] flex items-center border-2 border-[#408A7E] px-[6px] py-[6px] text-[#2e6b61] text-[18px] font-[400] placeholder:text-gray-400 outline-none">
                  <MdEmail className=" mr-2"></MdEmail>
                  <input
                    id="email"
                    placeholder="Email..."
                    value={forGot.email}
                    onChange={(e) => setForGot({ email: e.target.value })}
                    type="text"
                    className=" outline-none bg-white"
                  />
                </div>
                {/* {error?.usernameErr !== null && (
            <small className="mt-[2px] text-red-400 text-[16px]">
              {error?.usernameErr}
            </small>
          )} */}
              </div>
            </div>

            <div
              onClick={handleForgotPassword}
              className="mt-[25px] uppercase cursor-pointer p-[6px] w-full flex justify-center items-center bg-[#408A7E] rounded-[10px] text-[#fff] text-[20px] font-[700] hover:bg-[#777]"
            >
              Gửi mật khẩu
            </div>

            <div className="text-center pt-[12px]">
              <span className="txt1"> </span>
              <a className="txt2" href="#"></a>
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
};

export default withBaseComponent(ForgotPassword);
