import React, { useState } from 'react'
import moment from 'moment'
import { getBase64 } from '../../utils/helper'

function CreateEvent() {
	const [payload, setPayload] = useState({
		title: 'abc',
		startDate: moment().format('YYYY-MM-DD'),
		startTime: moment().format('hh:mm'),
		finishDate: moment().format('YYYY-MM-DD'),
		finishTime: moment().format('hh:mm'),
		location: '30',
		typeEvent: 'online',
		description: 'abc',
	})
	const [preview, setPreview] = useState({
		image: null,
	})

	const handleSubmit = async () => {
		const formData = new FormData()

		for (let i of Object.entries(payload)) formData.append(i[0], i[1])
		if (preview.image) formData.append('image', preview.image)
	}
	return (
		<div className='w-full h-full px-2'>
			<h1 className='text-[36px] font-bold text-center'>Tạo sự kiện</h1>

			<div>
				<label htmlFor='image'>Ảnh</label>
				<input
					type='file'
					id='image'
					onChange={async file => {
						const base64Image = await getBase64(file.target.files[0])
						setPreview(prev => ({ ...prev, image: base64Image }))
					}}
				/>

				{preview.image && (
					<div className='mt-4'>
						<img
							src={preview.image}
							alt='thumbnail'
							className='w-[200px] object-contain'
						/>
					</div>
				)}
			</div>

			<div className='flex flex-col gap-2 '>
				<label htmlFor='title'>Tên sự kiện</label>
				<input
					type='text'
					id='title'
					value={payload.title}
					onChange={text =>
						setPayload(prev => ({ ...prev, title: text.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='startDate'>ngày bắt đầu</label>
				<input
					type='date'
					id='startDate'
					value={payload.startDate}
					onChange={text =>
						setPayload(prev => ({ ...prev, startDate: text.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='startTime'>thời bắt đầu</label>
				<input
					type='time'
					id='startTime'
					value={payload.startTime}
					onChange={text =>
						setPayload(prev => ({ ...prev, startTime: text.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='finishDate'>ngày kết thúc</label>
				<input
					type='date'
					id='finishDate'
					value={payload.finishDate}
					onChange={text =>
						setPayload(prev => ({ ...prev, finishDate: text.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='finishTime'>thời kết thúc</label>
				<input
					type='time'
					id='finishTime'
					value={payload.finishTime}
					onChange={text =>
						setPayload(prev => ({ ...prev, finishTime: text.target.value }))
					}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='type'>loại sự kiện</label>
				<input type='text' id='type' />
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='location'>địa điểm</label>
				<input type='text' id='location' />
			</div>

			<div className='flex flex-col gap-2 mt-1'>
				<label htmlFor='desc'>mô tả</label>
				<textarea type='text' id='desc' />
			</div>

			<div
				onClick={handleSubmit}
				className='bg-sky-200 w-[100px] text-center py-2 mx-auto mt-2 cursor-pointer'>
				Tạo
			</div>
		</div>
	)
}

export default CreateEvent
