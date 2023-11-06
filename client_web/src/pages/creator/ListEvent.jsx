import React, { useEffect, useState } from 'react'
import icons from '../../utils/icons'
import { apiGetEventOfAuthor } from '../../apis/event'
import moment from 'moment/moment'
import { status } from '../../utils/contants'
import clsx from 'clsx'
import withBaseComponent from '../../hocs/withBaseComponent'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { pathCreator, common } from '../../utils/path'
import Swal from 'sweetalert2'

const {
	AiOutlineSearch,
	IoIosAdd,
	BiSolidPencil,
	BiTrash,
	AiOutlineCloseCircle,
} = icons

function ListEvent({ navigate, location }) {
	const [params] = useSearchParams()
	const [data, setdata] = useState(null)
	const [choose, setChoose] = useState([])
	const [checkCheckboxALl, setCheckCheckboxALl] = useState(false)
	const [search, setSearch] = useState('')

	const fetchData = async queries => {
		const response = await apiGetEventOfAuthor({
			...queries,
		})
		if (response.success) setdata(response.response)
	}

	useEffect(() => {
		const queries = Object.fromEntries([...params])
		fetchData({ ...queries })
	}, [params])

	useEffect(() => {
		if (search.length > 0) {
			navigate({
				pathname: location.pathname,
				search: createSearchParams({ title: search }).toString(),
			})
		} else {
			navigate({
				pathname: location.pathname,
			})
		}
	}, [search])

	const handleChoose = flag => {
		if (flag === 'addAll') {
			setChoose(
				data.map(el =>
					!choose.some(e => e === el.id.toString())
						? el.id.toString()
						: choose.find(e => e === el.id.toString()),
				),
			)
			setCheckCheckboxALl(true)
		} else if (flag === 'removeAll') {
			setCheckCheckboxALl(false)
			setChoose([])
		}
	}

	const handleCreateEvent = data => {
		return Swal.fire({
			title: 'Thông báo',
			text: 'Bạn muốn tạo mới một bản sao sự kiện "' + data.title + '"',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Xác nhận',
		}).then(async rs => {
			if (rs.isConfirmed) {
				navigate(`/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`, {
					state: { data },
				})
			}
		})
	}

	return (
		<div className='px-[12px]'>
			<div className='flex gap-[17px] py-[15px] justify-end'>
				<div className='w-[292px] py-[6px] px-[12px] flex items-center gap-3 rounded-[4px] border border-[#408A7E]'>
					<span>
						<AiOutlineSearch size={16} color='#868686' />
					</span>
					<input
						value={search}
						onChange={text => setSearch(text.target.value)}
						placeholder='Tìm kiếm'
						type='text'
						className='bg-transparent flex-1 outline-none text-[14px] font-[400] text-[#408A7E] placeholder:text-[#868686]'
					/>
					{search.length > 0 && (
						<span onClick={() => setSearch('')}>
							<AiOutlineCloseCircle size={16} color='#868686' />
						</span>
					)}
				</div>
				<div
					onClick={() =>
						navigate(`/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`)
					}
					className='flex items-center py-[6px] px-[12px] cursor-pointer gap-[9px] w-[178px] bg-[#408A7E] rounded-[4px]'>
					<span>
						<IoIosAdd size={24} color='#FFFFFF' />
					</span>
					<p className='text-white text-[14px] font-[400] flex-1'>
						Tạo sự kiện mới
					</p>
				</div>
			</div>
			<div className='flex items-center gap-[11px] h-[70px] py-[20px] px-[31px]'>
				<input
					type='checkbox'
					id='slectAll'
					className='w-[24px] h-[24px] cursor-pointer'
					checked={checkCheckboxALl}
				/>
				{checkCheckboxALl ? (
					<label
						onClick={() => {
							handleChoose('removeAll')
						}}
						className='text-[#747474] text-[14px] font-[700] cursor-pointer'
						htmlFor='slectAll'>
						Bỏ chọn tất cả
					</label>
				) : choose.length > 0 ? (
					<label
						onClick={() => {
							handleChoose('addAll')
						}}
						className='text-[#408A7E] text-[14px] font-[700] cursor-pointer'
						htmlFor='slectAll'>
						{`Đang chọn (${choose.length})`}
					</label>
				) : (
					<label
						onClick={() => {
							handleChoose('addAll')
						}}
						className='text-[#747474] text-[14px] font-[700] cursor-pointer'
						htmlFor='slectAll'>
						Chọn tất cả
					</label>
				)}
				<p className='text-[#9D9D9D] text-[14px] font-[400]'>{`${data?.length} sự kiện`}</p>
				{choose.length > 0 && (
					<span className='cursor-pointer bg-[#408A7E] text-[14px] font-[700] py-1 w-[100px] text-center rounded-[8px] text-white'>
						Xóa
					</span>
				)}
			</div>

			<table className='w-full'>
				<thead className='h-[68px] rounded-[8px] bg-white text-center shadow-table'>
					<tr className=''>
						<td className='w-[10%]'></td>
						<td className='text-[14px] font-[700] text-[#5F5F5F] w-[25%]'>
							Tên sự kiện
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F] w-[10%]'>
							Trạng thái
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F]  w-[15%]'>
							Số người tham gia
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F]  w-[15%]'>
							Ngày tạo
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F] w-[10%]'>
							Tạo biến thể
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F] w-[10%]'>
							Chỉnh sửa
						</td>
						<td className='text-[14px] font-[700] text-[#5F5F5F] w-[5%]'>
							Xóa
						</td>
					</tr>
				</thead>
				<tbody>
					{data?.map(el => (
						<tr
							onClick={e => {
								e.stopPropagation()
								return navigate(
									`/${pathCreator.CREATOR}/${common.DETAILEVENT}/${el.id}`,
								)
							}}
							key={el.id}
							className='border-b border-[#D3D3D3] cursor-pointer hover:bg-white hover:shadow-md'>
							<td className='text-center w-[10%] py-[12px]'>
								<input
									type='checkbox'
									id={el.id}
									className='w-[24px] h-[24px] cursor-pointer'
									onChange={e => {
										if (choose.some(el => el === e.target.id)) {
											const indexToRemove = choose.indexOf(e.target.id)
											const newArray = [...choose]
											newArray.splice(indexToRemove, 1)
											setCheckCheckboxALl(false)
											setChoose(newArray)
										} else setChoose(prev => [e.target.id, ...prev])
									}}
									checked={choose.some(e => e === el.id.toString())}
								/>
							</td>
							<td className='w-[25%]'>
								<p className='line-clamp-1'>{el.title}</p>
							</td>
							<td className='text-center w-[10%]'>
								<span className='flex justify-center'>
									<div
										className={clsx(
											'w-[100px] rounded-md',
											status?.find(e => e.id === el.status).id === 1 &&
												'bg-gray-400 text-white',
											status?.find(e => e.id === el.status).id === 2 &&
												'bg-green-400 text-white',
											status?.find(e => e.id === el.status).id === 3 &&
												'bg-red-300 text-white',
											status?.find(e => e.id === el.status).id === 4 &&
												'bg-gray-400 text-white',
											status?.find(e => e.id === el.status).id === 5 &&
												'bg-red-600 text-white',
										)}>
										{status?.find(e => e.id === el.status).text}
									</div>
								</span>
							</td>
							<td className='text-center w-[15%]'>{`${el.userJoined.length}/${el.limitParticipant}`}</td>
							<td className='text-center w-[15%]'>
								{moment(el.createdAt).fromNow()}
							</td>
							<td className='w-[10%]'>
								<span
									onClick={() => handleCreateEvent(el)}
									className='w-full cursor-pointer flex items-center justify-center bg-[#408A7E] py-[3px] rounded-md'>
									<span>
										<IoIosAdd size={24} color='#FFFFFF' />
									</span>
									<span className='text-white text-[14px] font-[400]'>
										Tạo sự kiện
									</span>
								</span>
							</td>
							<td className='w-[10%]'>
								<span className='cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]'>
									<BiSolidPencil size={19} />
								</span>
							</td>
							<td className='w-[5%]'>
								<span className='cursor-pointer flex items-center justify-center text-[#B3B3B3] hover:text-[#408A7E]'>
									<BiTrash size={19} />
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default withBaseComponent(ListEvent)
