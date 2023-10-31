import axios from "../axios";

export const apiLogin = (data) =>
  axios({
    url: "/auth/login",
    method: "post",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/get-current-user",
    method: "get",
  });
export const apiUser = (params) =>
  axios({
    url: "/user",
    method: "get",
    params,
  });
export const apiUpdateRoleId = (params, data) =>
  axios({
    url: "/update-role/",
    method: "put",
    data,
    params,
  });
