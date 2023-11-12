import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";
import icons from "../../utils/icons";
import avatarDefault from "../../assets/img/avatarDefault.jpg";
import moment from "moment/moment";
import clsx from "clsx";
import { getBase64 } from "../../utils/helper";
import Select from "react-select";
import { optionsGender } from "../../utils/contants";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiUpdateCurrent } from "../../apis/user";
import { getCurrent } from "../../store/user/asyncActions";

const {
  AiOutlineRollback,
  FaUserCircle,
  BiSolidPencil,
  AiOutlineCloudUpload,
  AiOutlineCamera,
} = icons;

function Profile({ navigate, dispatch }) {
  const { current } = useSelector((state) => state.user);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [preview, setPreview] = useState({
    image: null,
    imageWeb: null,
  });
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    birthDate: "",
  });
  const inpFile = useRef();

  const handleCheckUpdate = () => {
    if (checkUpdate) {
      setPreview({
        image: null,
        imageWeb: null,
      });
      setPayload({
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        birthDate: "",
      });
    } else {
      setPayload({
        name: current.name,
        phone: current.phone,
        email: current.email,
        address: current.address,
        gender: current.gender,
        birthDate: current.birthDate,
      });
      setPreview({
        image: current.avatar,
        imageWeb: current.avatar,
      });
    }

    setCheckUpdate(!checkUpdate);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (preview.image && preview.imageWeb)
      formData.append("avatar", preview.image);

    for (let i of Object.entries(payload)) {
      if (i[1] === "") continue;
      if (i[1] === null) continue;
      formData.append(i[0], i[1]);
    }

    return Swal.fire({
      title: "Thông báo",
      text: "Bạn muốn cập nhập lại thông tin tài khoản của bạn?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Xác nhận",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiUpdateCurrent(formData);

        if (response.success) {
          toast.success(response.mess);
          dispatch(getCurrent());
          setCheckUpdate(false);
        } else toast.error(response.mess);
      }
    });
  };

  return (
    <div className="m-[30px] p-[43px] bg-white rounded-[8px] flex flex-col gap-[12px]">
      <div className="flex items-center gap-[32px] mb-[12px]">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-[21px] cursor-pointer text-[#B2B2B2] hover:text-[#418A7E]"
        >
          <span>
            <AiOutlineRollback size={21} />
          </span>
          <span className="text-[18px] font-[600]">Quay lại</span>
        </div>
        <span className="text-[18px] font-[600] text-[#B2B2B2]">/</span>
        <div className="flex items-center gap-[21px] text-[#418A7E]">
          <span>
            <FaUserCircle size={21} />
          </span>
          <span className="text-[18px] font-[600]">Trang cá nhân</span>
        </div>
      </div>
      <div className="flex items-center gap-[37px]">
        <div className="border-[3px] border-[#418A7E] rounded-full relative">
          {checkUpdate ? (
            <img
              src={preview.imageWeb || avatarDefault}
              alt="avatar"
              className="w-[169px] h-[169px] object-cover rounded-full"
            />
          ) : (
            <img
              src={current.avatar || avatarDefault}
              alt="avatar"
              className="w-[169px] h-[169px] object-cover rounded-full"
            />
          )}
          {checkUpdate && (
            <div
              onClick={() => inpFile.current.click()}
              className="absolute w-full h-full flex items-center justify-center rounded-full top-[0] cursor-pointer bg-overlay_white text-black hover:bg-overlay hover:text-white"
            >
              <AiOutlineCamera size={24} />
            </div>
          )}
          <input
            onChange={async (file) => {
              const base64Image = await getBase64(file.target.files[0]);
              setPreview((prev) => ({
                ...prev,
                image: file.target.files[0],
                imageWeb: base64Image,
              }));
            }}
            ref={inpFile}
            hidden
            type="file"
            name=""
            id=""
          />
        </div>
        <div className="flex-1 flex flex-col gap-[14px]">
          <p className="text-[#000] text-[24px] font-[600]">{current.name}</p>
          <p className="text-[#999] text-[14px] font-[400]">
            Số điện thoại: {current.phone || "(trống)"}
          </p>
        </div>
      </div>
      <div className="mt-[-45px] self-end flex gap-[12px] items-center">
        {checkUpdate && (
          <div
            onClick={handleSubmit}
            className={clsx(
              "flex px-[40px] border border-[#418A7E] bg-[#408A7E] text-white items-center justify-center py-[11px] rounded-[8px] cursor-pointer gap-[12px]"
            )}
          >
            <span>
              <AiOutlineCloudUpload size={18} />
            </span>
            <span className="text-[18px] font-[600]">Cập nhật</span>
          </div>
        )}
        <div
          onClick={handleCheckUpdate}
          className={clsx(
            "flex px-[40px] border border-[#418A7E] text-[#418A7E] items-center justify-center py-[11px] rounded-[8px] cursor-pointer gap-[12px]",
            !checkUpdate && "hover:bg-[#408A7E] hover:text-white",
            checkUpdate && "bg-[#408A7E] text-white"
          )}
        >
          <span>
            <BiSolidPencil size={18} />
          </span>
          <span className="text-[18px] font-[600]">
            {checkUpdate ? "Thoát chỉnh sửa" : "Chỉnh sửa"}
          </span>
        </div>
      </div>
      <div className="w-full bg-white shadow-table px-[50px] py-[38px] rounded-[8px] flex flex-col gap-[27px]">
        <p className="text-[18px] text-[#418A7E] font-[600]">
          Thông tin cá nhân
        </p>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">Tên</p>
          {checkUpdate ? (
            <input
              type="text"
              value={payload.name}
              onChange={(text) =>
                setPayload((prev) => ({ ...prev, name: text.target.value }))
              }
              placeholder="Tên"
              className="py-[9px] px-[27px] bg-[#EDF4F2] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] outline-none placeholder:text-[#B3B3B3] placeholder:italic"
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {current.name}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">
            Số điện thoại
          </p>
          {checkUpdate ? (
            <input
              type="text"
              value={payload.phone}
              onChange={(text) => {
                if (!isNaN(Number(text.target.value))) {
                  setPayload((prev) => ({ ...prev, phone: text.target.value }));
                }
              }}
              placeholder="Số điện thoại"
              className="py-[9px] px-[27px] bg-[#EDF4F2] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] outline-none placeholder:text-[#B3B3B3] placeholder:italic"
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {current.phone || "(trống)"}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">
            Vai trò
          </p>
          <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
            {current.roleId === 2 ? "Người tổ chức sự kiện" : "Admin"}
          </p>
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600] self-start py-[9px]">
            Địa chỉ
          </p>
          {checkUpdate ? (
            <input
              type="text"
              value={payload.address}
              onChange={(text) =>
                setPayload((prev) => ({ ...prev, address: text.target.value }))
              }
              placeholder="Địa chỉ"
              className="py-[9px] px-[27px] bg-[#EDF4F2] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] outline-none placeholder:text-[#B3B3B3] placeholder:italic"
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {current.address || "(trống)"}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600] self-start py-[9px]">
            Ngày sinh
          </p>
          {checkUpdate ? (
            <input
              type="date"
              value={payload.birthDate}
              onChange={(text) =>
                setPayload((prev) => ({
                  ...prev,
                  birthDate: text.target.value,
                }))
              }
              placeholder="Địa chỉ"
              className="py-[9px] px-[27px] bg-[#EDF4F2] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] outline-none placeholder:text-[#B3B3B3] placeholder:italic"
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {moment(current.birthDate).format("DD/MM/YYYY") || "(trống)"}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600] self-start py-[9px]">
            Email
          </p>
          {checkUpdate ? (
            <input
              type="text"
              value={payload.email}
              onChange={(text) =>
                setPayload((prev) => ({
                  ...prev,
                  email: text.target.value,
                }))
              }
              placeholder="Email"
              className="py-[9px] px-[27px] bg-[#EDF4F2] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] outline-none placeholder:text-[#B3B3B3] placeholder:italic"
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {current.email || "(trống)"}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600] self-start py-[9px]">
            Giới tính
          </p>
          {checkUpdate ? (
            <Select
              defaultValue={payload.gender}
              onChange={(value) =>
                setPayload((prev) => ({ ...prev, gender: value.value }))
              }
              options={optionsGender}
              className="flex-1"
              styles={{
                control: (base, state) => ({
                  ...base,
                  background: "#EDF4F2",
                  borderRadius: 8,
                  border: 0,
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 20,
                  fontSize: 20,
                  font: 400,
                  color: "#B3B3B3",
                  outline: "none",
                }),
              }}
            />
          ) : (
            <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
              {current.gender ? "Nữ" : "Nam"}
            </p>
          )}
        </div>
      </div>
      <div className="w-full bg-white shadow-table px-[50px] py-[38px] rounded-[8px] flex flex-col gap-[27px]">
        <p className="text-[18px] text-[#418A7E] font-[600]">Thông tin khoa</p>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">
            Mã số sinh viên
          </p>
          <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
            {current.studentData.studentCode}
          </p>
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">
            Mã lớp
          </p>
          <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
            {current.studentData.classCode}
          </p>
        </div>
        <div className="flex items-center">
          <p className="w-[160px] text-[#828282] text-[16px] font-[600]">
            Khoa
          </p>
          <p className="py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]">
            {current.studentData.program}
          </p>
        </div>
      </div>
    </div>
  );
}

export default withBaseComponent(Profile);
