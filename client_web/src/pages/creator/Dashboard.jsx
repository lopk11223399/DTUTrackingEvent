import React, { useEffect, useState } from 'react'
import { status } from '../../utils/contants'
import { BarChart } from '../../components'
import avatarDefault from '../../assets/img/avatarDefault.jpg'
import {
	apiGetEventOfAuthor,
	apiGetFivePeopleHot,
	apiGettotalRateOfAuthor,
} from '../../apis'

function dashboard() {
	const [chartData, setChartData] = useState([0, 0, 0, 0, 0])
	const [dataUser, setDataUser] = useState([])
	const [overView, setoverView] = useState({
		pending: 0,
		apply: 0,
		process: 0,
		success: 0,
		close: 0,
	})

	const fetch5PeopleHot = async () => {
		const response = await apiGetFivePeopleHot()
		if (response.success) setDataUser(response.response)
	}

	const fetchTotalRating = async () => {
		const response = await apiGettotalRateOfAuthor()
		if (response.success) {
			let perpect = 0
			let good = 0
			let medium = 0
			let least = 0
			let bad = 0

			response?.response?.forEach(el => {
				if (el.rate === 1) bad = el.totalRate
				else if (el.rate === 2) least = el.totalRate
				else if (el.rate === 3) medium = el.totalRate
				else if (el.rate === 4) good = el.totalRate
				else if (el.rate === 5) perpect = el.totalRate
			})

			setChartData([perpect, good, medium, least, bad])
		}
	}

	const fetchEvent = async () => {
		const response = await apiGetEventOfAuthor()
		if (response.success) {
			let pending = 0
			let apply = 0
			let process = 0
			let success = 0
			let close = 0

			response?.response?.forEach(el => {
				if (el.status === 1) pending = pending + 1
				else if (el.status === 2) apply = apply + 1
				else if (el.status === 3) process = process + 1
				else if (el.status === 4) success = success + 1
				else if (el.status === 5) close = close + 1
			})

			setoverView({
				pending: pending,
				apply: apply,
				process: process,
				success: success,
				close: close,
			})
		}
	}

	useEffect(() => {
		fetch5PeopleHot()
		fetchEvent()
		fetchTotalRating()
	}, [])

	return (
		<div className='px-[48px] py-[35px] flex flex-col gap-[35px]'>
			<div className='flex flex-col gap-[29px]'>
				<h2 className='text-[#000] font-[600] text-[16px]'>Tổng quan</h2>
				<div className='flex gap-[58px]'>
					{status.map(el => (
						<div
							className='bg-white w-[calc(100%/5)] p-[12px] rounded-[8px] shadow-table flex flex-col gap-[19px]'
							key={el.id}>
							<p className='text-[14px] font-[400] text-[#7A7A7A]'>{el.text}</p>
							<div className='flex items-center justify-between'>
								<span className='text-[#000] text-[18px] font-[600] pl-[19px]'>
									{el.id === 1
										? overView.pending
										: el.id === 2
										? overView.apply
										: el.id === 3
										? overView.process
										: el.id === 4
										? overView.success
										: overView.close}
								</span>
								<span className='w-[36px] h-[36px] mr-[16px] flex items-center justify-center bg-[#408A7E] rounded-full text-white'>
									{el.icon}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='w-full flex gap-[30px]'>
				<div className='w-[50%] flex flex-col gap-[10px] h-[400px]'>
					<h2 className='text-[#000] font-[600] text-[16px]'>
						Thống kê sự kiện
					</h2>
					<div className='bg-white rounded-[8px] p-[30px] flex flex-col justify-center shadow-table_1 flex-1'>
						<BarChart chartData={chartData} />
						<div className='flex items-center gap-[10px] justify-around'>
							<div className='flex items-center gap-[11px]'>
								<div className='w-[12px] h-[12px] bg-[#04B90B] rounded-full' />
								<span className='text-[14px] font-[500] text-[#C2C2C2]'>
									Xuất sắc
								</span>
							</div>
							<div className='flex items-center gap-[11px]'>
								<div className='w-[12px] h-[12px] bg-[#106AAB] rounded-full' />
								<span className='text-[14px] font-[500] text-[#C2C2C2]'>
									Tốt
								</span>
							</div>
							<div className='flex items-center gap-[11px]'>
								<div className='w-[12px] h-[12px] bg-[#8D31E9] rounded-full' />
								<span className='text-[14px] font-[500] text-[#C2C2C2]'>
									Trung bình
								</span>
							</div>
							<div className='flex items-center gap-[11px]'>
								<div className='w-[12px] h-[12px] bg-[#DA9F0A] rounded-full' />
								<span className='text-[14px] font-[500] text-[#C2C2C2]'>
									Kém
								</span>
							</div>
							<div className='flex items-center gap-[11px]'>
								<div className='w-[12px] h-[12px] bg-[#EA8484] rounded-full' />
								<span className='text-[14px] font-[500] text-[#C2C2C2]'>
									Tệ
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='w-[50%] flex flex-col gap-[10px] h-[400px]'>
					<h2 className='text-[#000] font-[600] text-[16px]'>
						Danh sách thành viên tiêu biểu
					</h2>
					<table className='w-full bg-white rounded-[8px] flex-1 shadow-table_1'>
						<thead>
							<tr className='text-center bg-white shadow-table_1'>
								<td className='rounded-l-[8px] text-[14px] font-[600] text-[#B6B6B6] w-[60%] text-start pl-[15%]'>
									Tên
								</td>
								<td className='py-[12px] text-[14px] font-[600] text-[#B6B6B6] w-[20%]'>
									Đã tham gia
								</td>
								<td className='rounded-r-[8px] text-[14px] font-[600] text-[#B6B6B6] w-[20%]'>
									Điểm
								</td>
							</tr>
						</thead>
						<tbody>
							{dataUser?.map((el, index) => (
								<tr className='text-center' key={index}>
									<td className='flex items-center justify-center py-[12px]'>
										<span className='flex items-center gap-[22px] px-2'>
											<img
												src={el.userData.avatar || avatarDefault}
												alt='avatar'
												className='w-[38px] h-[40px] rounded-full'
											/>
											<span className='w-[180px] text-start text-[16px] font-[600] text-[#408A7E] line-clamp-1'>
												{el.userData.name}
											</span>
										</span>
									</td>
									<td className='text-[14px] font-[400] text-[#969696]'>
										{el.eventCount}
									</td>
									<td className='text-[14px] font-[400] text-[#969696]'>
										{el.userData.studentData.point}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default dashboard
