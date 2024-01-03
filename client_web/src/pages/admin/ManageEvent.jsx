import React, { useCallback, useEffect, useState } from 'react'
import { apiGetEvents, apiUpdateStatus } from '../../apis/event'
import moment from 'moment/moment'
import { Pagination } from '../../components'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { status } from '../../utils/contants'
import Swal from 'sweetalert2'
import icons from '../../utils/icons'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import withBaseComponent from '../../hocs/withBaseComponent'
import { pathAdmin, common } from '../../utils/path'
import { FaSearch } from 'react-icons/fa'
const {
	AiOutlineSearch,
	AiOutlineCloseCircle,
	AiFillCheckSquare,
	AiOutlineCheckSquare,
	AiFillCloseSquare,
	AiOutlineCloseSquare,
} = icons

function ManageEvent({ navigate, location }) {
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params] = useSearchParams()
	const [search, setSearch] = useState('')
	const [update, setUpdate] = useState(false)
	const [tool, setTool] = useState(false)
	const [getChoose, setGetChoose] = useState(false)
	const [choose, setChoose] = useState([])
	const [filter, setFilter] = useState([])
	const [statusChoose, setStatusChoose] = useState({
		status1: {
			id: 1,
			check: false,
		},
		status2: {
			id: 2,
			check: false,
		},
		status3: {
			id: 3,
			check: false,
		},
		status4: {
			id: 4,
			check: false,
		},
		status5: {
			id: 5,
			check: false,
		},
	})

	const render = useCallback(() => {
		setUpdate(!update)
	}, [update])

	console.log(data)

	const fetchData = async queries => {
		const response = await apiGetEvents({
			limit: 10,
			page: queries.page,
			order: ['createdAt', 'DESC'],
			...queries,
		})
		if (response.success) {
			setData(response.response)
			setCount(response.count)
		}
	}

	useEffect(() => {
		const queries = Object.fromEntries([...params])

		if (queries.status) queries.status = queries.status.split(',').map(Number)

		fetchData({ ...queries })
	}, [params, update])

	useEffect(() => {
		let queries = {}

		if (search.length > 0) {
			queries.title = search
			navigate({
				pathname: location.pathname,
				search: createSearchParams(queries).toString(),
			})
		} else {
			delete queries.title
			navigate({
				pathname: location.pathname,
				search: createSearchParams(queries).toString(),
			})
		}

		if (filter.length > 0) {
			queries.status = filter.join(',')
			navigate({
				pathname: location.pathname,
				search: createSearchParams(queries).toString(),
			})
		}
	}, [search, filter])

	const handleAcceptEvent = (eid, sid, name) => {
		if (sid === 1) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Bạn có xác nhận duyệt sự kiện ${name} này không?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 2 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		} else if (sid === 2) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này sắp diễn ra. Bạn có muốn hủy bỏ không?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 5 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		} else if (sid === 3) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này đang trong quá trình diễn. Bạn không thể thao tác trên sự kiện này.`,
				icon: 'info',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
			})
		} else if (sid === 4) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này đã kết thúc. Bạn không thể thao tác trên sự kiện này.`,
				icon: 'info',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
			})
		} else if (sid === 5) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Bạn muốn mở lại sự kiện ${name} này?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 2 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		}
	}

	const handleCloseEvent = (eid, sid, name) => {
		if (sid === 1) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Bạn có xác nhận hủy sự kiện ${name} này không?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 5 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		} else if (sid === 2) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này sắp diễn ra. Bạn có muốn hủy bỏ không?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 5 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		} else if (sid === 3) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này đang trong quá trình diễn. Bạn không thể thao tác trên sự kiện này.`,
				icon: 'info',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
			})
		} else if (sid === 4) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Sự kiện ${name} này đã kết thúc. Bạn không thể thao tác trên sự kiện này.`,
				icon: 'info',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
			})
		} else if (sid === 5) {
			return Swal.fire({
				title: 'Thông báo',
				text: `Bạn muốn mở lại sự kiện ${name} này?`,
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const reponse = await apiUpdateStatus(eid, { status: 2 })
					if (reponse.success) {
						toast.success(reponse.mess)
						render()
					} else {
						toast.error(reponse.mess)
						render()
					}
				}
			})
		}
	}

	useEffect(() => {
		window.onclick = event => {
			if (!(event.target.id === 'filter')) setTool(false)
		}
	}, [])

	const handleStatusChoose = sid => {
		if (sid === 1) {
			const check = !statusChoose.status1.check
			setStatusChoose(prev => ({ ...prev, status1: { id: 1, check } }))

			if (sid === 1 && check) {
				setFilter(prev => [...prev, sid])
			} else {
				const indexToRemove = filter.indexOf(sid)
				const updatedArray = [...filter]
				updatedArray.splice(indexToRemove, 1)
				setFilter(updatedArray)
			}
		} else if (sid === 2) {
			const check = !statusChoose.status2.check
			setStatusChoose(prev => ({ ...prev, status2: { id: 2, check } }))

			if (sid === 2 && check) {
				setFilter(prev => [...prev, sid])
			} else {
				const indexToRemove = filter.indexOf(sid)
				const updatedArray = [...filter]
				updatedArray.splice(indexToRemove, 1)
				setFilter(updatedArray)
			}
		} else if (sid === 3) {
			const check = !statusChoose.status3.check
			setStatusChoose(prev => ({ ...prev, status3: { id: 3, check } }))

			if (sid === 3 && check) {
				setFilter(prev => [...prev, sid])
			} else {
				const indexToRemove = filter.indexOf(sid)
				const updatedArray = [...filter]
				updatedArray.splice(indexToRemove, 1)
				setFilter(updatedArray)
			}
		} else if (sid === 4) {
			const check = !statusChoose.status4.check
			setStatusChoose(prev => ({ ...prev, status4: { id: 4, check } }))

			if (sid === 4 && check) {
				setFilter(prev => [...prev, sid])
			} else {
				const indexToRemove = filter.indexOf(sid)
				const updatedArray = [...filter]
				updatedArray.splice(indexToRemove, 1)
				setFilter(updatedArray)
			}
		} else if (sid === 5) {
			const check = !statusChoose.status5.check
			setStatusChoose(prev => ({ ...prev, status5: { id: 5, check } }))

			if (sid === 5 && check) {
				setFilter(prev => [...prev, sid])
			} else {
				const indexToRemove = filter.indexOf(sid)
				const updatedArray = [...filter]
				updatedArray.splice(indexToRemove, 1)
				setFilter(updatedArray)
			}
		}
	}
	return (
		<div className='px-[12px] pt-[70px]'>
			<div className='z-10 flex justify-between items-center bg-white fixed top-0 right-0 left-[327px] px-[12px] shadow-table'>
				<h1 className='text-[24px] font-[700] text-[#408A7E]'>
					Quản lý sự kiện
				</h1>
				<div className='flex gap-[17px] py-[15px]'>
					<div className='w-[292px]   flex items-center gap-3 rounded-[7px] border border-[#408A7E]'>
						<label
							htmlFor='search-event'
							className='bg-[#408A7E] h-[32px] px-[14px] flex items-center justify-center cursor-pointer rounded-tl-[5px] rounded-bl-[5px]'>
							<FaSearch color='white' />
						</label>
						<input
							id='search-event'
							autoComplete='off'
							value={search}
							onChange={text => setSearch(text.target.value)}
							placeholder='Tìm kiếm sự kiện....'
							type='text'
							className='bg-transparent flex-1 outline-none text-[14px] font-[400] text-[#408A7E] placeholder:text-[#868686]'
						/>
					</div>
				</div>
			</div>
			<div>
				<div className='flex justify-end items-center mb-2  relative'>
					<span
						id='filter'
						onClick={() => setTool(!tool)}
						className={clsx(
							'text-[18px] text-white font-[600] w-[120px] py-1 border border-[#408A7E] rounded-[8px] cursor-pointer text-center bg-[#408A7E] hover:bg-white hover:text-[#408A7E]',
							tool && 'bg-[#408A7E] text-white',
						)}>
						Lọc
					</span>
					{tool && (
						<div
							onClick={e => e.stopPropagation()}
							className='absolute bg-white p-[12px] w-[200px] right-0 top-[100%] rounded-[8px] shadow-table flex flex-col gap-2'>
							{choose.length > 0 && choose.length !== data.length && (
								<div className='flex items-center gap-[8px]'>
									<input
										type='checkbox'
										id='allChoose'
										className='w-[16px] h-[16px] cursor-pointer '
										onChange={() => setGetChoose(!getChoose)}
										defaultChecked={getChoose}
									/>
									<label
										htmlFor='allChoose'
										className={clsx(
											'text-[16px] font-[400] cursor-pointer',
											getChoose ? 'text-[#408A7E]' : 'text-[#C2C2C2]',
										)}>
										Lấy đã chọn
									</label>
								</div>
							)}
							{status.map(el => (
								<div className='flex items-center gap-[8px]' key={el.id}>
									<input
										onChange={() => handleStatusChoose(el.id)}
										type='checkbox'
										id={el.id}
										className='w-[16px] h-[16px] cursor-pointer '
										defaultChecked={
											el.id === statusChoose.status1.id
												? statusChoose.status1.check
												: el.id === statusChoose.status2.id
												? statusChoose.status2.check
												: el.id === statusChoose.status3.id
												? statusChoose.status3.check
												: el.id === statusChoose.status4.id
												? statusChoose.status4.check
												: statusChoose.status5.check
										}
									/>
									<label
										htmlFor={el.id}
										className={clsx(
											'text-[16px] font-[400] cursor-pointer',
											el.id === statusChoose.status1.id &&
												statusChoose.status1.check
												? 'text-[#408A7E]'
												: el.id === statusChoose.status2.id &&
												  statusChoose.status2.check
												? 'text-[#408A7E]'
												: el.id === statusChoose.status3.id &&
												  statusChoose.status3.check
												? 'text-[#408A7E]'
												: el.id === statusChoose.status4.id &&
												  statusChoose.status4.check
												? 'text-[#408A7E]'
												: el.id === statusChoose.status5.id &&
												  statusChoose.status5.check
												? 'text-[#408A7E]'
												: 'text-[#C2C2C2]',
										)}>
										{el.text}
									</label>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className='rounded-[8px]'>
				<table className='w-full'>
					<thead className='h-[50px] rounded-t-[8px] text-[#408A7E] border-b border-[#408A7E]  shadow-table'>
						<tr className=' '>
							<td className='w-[5%] text-[14px] font-[700] text-center py-2'>
								#
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Ảnh
							</td>
							<td className='w-[15%] text-[14px] font-[700]'>Tên sự kiện</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Ngày bắt đầu
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Ngày kết thúc
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Loại
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Trạng thái
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Ngày tạo
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-center'>
								Phê duyệt
							</td>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 &&
							data.map((event, index) => (
								<tr
									onClick={e => {
										e.stopPropagation()
										return navigate(
											`/${pathAdmin.ADMIN}/${common.DETAILEVENT}/${event.id}`,
										)
									}}
									key={event.id}
									className='border-b border-[#D3D3D3] cursor-pointer hover:bg-white hover:shadow-md'>
									<td className='w-[5%] text-center'>
										{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) *
											+import.meta.env.VITE_REACT_APP_LIMIT +
											index +
											1}
									</td>
									<td className='w-[10%] text-center py-2'>
										<div className='w-full h-[45px] flex justify-center'>
											<img
												src={event.image}
												alt='ảnh'
												className='w-[100px] h-full object-cover rounded-md'
											/>
										</div>
									</td>
									<td className='w-[15%]'>
										<p className='line-clamp-2'>{event.title}</p>
									</td>
									<td className='w-[10%] text-center'>
										{moment(event.startDate).format('DD/MM/YYYY hh:mm A')}
									</td>
									<td className='w-[10%] text-center'>
										{moment(event.finishDate).format('DD/MM/YYYY hh:mm A')}
									</td>
									<td className='w-[10%] text-center'>
										{!event.typeEvent ? 'Offline' : 'Online'}
									</td>
									<td className='text-center w-[10%]'>
										<div
											className={clsx(
												'w-[100px] rounded-md',
												status?.find(e => e.id === event.status).id === 1 &&
													'bg-gray-400 text-white',
												status?.find(e => e.id === event.status).id === 2 &&
													'bg-green-400 text-white',
												status?.find(e => e.id === event.status).id === 3 &&
													'bg-red-300 text-white',
												status?.find(e => e.id === event.status).id === 4 &&
													'bg-gray-400 text-white',
												status?.find(e => e.id === event.status).id === 5 &&
													'bg-red-600 text-white',
											)}>
											{status?.find(e => e.id === event.status).text}
										</div>
									</td>
									<td className='w-[10%] text-center'>
										{moment(event.createdAt).fromNow()}
									</td>
									<td onClick={e => e.stopPropagation()} className='w-[10%]  '>
										<div className='flex gap-4 justify-center'>
											{event.status === 1 || event.status === 5 ? (
												<span
													onClick={() =>
														handleAcceptEvent(
															event.id,
															event.status,
															event.title,
														)
													}
													className='cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]'>
													<AiOutlineCheckSquare size={22} />
												</span>
											) : (
												<span
													onClick={() =>
														handleAcceptEvent(
															event.id,
															event.status,
															event.title,
														)
													}
													className='cursor-pointer flex items-center justify-center text-[#408A7E]'>
													<AiFillCheckSquare size={22} />
												</span>
											)}
											{event.status === 5 ? (
												<span
													onClick={() =>
														handleCloseEvent(
															event.id,
															event.status,
															event.title,
														)
													}
													className='cursor-pointer flex items-center justify-center text-red-600'>
													<AiFillCloseSquare size={22} />
												</span>
											) : (
												<span
													onClick={() =>
														handleCloseEvent(
															event.id,
															event.status,
															event.title,
														)
													}
													className='cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-red-600'>
													<AiOutlineCloseSquare size={22} />
												</span>
											)}
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className='w-full my-3'>
				<Pagination totalCount={count} />
			</div>
		</div>
	)
}

export default withBaseComponent(ManageEvent)
