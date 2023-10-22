import React, { useEffect, useState } from 'react'
import { apiGetEvents, apiUpdateStatus } from '../../apis/event'
import moment from 'moment/moment'
import 'moment/locale/vi'
import { Pagination } from '../../components'
import { useSearchParams } from 'react-router-dom'

moment.locale('vi')

function ManageEvent() {
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params] = useSearchParams()

	const fetchData = async queries => {
		const response = await apiGetEvents({
			limit: 10,
			page: queries.page,
			order: ['createdAt', 'DESC'],
		})
		if (response.success) {
			setData(response.response)
			setCount(response.count)
		}
	}

	useEffect(() => {
		const queries = Object.fromEntries([...params])
		fetchData({ ...queries })
	}, [params])

	const handleUpdateStatus = async eid => {
		const reponse = await apiUpdateStatus(eid, { status: 2 })
		console.log(reponse)
	}

	return (
		<div className='w-full h-full py-2 px-[20px]'>
			<h1 className='text-[24px] font-[700] mb-2'>Quản lý sự kiện</h1>
			<table className='w-[100%] border'>
				<thead className='border-b'>
					<tr>
						<td className='w-[5%] text-center font-bold py-1'>#</td>
						<td className='w-[15%] text-center font-bold'>Ảnh</td>
						<td className='w-[30%] text-center font-bold'>Tên sự kiện</td>
						<td className='w-[10%] text-center font-bold'>Loại</td>
						<td className='w-[10%] text-center font-bold'>Ngày tạo</td>
						<td className='w-[30%] text-center font-bold'>Action</td>
					</tr>
				</thead>
				<tbody>
					{data.length > 0 &&
						data.map((el, index) => (
							<tr key={el.id} className='hover:bg-white cursor-pointer'>
								<td className='w-[5%] text-center'>
									{' '}
									{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) *
										+import.meta.env.VITE_REACT_APP_LIMIT +
										index +
										1}
								</td>
								<td className='w-[15%] text-center py-1'>
									<div className='w-full h-[45px] flex justify-center'>
										<img
											src={el.image}
											alt='ảnh'
											className='w-[100px] h-full object-cover'
										/>
									</div>
								</td>
								<td className='w-[30%]'>
									<p className='line-clamp-2'>{el.title}</p>
								</td>
								<td className='w-[10%] text-center'>
									{!el.typeEvent ? 'Offline' : 'Online'}
								</td>
								<td className='w-[10%] text-center'>
									{moment(el.createdAt).fromNow()}
								</td>
								<td className='w-[30%] text-center'>
									<div className='flex items-center justify-center gap-1'>
										<div
											onClick={() => handleUpdateStatus(el.id)}
											className='px-2 bg-green-300 rounded-md cursor-pointer'>
											Duyệt
										</div>
										<div className='px-2 bg-blue-300 rounded-md cursor-pointer'>
											Chỉnh sửa
										</div>
										<div className='px-2 bg-red-300 rounded-md cursor-pointer'>
											Xóa
										</div>
									</div>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<div className='w-full mt-1'>
				<Pagination totalCount={count} />
			</div>
		</div>
	)
}

export default ManageEvent
