import React, { useState } from 'react'
import moment from 'moment'
import { getBase64 } from '../../utils/helper'
import { apiCreateEvent } from '../../apis'
import { BsCheckLg } from 'react-icons/bs'
import icons from '../../utils/icons'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { DetailRoom, Pagination } from '../../components'

const { AiOutlineUpload } = icons

function CreateEvent({ dispatch }) {
	const [error, setError] = useState({
		tittleErr: null,
		startDateErr: null,
		finishDateErr: null,
		locationErr: null,
		typeEventErr: null,
		descriptionErr: null,
		linkUrlErr: null,
		addPointErr: null,
		imageErr: null,
		limitParticipantErr: null,
	})
	const [payload, setPayload] = useState({
		title: '',
		startDate: '',
		finishDate: '',
		location: '',
		typeEvent: false,
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

	const handleSubmit = async () => {
		const formData = new FormData()

		if (preview.image) formData.append('image', preview.image)
		else
			setError(prev => ({
				...prev,
				imageErr: 'Phải up ảnh lên ',
			}))

		if (payload.title.length < 0 || payload.title === '')
			setError(prev => ({
				...prev,
				tittleErr: 'Tiêu đề không được để trống',
			}))
		if (payload.description.length < 0 || payload.description === '')
			setError(prev => ({
				...prev,
				descriptionErr: 'Mô tả không được để trống',
			}))
		if (payload.addPoint <= 0)
			setError(prev => ({
				...prev,
				addPointErr: 'Vui lòng nhập điểm',
			}))
		if (payload.limitParticipant <= 0)
			setError(prev => ({
				...prev,
				limitParticipantErr: 'Vui lòng nhập số lượng người tham gia ',
			}))
		if (payload.location.length < 0 || payload.location === '')
			setError(prev => ({
				...prev,
				locationErr: 'Địa điểm không được để trống',
			}))
		if (payload.linkUrl.length < 0 || payload.linkUrl === '')
			setError(prev => ({
				...prev,
				linkUrlErr: 'Link online không được để trống',
			}))
		for (let i of Object.entries(payload)) {
			if (i[1] === '') continue
			formData.append(i[0], i[1])
		}
		// const response = await apiCreateEvent(formData)
		// console.log(response)
	}

	const handleCreateRoom = () => {
		setRoom([
			...room,
			{ topic: '', startDate: '', finishDate: '', description: '' },
		])
	}

	const handleModal = () => {
		dispatch(
			showModal({
				isShowModal: true,
				modalChildren: <DetailRoom />,
			}),
		)
	}

	return (
		<div className='w-full h-full py-[16px] px-[20px]'>
			<h1 className='text-[24px] font-[700] mb-2 text-center'>Tạo sự kiện</h1>
			<div className='mt-4 flex flex-col w-full border rounded-md p-2 items-center'>
				<div className=''>
					<label
						htmlFor='image'
						className='text-[18px] font-[700] flex items-center'>
						Ảnh{' '}
						<span>
							<AiOutlineUpload size={36} />
						</span>
					</label>
					<input
						hidden
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
					{error?.imageErr !== null && (
						<small className='mt-[2px] text-red-400 text-[15px]'>
							{error?.imageErr}
						</small>
					)}
				</div>
				{preview.imageWeb && (
					<div className='flex w-full justify-center'>
						<img
							src={preview.imageWeb}
							alt='thumbnail'
							className='w-[20%] object-contain'
						/>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='title' className=' text-[18px] font-[700] capitalize '>
					Tên sự kiện
				</label>
				<input
					type='text'
					id='title'
					className=' px-2 py-1'
					value={payload.title}
					onChange={text => {
						setPayload(prev => ({ ...prev, title: text.target.value }))
						if (payload.title.length < 7)
							setError(prev => ({
								...prev,
								tittleErr: 'Tôi cần nhập ít nhất 8 ký tự',
							}))
						else
							setError(prev => ({
								...prev,
								tittleErr: null,
							}))
					}}
				/>
				{error?.tittleErr !== null && (
					<small className='mt-[2px] text-red-400 text-[15px]'>
						{error?.tittleErr}
					</small>
				)}
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label htmlFor='point' className=' text-[18px] font-[700] capitalize'>
						Điểm thưởng
					</label>
					<input
						type='number'
						id='point'
						className=' px-2 py-1'
						value={payload.addPoint}
						onChange={text => {
							setPayload(prev => ({ ...prev, addPoint: text.target.value }))
							if (payload.addPoint <= 0)
								setError(prev => ({
									...prev,
									addPointErr: 'Vui lòng nhập lại điểm',
								}))
							else
								setError(prev => ({
									...prev,
									addPointErr: null,
								}))
						}}
					/>
					{error?.addPointErr !== null && (
						<small className='mt-[2px] text-red-400 text-[15px]'>
							{error?.addPointErr}
						</small>
					)}
				</div>
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='limitParticipant'
						className=' text-[18px] font-[700] capitalize'>
						số lượng người tham gia
					</label>
					<input
						type='number'
						id='limitParticipant'
						className='px-2 py-1'
						value={payload.limitParticipant}
						onChange={text => {
							setPayload(prev => ({
								...prev,
								limitParticipant: text.target.value,
							}))
							if (payload.limitParticipant <= 0)
								setError(prev => ({
									...prev,
									limitParticipantErr:
										'Vui lòng nhập lại số lượng người tham gia ',
								}))
							else
								setError(prev => ({
									...prev,
									limitParticipantErr: null,
								}))
						}}
					/>
					{error?.limitParticipantErr !== null && (
						<small className='mt-[2px] text-red-400 text-[15px]'>
							{error?.limitParticipantErr}
						</small>
					)}
				</div>
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='mt-3 flex flex-col gap-1 w-[50%]'>
					<label
						htmlFor='startDate'
						className=' text-[18px] font-[700] capitalize'>
						ngày bắt đầu
					</label>
					<input
						type='date'
						id='startDate'
						className=' px-2 py-1'
						value={time.startDate}
						onChange={text => {
							setTime(prev => ({ ...prev, startDate: text.target.value }))
							if (time.startDate && time.startTime)
								setPayload(prev => ({
									...prev,
									startDate: `${time.startDate} ${time.startTime}`,
								}))
							else
								setPayload(prev => ({
									...prev,
									startDate: `${time.startDate}`,
								}))
						}}
					/>
				</div>
				<div className='mt-3 flex flex-col gap-1 w-[50%]'>
					<label
						htmlFor='startTime'
						className=' text-[18px] font-[700] capitalize'>
						thời gian bắt đầu
					</label>
					<input
						type='time'
						id='startTime'
						className='px-2 py-1'
						value={time.startTime}
						onChange={text => {
							setTime(prev => ({ ...prev, startTime: text.target.value }))
							if (time.startDate && time.startTime)
								setPayload(prev => ({
									...prev,
									startDate: `${time.startDate} ${time.startTime}`,
								}))
							else
								setPayload(prev => ({
									...prev,
									startDate: `${time.startTime}`,
								}))
						}}
					/>
				</div>
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='mt-3  flex flex-col gap-1 w-[50%]'>
					<label
						htmlFor='finishDate'
						className=' text-[18px] font-[700] capitalize'>
						ngày kết thúc
					</label>
					<input
						type='date'
						id='finishDate'
						className=' px-2 py-1'
						value={time.finishDate}
						onChange={text => {
							setTime(prev => ({ ...prev, finishDate: text.target.value }))
							if (time.finishDate && time.finishTime)
								setPayload(prev => ({
									...prev,
									finishDate: `${time.finishDate} ${time.finishTime}`,
								}))
							else
								setPayload(prev => ({
									...prev,
									finishDate: `${time.finishDate}`,
								}))
						}}
					/>
				</div>
				<div className='mt-3 flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='finishTime'
						className='  text-[18px] font-[700] capitalize'>
						thời gian kết thúc
					</label>
					<input
						type='time'
						id='finishTime'
						className='px-2 py-1'
						value={time.finishTime}
						onChange={text => {
							setTime(prev => ({ ...prev, finishTime: text.target.value }))
							if (time.finishDate && time.finishTime)
								setPayload(prev => ({
									...prev,
									finishDate: `${time.finishDate} ${time.finishTime}`,
								}))
							else
								setPayload(prev => ({
									...prev,
									finishDate: `${time.finishTime}`,
								}))
						}}
					/>
				</div>
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='mt-3  flex flex-col gap-1 w-[50%]'>
					<label htmlFor='type' className=' text-[18px] font-[700] capitalize'>
						Loại sự kiện
					</label>

					<select
						id='type'
						className='px-2 py-1 '
						value={payload.typeEvent}
						onChange={text =>
							setPayload(prev => ({
								...prev,
								typeEvent: text.target.value === 'false' ? false : true,
							}))
						}>
						<option value='false'>Offline</option>
						<option value='true'>Online</option>
					</select>
				</div>

				<div className='mt-3 flex flex-col gap-1 w-[50%]'>
					<label
						htmlFor='location'
						className=' text-[18px] font-[700] capitalize'>
						{!payload.typeEvent ? `địa điểm` : `link online`}
					</label>
					<input
						type='text'
						id='location'
						className='px-2 py-1 '
						value={!payload.typeEvent ? payload.location : payload.linkUrl}
						onChange={text => {
							if (!payload.typeEvent) {
								setPayload(prev => ({
									...prev,
									location: text.target.value,
								}))
								setError(prev => ({
									...prev,
									locationErr: null,
								}))
							} else
								setPayload(prev => ({ ...prev, linkUrl: text.target.value }))
						}}
					/>

					{error?.locationErr !== null && (
						<small className='mt-[2px] text-red-400 text-[15px]'>
							{error?.locationErr}
						</small>
					)}
				</div>
			</div>

			<div className='flex flex-col gap-1 mt-1'>
				<label
					htmlFor='desc'
					className=' text-[14px] font-[700] capitalize w-[75%]'>
					mô tả
				</label>
				<textarea
					type='text'
					id='desc'
					className=' px-2 py-1'
					value={payload.description}
					onChange={text => {
						setPayload(prev => ({ ...prev, description: text.target.value }))
						if (payload.description.length < 7)
							setError(prev => ({
								...prev,
								descriptionErr: 'Tôi cần nhập ít nhất 8 ký tự',
							}))
						else
							setError(prev => ({
								...prev,
								descriptionErr: null,
							}))
					}}
				/>
				{error?.descriptionErr !== null && (
					<small className='mt-[2px] text-red-400 text-[15px]'>
						{error?.descriptionErr}
					</small>
				)}
			</div>

			<div className='mt-2 flex w-full flex-col'>
				<div className='flex items-center gap-2'>
					<p>room</p>
					<div
						onClick={handleCreateRoom}
						className='px-2 py-1 bg-blue-300 rounded-md cursor-pointer'>
						Tạo room
					</div>
				</div>
				<div className='flex p-2 mt-2 bg-red-200 border rounded-md gap-2'>
					{room?.map((el, id) => (
						<div key={id} className=' bg-red-300 p-2 rounded-md'>
							<p>Thông tin room</p>
							<p>Topic: {el.topic}</p>
							<p>Thời gian bắt đầu: {el.startDate}</p>
							<p>Thời gian kết thúc: {el.finishDate}</p>
							<p>Mô tả: {el.description}</p>
							<div onClick={handleModal} className='cursor-pointer'>
								chỉnh sửa
							</div>
						</div>
					))}
				</div>
			</div>

			<div
				onClick={handleSubmit}
				className='w-[20%] text-center bg-[#4E73DF] py-2 text-[16px] font-[700] capitalize text-white rounded-[10px] hover:cursor-pointer hover:opacity-80 mt-4 mx-auto'>
				Tạo sự kiện
			</div>
		</div>
	)
}

export default withBaseComponent(CreateEvent)
