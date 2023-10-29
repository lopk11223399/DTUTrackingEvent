import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import viLocale from '@fullcalendar/core/locales/vi'
import { apiGetEvents } from '../../apis'
//import eventsData from "../eventsData";

function Calendar() {
	const handleDateClick = arg => {
		const comment = prompt(`Nhập ghi chú cho ngày ${arg.dateStr}:`)
		if (comment !== null) alert(`Ngày ${arg.dateStr}: ${comment}`)
	}
	const getEventColor = date => {
		const currentDate = new Date()
		const eventDate = new Date(date)
		currentDate.setHours(0, 0, 0, 0)
		if (eventDate < currentDate) {
			return '#EE3B3B'
		} else if (eventDate.toDateString() === currentDate.toDateString()) {
			return '#3788d8'
		} else {
			return '#A2CD5A'
		}
	}

	return (
		<div className='p-2 relative'>
			{/* <div className=" absolute top-[8px] left-[50%]"> asdasd</div> */}
			<h1 className='text-[24px] font-[700] '>Lịch theo dõi sự kiện</h1>
			<FullCalendar
				plugins={[dayGridPlugin, interactionPlugin]}
				dateClick={handleDateClick}
				// eventClick={this.handleInfo}
				//events={eventsWithColors}
				locale='vi'
				locales={[viLocale]}
				headerToolbar={{
					left: 'title',
					right: 'today prev,next dayGridDay,dayGridWeek,dayGridMonth',
				}}
				eventTimeFormat={{
					hour: 'numeric',
					minute: '2-digit',
					meridiem: 'short',
				}}
			/>
		</div>
	)
}
export default Calendar
