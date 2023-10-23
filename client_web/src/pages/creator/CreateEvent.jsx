import React, { useState } from 'react'
import moment from 'moment'
import { getBase64 } from '../../utils/helper'
import { apiCreateEvent } from '../../apis'

function CreateEvent() {
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

		for (let i of Object.entries(payload)) {
			if (i[1] === '') continue
			formData.append(i[0], i[1])
		}

		const response = await apiCreateEvent(formData)
		console.log(response)
	}

	return (
		<div className='w-full h-full py-[16px] px-[20px]'>
			<h1 className='text-[24px] font-[700] mb-2'>Tạo sự kiện</h1>
			<div className='flex items-center'>
				<div className='w-[50%]'>
					<label htmlFor='image' className='text-[14px] font-[700]'>
						Ảnh{' '}
					</label>
					<input
						type='file'
						id='image'
						onChange={async file => {
							const base64Image = await getBase64(file.target.files[0])
							setPreview(prev => ({
								...prev,
								image: file.target.files[0],
								imageWeb: base64Image,
							}))
						}}
					/>
				</div>
				{preview.imageWeb && (
					<div className='w-[50%]'>
						<img
							src={preview.imageWeb}
							alt='thumbnail'
							className='w-[200px] object-contain'
						/>
					</div>
				)}
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='title' className='text-[14px] font-[700] capitalize'>
					Tên sự kiện
				</label>
				<input
					type='text'
					id='title'
					className='px-2 py-1'
					value={payload.title}
					onChange={text =>
						setPayload(prev => ({ ...prev, title: text.target.value }))
					}
				/>
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label htmlFor='point' className='text-[14px] font-[700] capitalize'>
						Điểm thưởng
					</label>
					<input
						type='number'
						id='point'
						className='px-2 py-1'
						value={payload.addPoint}
						onChange={text => {
							setPayload(prev => ({
								...prev,
								addPoint: Number(text.target.value),
							}))
						}}
					/>
				</div>
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='limitParticipant'
						className='text-[14px] font-[700] capitalize'>
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
								limitParticipant: Number(text.target.value),
							}))
						}}
					/>
				</div>
			</div>

			<div className='mt-1 flex w-full gap-4'>
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='startDate'
						className='text-[14px] font-[700] capitalize'>
						ngày bắt đầu
					</label>
					<input
						type='date'
						id='startDate'
						className='px-2 py-1'
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
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='startTime'
						className='text-[14px] font-[700] capitalize'>
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
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='finishDate'
						className='text-[14px] font-[700] capitalize'>
						ngày kết thúc
					</label>
					<input
						type='date'
						id='finishDate'
						className='px-2 py-1'
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
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='finishTime'
						className='text-[14px] font-[700] capitalize'>
						thời kết thúc
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
				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label htmlFor='type' className='text-[14px] font-[700] capitalize'>
						loại sự kiện
					</label>

					<select
						id='type'
						className='px-2 py-1'
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

				<div className='flex flex-col gap-1 mt-1 w-[50%]'>
					<label
						htmlFor='location'
						className='text-[14px] font-[700] capitalize'>
						{!payload.typeEvent ? `địa điểm` : `link online`}
					</label>
					<input
						type='text'
						id='location'
						className='px-2 py-1'
						value={!payload.typeEvent ? payload.location : payload.linkUrl}
						onChange={text => {
							if (!payload.typeEvent)
								setPayload(prev => ({ ...prev, location: text.target.value }))
							else setPayload(prev => ({ ...prev, linkUrl: text.target.value }))
						}}
					/>
				</div>
			</div>

			<div className='flex flex-col gap-1 mt-1'>
				<label htmlFor='desc' className='text-[14px] font-[700] capitalize'>
					mô tả
				</label>
				<textarea
					type='text'
					id='desc'
					className='px-2 py-1'
					value={payload.description}
					onChange={text =>
						setPayload(prev => ({ ...prev, description: text.target.value }))
					}
				/>
			</div>
			<div
				onClick={handleSubmit}
				className='w-[20%] text-center bg-[#519BD0] py-2 text-[16px] font-[700] capitalize text-white rounded-[10px] hover:cursor-pointer hover:opacity-80 mt-4 mx-auto'>
				Tạo
			</div>
		</div>
	)
}

export default CreateEvent
