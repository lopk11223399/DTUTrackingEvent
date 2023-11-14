import axios from "../axios";

export const apiCreateEvent = (data) =>
  axios({
    url: "/post",
    method: "post",
    data,
  });

export const apiGetEvents = (params) =>
  axios({
    url: "/post/get-all-event",
    method: "get",
    params,
  });

export const apiGetDetailEvent = (eid) =>
  axios({
    url: "/post/detail-event/" + eid,
    method: "get",
  });

export const apiUpdateStatus = (eid, data) =>
  axios({
    url: "/status/" + eid,
    method: "put",
    data,
  });

export const apiGetChart = (params) =>
  axios({
    url: "/statistic",
    method: "get",
    params,
  });

export const apiGetEventOfAuthor = (params) =>
  axios({
    url: "post/get-event-author",
    method: "get",
    params,
  });

export const apiDeleteEvent = (data) =>
  axios({
    url: "post/delete-event",
    method: "delete",
    data,
  });
export const apiGetChartfaculty = (params) =>
  axios({
    url: "/statistic/by-faculty/:eventId",
    method: "get",
    params,
  });
