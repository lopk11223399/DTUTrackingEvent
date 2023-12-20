import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment/moment'
import { getBase64 } from '../../utils/helper'
import { apiCreateEvent, apiGetDetailEvent, apiUpdateEvent } from '../../apis'
import icons from '../../utils/icons'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { DetailRoom } from '../../components'
import clsx from 'clsx'
import NoImage from '../../assets/img/NoImage.jpg'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

const { AiOutlineDown } = icons

function CreateEvent({ dispatch, location, navigate }) {
	const [error, setError] = useState({
		tittleErr: null,
		startDateErr: null,
		finishDateErr: null,
		locationErr: null,
		typeEventErr: null,
		descriptionErr: null,
		addPointErr: null,
		imageErr: null,
		limitParticipantErr: null,
		roomErr: null,
	})
	const [payload, setPayload] = useState({
		title: '',
		startDate: moment(Date.now() + 15 * (60 * 1000)).format('YYYY-MM-DDTkk:mm'),
		finishDate: moment(Date.now() + 1 * (60 * 60 * 1000)).format(
			'YYYY-MM-DDTkk:mm',
		),
		location: '',
		typeEvent: null,
		description: '',
		linkUrl: '',
		addPoint: 0,
		limitParticipant: 0,
	})
	const [room, setRoom] = useState([])
	const [preview, setPreview] = useState({
		image: null,
		imageWeb: null,
	})
	const [showCategoryEvent, setShowCategoryEvent] = useState(false)
	const [update, setupdate] = useState(false)
	const inpFile = useRef()
	const params = useParams()

	useEffect(() => {
		if (location.state?.type === 'create') {
			setPayload({
				title: location.state?.data.title,
				startDate: moment(
					location.state?.data.startDate || Date.now() + 15 * (60 * 1000),
				).format('YYYY-MM-DDTkk:mm'),
				finishDate: moment(
					location.state?.data.finishDate || Date.now() + 1 * (60 * 60 * 1000),
				).format('YYYY-MM-DDTkk:mm'),
				location:
					location.state?.data.typeEvent === false
						? location.state?.data.location
						: '',
				typeEvent: location.state?.data.typeEvent,
				description: location.state?.data.description,
				linkUrl:
					location.state?.data.typeEvent === true
						? location.state?.data.linkUrl
						: '',
				addPoint: location.state?.data.addPoint,
				limitParticipant: location.state?.data.limitParticipant,
			})
			setPreview(prev => ({
				...prev,
				imageWeb: location.state?.data.image,
				image: location.state?.data.image,
			}))
			if (location.state?.data.typeEvent) {
				const newArr =
					location.state.data.onlineEvent?.length > 0
						? location.state.data.onlineEvent?.map(el => ({
								topic: el.roomId,
								timeRoom: el.timeRoom,
								finishRoom: el.finishRoom,
								linkRoomUrl: el.linkRoomUrl,
						  }))
						: []

				setRoom(newArr)
			} else {
				const newArr =
					location.state.data.offlineEvent?.length > 0
						? location.state.data.offlineEvent?.map(el => ({
								topic: el.roomId,
								timeRoom: el.timeRoom,
								finishRoom: el.finishRoom,
								numberRoom: el.numberRoom,
						  }))
						: []

				setRoom(newArr)
			}
		}

		if (location.state?.type === 'update') {
			setupdate(true)
			fetchDetailEvent(params.eid)
		}

		window.scrollTo(0, 0)
	}, [location])

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvent(eid)
		if (response.success) {
			setPayload({
				title: response?.response?.title,
				startDate: moment(
					response?.response?.startDate || Date.now() + 15 * (60 * 1000),
				).format('YYYY-DD-MM hh:mm'),
				finishDate: moment(
					response?.response?.finishDate || Date.now() + 1 * (60 * 60 * 1000),
				).format('YYYY-DD-MM hh:mm'),
				location:
					response?.response?.typeEvent === false
						? response?.response?.location
						: '',
				typeEvent: response?.response?.typeEvent,
				description: response?.response?.description,
				linkUrl:
					response?.response?.typeEvent === true
						? response?.response?.linkUrl
						: '',
				addPoint: response?.response?.addPoint,
				limitParticipant: response?.response?.limitParticipant,
			})
			setPreview(prev => ({
				...prev,
				imageWeb: response?.response?.image,
				image: response?.response?.image,
			}))
			if (response?.response.typeEvent) {
				const newArr = response?.response.onlineEvent?.map(el => ({
					topic: el.roomId,
					timeRoom: el.timeRoom,
					linkRoomUrl: el.linkRoomUrl,
				}))
				setRoom(newArr)
			} else {
				const newArr = response?.response.offlineEvent?.map(el => ({
					topic: el.roomId,
					timeRoom: el.timeRoom,
					numberRoom: el.numberRoom,
				}))
				setRoom(newArr)
			}
		}
	}

	const handleUpdate = eid => {
		const formData = new FormData()

		if (payload.title?.length < 0 || payload.title === '')
			return setError(prev => ({
				...prev,
				tittleErr: 'Tiêu đề không được để trống',
			}))

		if (payload.typeEvent === null)
			return setError(prev => ({
				...prev,
				typeEventErr: 'Vui lòng chọn loại sự kiện',
				locationErr:
					'Vui lòng chọn loại sự kiện và điền thông tin vào trường này',
			}))

		if (payload.addPoint === 0)
			return setError(prev => ({
				...prev,
				addPointErr: 'Vui lòng nhập điểm rèn luyện',
			}))

		if (payload.limitParticipant === 0)
			return setError(prev => ({
				...prev,
				limitParticipantErr: 'Vui lòng nhập số lượng người tham gia',
			}))

		if (payload.typeEvent === true && payload.linkUrl === '')
			return setError(prev => ({
				...prev,
				locationErr: 'Vui lòng nhập địa chỉ room online',
			}))

		if (payload.typeEvent === false && payload.location === '')
			return setError(prev => ({
				...prev,
				locationErr: 'Vui lòng nhập địa điểm của sự kiện',
			}))

		if (payload.description === '')
			return setError(prev => ({
				...prev,
				descriptionErr: 'Vui lòng nhập mô tả của sự kiện',
			}))

		if (preview.image && preview.imageWeb)
			formData.append('image', preview.image)
		else
			return setError(prev => ({
				...prev,
				imageErr: 'Vui lòng chọn ảnh',
			}))

		if (
			error.tittleErr === null &&
			error.startDateErr === null &&
			error.finishDateErr === null &&
			error.locationErr === null &&
			error.typeEventErr === null &&
			error.descriptionErr === null &&
			error.addPointErr === null &&
			error.imageErr === null &&
			error.limitParticipantErr === null
		) {
			for (let i of Object.entries(payload)) {
				if (i[1] === '') continue
				if (i[1] === null) continue
				formData.append(i[0], i[1])
			}

			formData.append('rooms', JSON.stringify(room))

			for (let i of formData) {
				console.log(i[0], i[1])
			}

			return Swal.fire({
				title: 'Thông báo',
				text:
					'Bạn muốn cập nhâp lại thông tin sự kiện "' +
					payload.title +
					'" có phải không?',
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const response = await apiUpdateEvent(eid, formData)
					if (response.success) {
						setPreview({
							image: null,
							imageWeb: null,
						})
						setPayload({
							title: '',
							startDate: moment(Date.now() + 15 * (60 * 1000)).format(
								'YYYY-DD-MM hh:mm',
							),
							finishDate: moment(Date.now() + 1 * (60 * 60 * 1000)).format(
								'YYYY-DD-MM hh:mm',
							),
							location: '',
							typeEvent: null,
							description: '',
							linkUrl: '',
							addPoint: 0,
							limitParticipant: 0,
						})
						setRoom([])
						toast.success(response.mess)
						navigate(location.state.pathname)
					}
				}
			})
		}
	}

	const handleSubmit = async () => {
		const formData = new FormData()

		if (payload.title?.length < 0 || payload?.title === '')
			return setError(prev => ({
				...prev,
				tittleErr: 'Tiêu đề không được để trống',
			}))

		if (payload.typeEvent === null)
			return setError(prev => ({
				...prev,
				typeEventErr: 'Vui lòng chọn loại sự kiện',
				locationErr:
					'Vui lòng chọn loại sự kiện và điền thông tin vào trường này',
			}))

		if (payload.addPoint === 0)
			return setError(prev => ({
				...prev,
				addPointErr: 'Vui lòng nhập điểm rèn luyện',
			}))

		if (payload.limitParticipant === 0)
			return setError(prev => ({
				...prev,
				limitParticipantErr: 'Vui lòng nhập số lượng người tham gia',
			}))

		if (payload.typeEvent === true && payload.linkUrl === '')
			return setError(prev => ({
				...prev,
				locationErr: 'Vui lòng nhập địa chỉ room online',
			}))

		if (payload.typeEvent === false && payload.location === '')
			return setError(prev => ({
				...prev,
				locationErr: 'Vui lòng nhập địa điểm của sự kiện',
			}))

		if (payload.description === '')
			return setError(prev => ({
				...prev,
				descriptionErr: 'Vui lòng nhập mô tả của sự kiện',
			}))

		if (preview.image && preview.imageWeb)
			formData.append('image', preview.image)
		else
			return setError(prev => ({
				...prev,
				imageErr: 'Vui lòng chọn ảnh',
			}))

		if (
			error.tittleErr === null &&
			error.startDateErr === null &&
			error.finishDateErr === null &&
			error.locationErr === null &&
			error.typeEventErr === null &&
			error.descriptionErr === null &&
			error.addPointErr === null &&
			error.imageErr === null &&
			error.limitParticipantErr === null
		) {
			for (let i of Object.entries(payload)) {
				if (i[1] === '') continue
				if (i[1] === null) continue
				formData.append(i[0], i[1])
			}

			formData.append('rooms', JSON.stringify(room))

			// for (let i of formData) {
			// 	console.log(i[0], i[1])
			// }

			return Swal.fire({
				title: 'Thông báo',
				text:
					'Bạn muốn tạo mới sự kiện "' +
					payload.title +
					'". Nếu bạn muốn chỉnh sửa thêm, vui lòng chọn hủy. Nếu đã chắc chắn thì hãy chọn xác nhận',
				icon: 'question',
				showCancelButton: true,
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Xác nhận',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const response = await apiCreateEvent(formData)

					if (response.success) {
						setPreview({
							image: null,
							imageWeb: null,
						})
						setPayload({
							title: '',
							startDate: moment(Date.now() + 15 * (60 * 1000)).format(
								'YYYY-DD-MM hh:mm',
							),
							finishDate: moment(Date.now() + 1 * (60 * 60 * 1000)).format(
								'YYYY-DD-MM hh:mm',
							),
							location: '',
							typeEvent: null,
							description: '',
							linkUrl: '',
							addPoint: 0,
							limitParticipant: 0,
						})
						setRoom([])
						toast.success(response.mess)
					}
				}
			})
		}
	}

	const handleCreateRoom = typeEvent => {
		if (typeEvent === true)
			setRoom([
				...room,
				{
					topic: 'topic' + Math.floor(Math.random() * 10),
					timeRoom: payload.startDate,
					finishRoom: payload.finishDate,
					linkRoomUrl: '',
				},
			])
		else if (typeEvent === false)
			setRoom([
				...room,
				{
					topic: 'topic ' + Math.floor(Math.random() * 10),
					timeRoom: payload.startDate,
					finishRoom: payload.finishDate,
					numberRoom: '',
				},
			])
		else
			setError(prev => ({
				...prev,
				roomErr: 'Vui lòng chọn loại sự kiện trước!',
			}))
	}

	const handleDeleteRoom = rid => {
		const newArray = [...room]
		newArray.splice(rid, 1)
		setRoom(newArray)
	}

	const handleUpdateRoom = rid => {
		const data = room.slice(rid, rid + 1)
		dispatch(
			showModal({
				isShowModal: true,
				modalChildren: (
					<DetailRoom
						data={data[0]}
						room={room}
						setRoom={setRoom}
						rid={rid}
						typeEvent={payload.typeEvent}
					/>
				),
			}),
		)
	}

	return (
		<div className='w-full h-full px-[20px] bg-[#FAFAFA] pt-[100px] mb-[12px]'>
			<div className='z-10 px-[20px] flex items-center justify-between fixed top-0 right-0 left-[327px] bg-white h-[80px] shadow'>
				<h1 className='text-[24px] font-[700] text-[#408A7E]'>
					{update ? `Cập nhập sự kiện` : 'Tạo sự kiện'}
				</h1>
				{update ? (
					<div
						onClick={() => handleUpdate(params.eid)}
						className='w-[20%] text-center bg-[#408A7E] p-[11px] text-[14px] font-[600] text-white rounded-[8px] cursor-pointer'>
						Cập nhập sự kiện
					</div>
				) : (
					<div
						onClick={handleSubmit}
						className='w-[20%] text-center bg-[#408A7E] p-[11px] text-[14px] font-[600] text-white rounded-[8px] cursor-pointer'>
						Tạo sự kiện
					</div>
				)}
			</div>
			<div className='py-[33px] border-t border-b border-[#797799] flex flex-col gap-[20px]'>
				<div className='flex gap-[40px]'>
					<div className='flex flex-col items-center gap-1 w-full'>
						<div className='flex items-center w-full'>
							<label
								htmlFor='title'
								className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[20%]'>
								Tên sự kiện
							</label>
							<input
								type='text'
								id='title'
								className={clsx(
									'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
									error?.tittleErr ? 'border-red-400' : 'border-[#408A7E]',
								)}
								placeholder='Tên sự kiện'
								value={payload.title}
								onChange={text => {
									setPayload(prev => ({ ...prev, title: text.target.value }))
									if (payload.title?.length < 7)
										setError(prev => ({
											...prev,
											tittleErr: 'Phải nhập ít nhất 8 ký tự',
										}))
									else
										setError(prev => ({
											...prev,
											tittleErr: null,
										}))
								}}
							/>
						</div>
						{error?.tittleErr !== null && (
							<div className='flex items-center w-full'>
								<div className='w-[20%] mr-[15px]'></div>
								<small className='text-red-400 text-[12px]'>
									{error?.tittleErr}
								</small>
							</div>
						)}
					</div>

					<div className='flex flex-col items-center gap-1 w-full'>
						<div className='flex items-center w-full'>
							<label className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[20%]'>
								Loại sự kiện
							</label>
							<div
								onClick={() => {
									setShowCategoryEvent(!showCategoryEvent)
									setError(prev => ({
										...prev,
										typeEventErr: null,
										locationErr: null,
										roomErr: null,
									}))
								}}
								className={clsx(
									'relative py-[7px] px-[15px] flex-1 border bg-transparent flex items-center gap-2 cursor-pointer',
									error?.typeEventErr ? 'border-red-400' : 'border-[#408A7E]',
									!showCategoryEvent ? 'rounded-[8px]' : 'rounded-t-[8px]',
								)}>
								<p
									className={clsx(
										'text-[12px] font-[400] flex-1',
										payload.typeEvent === true || payload.typeEvent === false
											? 'text-[#408A7E]'
											: 'text-[#848484]',
									)}>
									{payload.typeEvent === true
										? 'Online'
										: payload.typeEvent === false
										? 'Offline'
										: 'Chọn loại sự kiện'}
								</p>
								<span>
									<AiOutlineDown size={16} color='#408A7E' />
								</span>
								<div
									className={clsx(
										'border bg-white border-[#408A7E] rounded-b-[8px] absolute w-full top-[100%] left-0 pt-4 flex flex-col gap-2 overflow-hidden',
										!showCategoryEvent ? 'hidden' : 'block',
									)}>
									<p
										onClick={() => {
											if (payload.typeEvent === false) setRoom([])
											setShowCategoryEvent(false)
											setPayload(prev => ({
												...prev,
												typeEvent: true,
											}))
										}}
										className=' hover:bg-[#408A7E] hover:text-white px-2 py-1 text-[12px]'>
										Online
									</p>
									<p
										onClick={() => {
											if (payload.typeEvent === true) setRoom([])
											setShowCategoryEvent(false)
											setPayload(prev => ({
												...prev,
												typeEvent: false,
											}))
										}}
										className='hover:bg-[#408A7E] hover:text-white px-2 py-1 text-[12px]'>
										Offline
									</p>
								</div>
							</div>
						</div>
						{error?.typeEventErr !== null && (
							<div className='flex items-center w-full'>
								<div className='w-[20%] mr-[15px]'></div>
								<small className='text-red-400 text-[12px]'>
									{error?.typeEventErr}
								</small>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-col items-center gap-1 w-full'>
					<div className='flex items-center w-full'>
						<label
							htmlFor='location'
							className=' text-[#B3B3B3] text-[14px] font-[600] mr-[11px] w-[10%]'>
							{payload.typeEvent === true ? 'Link URL' : 'Địa điểm'}
						</label>
						<input
							type='text'
							id='location'
							className={clsx(
								'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
								error?.locationErr ? 'border-red-400' : 'border-[#408A7E]',
							)}
							placeholder={payload.typeEvent === true ? 'Link URL' : 'Địa điểm'}
							value={
								payload.typeEvent === true ? payload.linkUrl : payload.location
							}
							onChange={text => {
								if (payload.typeEvent === true) {
									setPayload(prev => ({
										...prev,
										linkUrl: text.target.value,
										location: '',
									}))

									if (text.target.value.startsWith('https://')) {
										setError(prev => ({
											...prev,
											locationErr: null,
										}))
									} else
										setError(prev => ({
											...prev,
											locationErr:
												'Vui lòng nhập link online bắt đầu bằng https://',
										}))
								} else if (payload.typeEvent === false) {
									setPayload(prev => ({
										...prev,
										location: text.target.value,
										linkUrl: '',
									}))

									setError(prev => ({
										...prev,
										locationErr: null,
									}))
								} else
									setError(prev => ({
										...prev,
										typeEventErr: 'Vui lòng chọn loại sự kiện trước',
									}))
							}}
						/>
					</div>
					{error?.locationErr !== null && (
						<div className='flex items-center w-full'>
							<div className='w-[10%] mr-[11px]'></div>
							<small className='text-red-400 text-[12px]'>
								{error?.locationErr}
							</small>
						</div>
					)}
				</div>
			</div>
			<div className='w-full flex py-[23px]'>
				<div className='w-[60%] flex flex-col gap-[23px]'>
					<div className='flex flex-col items-center gap-[20px] border-b border-[#797799] pb-[23px]'>
						<div className='flex flex-col items-center gap-1 w-full'>
							<div className='flex items-center w-full'>
								<label
									htmlFor='addPoint'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Điểm rèn luyện
								</label>
								<input
									type='string'
									id='addPoint'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.addPointErr ? 'border-red-400' : 'border-[#408A7E]',
									)}
									placeholder='Điểm rèn luyện'
									value={payload.addPoint}
									onChange={text => {
										if (!isNaN(Number(text.target.value))) {
											setPayload(prev => ({
												...prev,
												addPoint: Number(text.target.value),
											}))
											if (Number(text.target.value) <= 0)
												setError(prev => ({
													...prev,
													addPointErr: 'Vui lòng điền số điểm khác 0',
												}))
											else
												setError(prev => ({
													...prev,
													addPointErr: null,
												}))
										} else
											setError(prev => ({
												...prev,
												addPointErr: 'Vui lòng điền số điểm',
											}))
									}}
								/>
							</div>
							{error?.addPointErr !== null && (
								<div className='flex items-center w-full'>
									<div className='w-[30%] mr-[15px]'></div>
									<small className='text-red-400 text-[12px]'>
										{error?.addPointErr}
									</small>
								</div>
							)}
						</div>
						<div className='flex flex-col items-center gap-1 w-full'>
							<div className='flex items-center w-full'>
								<label
									htmlFor='limitParticipantErr'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Số lượng người tham gia
								</label>
								<input
									type='string'
									id='limitParticipantErr'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.limitParticipantErr
											? 'border-red-400'
											: 'border-[#408A7E]',
									)}
									placeholder='Số lượng người tham gia'
									value={payload.limitParticipant}
									onChange={text => {
										if (!isNaN(Number(text.target.value))) {
											setPayload(prev => ({
												...prev,
												limitParticipant: Number(text.target.value),
											}))
											if (Number(text.target.value) === 0)
												setError(prev => ({
													...prev,
													limitParticipantErr:
														'Vui lòng nhập số lượng người tham gia khác 0',
												}))
											else
												setError(prev => ({
													...prev,
													limitParticipantErr: null,
												}))
										} else
											setError(prev => ({
												...prev,
												limitParticipantErr:
													'Vui lòng nhập số lượng người tham gia',
											}))
									}}
								/>
							</div>
							{error?.limitParticipantErr !== null && (
								<div className='flex items-center w-full'>
									<div className='w-[30%] mr-[15px]'></div>
									<small className='text-red-400 text-[12px]'>
										{error?.limitParticipantErr}
									</small>
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col items-center gap-[20px] border-[#797799] pb-[23px]'>
						<div className='flex flex-col items-center gap-1 w-full'>
							<div className='flex items-center w-full'>
								<label
									htmlFor='startDate'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Ngày bắt đầu
								</label>
								<input
									type='datetime-local'
									id='startDate'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.startDateErr ? 'border-red-400' : 'border-[#408A7E]',
									)}
									placeholder='Ngày bắt đầu'
									value={payload.startDate}
									onChange={text => {
										setPayload(prev => ({
											...prev,
											startDate: text.target.value,
										}))
									}}
								/>
							</div>
							{error?.startDateErr !== null && (
								<div className='flex items-center w-full'>
									<div className='w-[30%] mr-[15px]'></div>
									<small className='text-red-400 text-[12px]'>
										{error?.startDateErr}
									</small>
								</div>
							)}
						</div>

						<div className='flex flex-col items-center gap-1 w-full'>
							<div className='flex items-center w-full'>
								<label
									htmlFor='finishDate'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Ngày kết thúc
								</label>
								<input
									type='datetime-local'
									id='finishDate'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.finishDateErr
											? 'border-red-400'
											: 'border-[#408A7E]',
									)}
									placeholder='Ngày kết thúc'
									value={payload.finishDate}
									onChange={text => {
										setPayload(prev => ({
											...prev,
											finishDate: text.target.value,
										}))
									}}
								/>
							</div>
							{error?.finishDateErr !== null && (
								<div className='flex items-center w-full'>
									<div className='w-[30%] mr-[15px]'></div>
									<small className='text-red-400 text-[12px]'>
										{error?.finishDateErr}
									</small>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='w-[40%] px-[22px] ml-[20px] py-[27px] bg-[#EEEAE3] rounded-[8px]'>
					<label
						htmlFor='image'
						className='text-[#636363] text-[16px] font-[600] cursor-pointer'>
						Ảnh sự kiện
					</label>
					<input
						hidden
						ref={inpFile}
						type='file'
						id='image'
						onChange={async file => {
							const base64Image = await getBase64(file.target.files[0])
							setPreview(prev => ({
								...prev,
								image: file.target.files[0],
								imageWeb: base64Image,
							}))
							setError(prev => ({
								...prev,
								imageErr: null,
							}))
						}}
					/>
					<div
						onClick={() => inpFile.current.click()}
						className='flex w-full justify-center mt-2 cursor-pointer'>
						<img
							src={preview.imageWeb ? preview.imageWeb : NoImage}
							alt='thumbnail'
							className='w-full h-[200px] object-contain'
						/>
					</div>
					{error?.imageErr !== null && (
						<div className='flex items-center w-full'>
							<div className=''></div>
							<small className='text-red-400 text-[12px]'>
								{error?.imageErr}
							</small>
						</div>
					)}
				</div>
			</div>
			<div className='flex flex-col items-center w-full h-[200px] py-[19px] border-t border-b border-[#797799] gap-[20px]'>
				<div className='flex flex-col w-full gap-[12px] flex-1'>
					<label
						htmlFor='description'
						className=' text-[#B3B3B3] text-[14px] font-[600]'>
						Mô tả
					</label>
					<textarea
						type='text'
						id='description'
						className={clsx(
							'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
							error?.descriptionErr ? 'border-red-400' : 'border-[#408A7E]',
						)}
						placeholder='Mô tả'
						value={payload.description}
						onChange={text => {
							setPayload(prev => ({
								...prev,
								description: text.target.value,
							}))
							if (payload.description?.length < 7)
								setError(prev => ({
									...prev,
									descriptionErr: 'Phải nhập ít nhất 8 ký tự',
								}))
							else
								setError(prev => ({
									...prev,
									descriptionErr: null,
								}))
						}}
					/>
				</div>
				{error?.descriptionErr !== null && (
					<div className='flex items-center w-full'>
						<div className=''></div>
						<small className='text-red-400 text-[12px]'>
							{error?.descriptionErr}
						</small>
					</div>
				)}
			</div>
			<div className='py-[19px] border-b border-[#797799] flex flex-col gap-[20px]'>
				<div className='flex flex-col w-full gap-[12px]'>
					<div className='flex gap-[16px] items-center'>
						<label className=' text-[#B3B3B3] text-[14px] font-[600]'>
							Room
						</label>
						<div
							onClick={() => {
								handleCreateRoom(payload.typeEvent)
							}}
							className='text-[#408A7E] text-[14px] font-[400] px-[25px] py-[7px] border border-[#408A7E] rounded-[8px] cursor-pointer hover:bg-[#408A7E] hover:text-white'>
							Thêm room
						</div>
						{room?.length > 0 && (
							<div
								onClick={() => setRoom([])}
								className='text-[#408A7E] text-[14px] font-[400] px-[25px] py-[7px] border border-[#408A7E] rounded-[8px] cursor-pointer hover:bg-[#408A7E] hover:text-white'>
								Xóa tất cả
							</div>
						)}
					</div>
					<div
						className={clsx(
							'border border-[#408A7E] rounded-[8px] p-[12px] flex flex-wrap gap-4',
							room?.length === 0 && 'h-[164px]',
						)}>
						{room?.length > 0 &&
							room?.map((el, id) => (
								<div
									key={id}
									className={`w-[calc(25%-16px)] h-full rounded-[8px] p-2 flex flex-col gap-2 justify-center border border-[#B3B3B3]`}>
									<div className='flex gap-2 items-center'>
										<p className='text-[#B3B3B3] text-[14px] font-[600]'>
											Tên topic:
										</p>
										<p className='text-[#408A7E] text-[14px] font-[400] flex-1 line-clamp-1'>
											{el.topic}
										</p>
									</div>
									<div className='flex gap-2 items-center'>
										<p className='text-[#B3B3B3] text-[14px] font-[600]'>
											Thời gian:
										</p>
										<p className='text-[#408A7E] text-[14px] font-[400] flex-1 line-clamp-1'>
											{moment(el.timeRoom).format('hh:mm a')} -{' '}
											{moment(el.finishRoom).format('hh:mm a')}
										</p>
									</div>
									<div className='flex gap-2 items-center'>
										<p className='text-[#B3B3B3] text-[14px] font-[600]'>
											{payload.typeEvent === true ? 'Link room' : 'Số phòng'}
										</p>
										<p className='text-[#408A7E] text-[14px] font-[400] flex-1  line-clamp-1'>
											{payload.typeEvent === true
												? el.linkRoomUrl
												: el.numberRoom}
										</p>
									</div>
									<div className='flex gap-2 items-center justify-center'>
										<div
											onClick={() => handleUpdateRoom(id)}
											className='w-[100px] py-[6px] text-[14px] font-[600] text-center cursor-pointer bg-[#408A7E] text-white rounded-[8px]'>
											Chỉnh sửa
										</div>
										<div
											onClick={() => handleDeleteRoom(id)}
											className='w-[100px] py-[6px] text-[14px] font-[600] text-center cursor-pointer bg-[#408A7E] text-white rounded-[8px]'>
											Xóa
										</div>
									</div>
								</div>
							))}
					</div>
					{error?.roomErr !== null && (
						<div className='flex items-center w-full'>
							<small className='text-red-400 text-[12px]'>
								{error?.roomErr}
							</small>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(CreateEvent)
