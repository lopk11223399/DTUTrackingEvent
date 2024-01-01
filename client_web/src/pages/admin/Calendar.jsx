import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import viLocale from "@fullcalendar/core/locales/vi";
import { apiGetEvents } from "../../apis";
import { Colors } from "chart.js";
import withBaseComponent from "../../hocs/withBaseComponent";
import { common, pathAdmin } from "../../utils/path";
//import eventsData from "../eventsData";

function Calendar({ navigate }) {
  const handleDateClick = (arg) => {
    const comment = prompt(`Nhập ghi chú cho ngày ${arg.dateStr}:`);
    if (comment !== null) alert(`Ngày ${arg.dateStr}: ${comment}`);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetEvents();
      if (response.success) {
        //console.log(response.response);
        setData(response.response);
      }
    };
    fetchData();
  }, []);
  //console.log(data);
  const handClickEvent = (e) => {
    const event = e.event;
    const oid = event._def.extendedProps.oid.id;
    console.log(event);
    navigate(`/${pathAdmin.ADMIN}/${common.DETAILEVENT}/${oid}`);
  };
  //console.log(data);
  console.log(data[0]);
  return (
    <div className="p-4 relative">
      {/* <div className=" absolute top-[8px] left-[50%]"> asdasd</div> */}
      <h1 className=" uppercase font-[500] text-zinc-500 text-3xl mb-1">
        Lịch theo dõi sự kiện
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        eventClick={handClickEvent}
        events={data.map((event, index) => ({
          title: event.title,
          start: event.startDate,
          end: event.finishDate,
          id: index,
          backgroundColor: "#408A7E",
          oid: event,
        }))}
        locale="vi"
        locales={[viLocale]}
        headerToolbar={{
          left: "title",
          right: "today prev,next dayGridDay,dayGridWeek,dayGridMonth",
        }}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
      />
    </div>
  );
}
export default withBaseComponent(Calendar);
