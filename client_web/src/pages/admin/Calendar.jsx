import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import viLocale from "@fullcalendar/core/locales/vi";
import { apiGetEvents } from "../../apis";
//import eventsData from "../eventsData";

function Calendar() {
  const handleDateClick = (arg) => {
    const comment = prompt(`Nhập ghi chú cho ngày ${arg.dateStr}:`);
    if (comment !== null) alert(`Ngày ${arg.dateStr}: ${comment}`);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiGetEvents({ limit: 1000, page: 1 });
      if (response.success) {
        console.log(response.response);
        setData(response.response);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="p-2 relative">
      {/* <div className=" absolute top-[8px] left-[50%]"> asdasd</div> */}
      <h1 className=" uppercase font-[500] text-zinc-500 text-3xl mb-1">
        Lịch theo dõi sự kiện
      </h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        // eventClick={this.handleInfo}
        events={data.map((event, index) => ({
          title: event.title,
          start: event.startDate,
          id: index,
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
export default Calendar;
