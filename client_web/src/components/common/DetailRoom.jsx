import React, { memo, useState, useEffect, useRef } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import icons from '../../utils/icons'
import { showModal } from '../../store/app/appSlice'

const { AiOutlineCloseCircle } = icons

function DetailRoom({ data, room, setRoom, rid, typeEvent, dispatch }) {
	const modalRef = useRef()
	const [roomCurrent, setRoomCurrent] = useState(data)

	useEffect(() => {
		modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
	}, [])

	const handleSubmit = () => {
		const newArray = [...room]
		newArray.splice(rid, 1, roomCurrent)
		setRoom(newArray)
		dispatch(showModal({ isShowModal: false, modalChildren: null }))
	}
	return (
		<div
			ref={modalRef}
			onClick={e => e.stopPropagation()}
			className='w-[50%] bg-[#fff] flex flex-col justify-center gap-[12px] px-[17px] py-[19px] rounded-[8px]'>
			<div className='w-full flex justify-end'>
				<span
					className='cursor-pointer'
					onClick={() =>
						dispatch(showModal({ isShowModal: false, modalChildren: null }))
					}>
					<AiOutlineCloseCircle size={36} color='#408A7E' />
				</span>
			</div>
			<p className='text-[#408A7E] text-[18px] font-[600]'>{`Cập nhập ${roomCurrent.topic}`}</p>
			<div className='flex flex-col justify-center gap-[12px] py-[23px] border-t border-b'>
				<div className='flex items-center gap-[15px] w-full'>
					<label
						htmlFor='topic'
						className='text-[#B3B3B3] text-[14px] font-[600] w-[120px]'>
						Topic:
					</label>
					<input
						value={roomCurrent.topic}
						type='text'
						placeholder='Topic'
						className='text-[12px] text-[#408A7E] outline-none py-[7px] px-[15px] border border-[#408A7E] flex-1 rounded-[8px]'
						onChange={text => {
							setRoomCurrent(prev => ({ ...prev, topic: text.target.value }))
						}}
					/>
				</div>
				<div className='flex items-center gap-[15px] w-full'>
					<label
						htmlFor='topic'
						className='text-[#B3B3B3] text-[14px] font-[600] w-[120px]'>
						Thời gian bắt đầu:
					</label>
					<input
						value={roomCurrent.timeRoom}
						type='time'
						placeholder='Topic'
						className='text-[12px] text-[#408A7E] outline-none py-[7px] px-[15px] border border-[#408A7E] flex-1 rounded-[8px]'
						onChange={text => {
							setRoomCurrent(prev => ({ ...prev, timeRoom: text.target.value }))
						}}
					/>
				</div>
				<div className='flex items-center gap-[15px] w-full'>
					<label
						htmlFor='topic'
						className='text-[#B3B3B3] text-[14px] font-[600] w-[120px]'>
						{typeEvent === true ? 'Link room:' : 'Số phòng:'}
					</label>
					<input
						value={
							typeEvent === true
								? roomCurrent.linkRoomUrl
								: roomCurrent.numberRoom
						}
						type='text'
						placeholder='Topic'
						className='text-[12px] text-[#408A7E] outline-none py-[7px] px-[15px] border border-[#408A7E] flex-1 rounded-[8px]'
						onChange={text => {
							if (typeEvent === true)
								setRoomCurrent(prev => ({
									...prev,
									linkRoomUrl: text.target.value,
								}))
							else if (typeEvent === false)
								setRoomCurrent(prev => ({
									...prev,
									numberRoom: text.target.value,
								}))
						}}
					/>
				</div>
			</div>
			<div className='flex gap-[18px] items-center justify-center mt-[22px]'>
				<div
					onClick={() =>
						dispatch(showModal({ isShowModal: false, modalChildren: null }))
					}
					className='text-[#408A7E] border-[#408A7E] text-[14px] font-[600] py-[11px] w-[120px] border text-center rounded-[8px] cursor-pointer hover:bg-[#408A7E] hover:text-white'>
					Hủy
				</div>
				<div
					onClick={() => handleSubmit()}
					className='text-white border-[#408A7E] bg-[#408A7E] text-[14px] font-[600] py-[11px] w-[120px] border text-center rounded-[8px] cursor-pointer'>
					Lưu
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(memo(DetailRoom))
