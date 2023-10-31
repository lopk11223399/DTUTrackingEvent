import React, { useRef, useState } from 'react'
import moment from 'moment'
import { getBase64 } from '../../utils/helper'
import { apiCreateEvent } from '../../apis'
import icons from '../../utils/icons'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { DetailRoom } from '../../components'
import clsx from 'clsx'
import NoImage from '../../assets/img/NoImage.jpg'
import { v4 as uuidv4 } from 'uuid'

const { AiOutlineDown } = icons

function CreateEvent({ dispatch }) {
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
	})
	const [payload, setPayload] = useState({
		title: '',
		startDate: '',
		finishDate: '',
		location: '',
		typeEvent: null,
		description: '',
		linkUrl: '',
		addPoint: 0,
		limitParticipant: 0,
	})
	const [room, setRoom] = useState([])
	const [time, setTime] = useState({
		startDate: moment().format('YYYY-MM-DD'),
		startTime: moment().format('hh:mm'),
		finishDate: moment().format('YYYY-MM-DD'),
		finishTime: moment().format('hh:mm'),
	})
	const [preview, setPreview] = useState({
		image: null,
		imageWeb: null,
	})
	const [showCategoryEvent, setShowCategoryEvent] = useState(false)
	const inpFile = useRef()

	const handleSubmit = async () => {
		const formData = new FormData()

		if (payload.title.length < 0 || payload.title === '')
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
			// console.log(payload)
			for (let i of Object.entries(payload)) {
				// if (i[0] == 'startDate' && i[1].length === 0)
				// 	formData.append(i[0], `${moment().format('YYYY-MM-DD hh:mm')}`)
				// if (i[0] === 'finishDate' && i[1].length === 0)
				// 	formData.append(i[0], `${moment().format('YYYY-MM-DD hh:mm')}`)
				if (i[1] === '') continue
				if (i[1] === null) continue
				formData.append(i[0], i[1])
			}

			if (room.length > 0) formData.append('rooms', JSON.stringify(room))

			for (let i of formData) {
				console.log(i[0], i[1])
			}

			const response = await apiCreateEvent(formData)
			console.log(response)
		}
	}

	// console.log(payload)

	const handleCreateRoom = typeEvent => {
		console.log(typeEvent)
		if (typeEvent === true)
			setRoom([
				...room,
				{
					topic: 'topic' + Math.floor(Math.random() * 10),
					timeRoom: time.startTime || moment().format('hh:mm'),
					linkRoomUrl: '',
				},
			])
		else if (typeEvent === false)
			setRoom([
				...room,
				{
					topic: 'topic ' + Math.floor(Math.random() * 10),
					timeRoom: time.startTime || moment().format('hh:mm'),
					numberRoom: '',
				},
			])
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
				<h1 className='text-[18px] font-[600] text-[#408A7E]'>Tạo sự kiện</h1>
				<div
					onClick={handleSubmit}
					className='w-[20%] text-center bg-[#408A7E] p-[11px] text-[14px] font-[600] text-white rounded-[8px] cursor-pointer'>
					Tạo sự kiện
				</div>
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
									if (payload.title.length < 7)
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
									type='text'
									id='addPoint'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.addPointErr ? 'border-red-400' : 'border-[#408A7E]',
									)}
									placeholder='Điểm rèn luyện'
									value={payload.addPoint}
									onChange={text => {
										setPayload(prev => ({
											...prev,
											addPoint: Number(text.target.value),
										}))
										if (Number(text.target.value) === 0)
											setError(prev => ({
												...prev,
												addPointErr: 'Vui lòng điền số điểm',
											}))
										else
											setError(prev => ({
												...prev,
												addPointErr: null,
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
									type='text'
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
										setPayload(prev => ({
											...prev,
											limitParticipant: Number(text.target.value),
										}))
										if (Number(text.target.value) === 0)
											setError(prev => ({
												...prev,
												limitParticipantErr:
													'Vui lòng nhập số lượng người tham gia',
											}))
										else
											setError(prev => ({
												...prev,
												limitParticipantErr: null,
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
									type='date'
									id='startDate'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.startDateErr ? 'border-red-400' : 'border-[#408A7E]',
									)}
									placeholder='Ngày bắt đầu'
									value={time.startDate}
									onChange={text => {
										setTime(prev => ({
											...prev,
											startDate: text.target.value,
										}))
										if (text.target.value && time.startTime)
											setPayload(prev => ({
												...prev,
												startDate: `${text.target.value} ${time.startTime}`,
											}))
										else
											setPayload(prev => ({
												...prev,
												startDate: `${text.target.value}`,
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
									htmlFor='startTime'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Thời gian bắt đầu
								</label>
								<input
									type='time'
									id='startTime'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.startDateErr ? 'border-red-400' : 'border-[#408A7E]',
									)}
									placeholder='Số lượng người tham gia'
									value={time.startTime}
									onChange={text => {
										setTime(prev => ({
											...prev,
											startTime: text.target.value,
										}))
										if (time.startDate && text.target.value)
											setPayload(prev => ({
												...prev,
												startDate: `${time.startDate} ${text.target.value}`,
											}))
										else
											setPayload(prev => ({
												...prev,
												startDate: `${text.target.value}`,
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
									type='date'
									id='finishDate'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.finishDateErr
											? 'border-red-400'
											: 'border-[#408A7E]',
									)}
									placeholder='Ngày kết thúc'
									value={time.finishDate}
									onChange={text => {
										setTime(prev => ({
											...prev,
											finishDate: text.target.value,
										}))
										if (text.target.value && time.finishTime)
											setPayload(prev => ({
												...prev,
												finishDate: `${text.target.value} ${time.finishTime}`,
											}))
										else
											setPayload(prev => ({
												...prev,
												finishDate: `${text.target.value}`,
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
						<div className='flex flex-col items-center gap-1 w-full'>
							<div className='flex items-center w-full'>
								<label
									htmlFor='finishTime'
									className=' text-[#B3B3B3] text-[14px] font-[600] mr-[15px] w-[30%]'>
									Thời gian kết thúc
								</label>
								<input
									type='time'
									id='finishTime'
									className={clsx(
										'rounded-[8px] py-[7px] px-[15px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent',
										error?.finishDateErr
											? 'border-red-400'
											: 'border-[#408A7E]',
									)}
									placeholder='Thời gian kết thúc'
									value={time.finishTime}
									onChange={text => {
										setTime(prev => ({
											...prev,
											finishTime: text.target.value,
										}))
										if (time.finishDate && text.target.value)
											setPayload(prev => ({
												...prev,
												finishDate: `${time.finishDate} ${text.target.value}`,
											}))
										else
											setPayload(prev => ({
												...prev,
												finishDate: `${text.target.value}`,
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
							className='w-full h-[300px] object-contain'
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
			<div className='py-[19px] border-t border-b border-[#797799] flex flex-col gap-[20px]'>
				<div className='flex flex-col items-center gap-1 w-full'>
					<div className='flex flex-col w-full gap-[12px]'>
						<label
							htmlFor='description'
							className=' text-[#B3B3B3] text-[14px] font-[600]'>
							Mô tả
						</label>
						<textarea
							type='text'
							id='description'
							className={clsx(
								'rounded-[8px] py-[17px] px-[21px] flex-1 placeholder:text-[#848484] text-[#408A7E] text-[12px] font-[400] outline-none border bg-transparent h-[106px]',
								error?.descriptionErr ? 'border-red-400' : 'border-[#408A7E]',
							)}
							placeholder='Mô tả'
							value={payload.description}
							onChange={text => {
								setPayload(prev => ({
									...prev,
									description: text.target.value,
								}))
								if (payload.description.length < 7)
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
						{room.length > 0 && (
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
							room.length === 0 && 'h-[164px]',
						)}>
						{room.length > 0 &&
							room.map((el, id) => (
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
											Thời gian bắt đầu:
										</p>
										<p className='text-[#408A7E] text-[14px] font-[400] flex-1 line-clamp-1'>
											{el.timeRoom}
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
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(CreateEvent)
