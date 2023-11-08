import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetDetailEvent } from '../../apis/event'
import moment from 'moment/moment'
import icons from '../../utils/icons'
import withBaseComponent from '../../hocs/withBaseComponent'
import { showModal } from '../../store/app/appSlice'
import { CommentModal } from '../../components'

const { AiOutlineRollback, TfiImport, BsChatRightTextFill } = icons

function DetailEvent({ navigate, dispatch }) {
	const { eid } = useParams()
	const [data, setData] = useState(null)

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvent(eid)
		if (response.success) {
			setData(response.response)
		}
	}

	useEffect(() => {
		fetchDetailEvent(eid)
		window.scrollTo(0, 0)
	}, [eid])

	console.log(data)

	return (
		<div className='my-[30px] mx-[56px] p-[43px] bg-white rounded-[8px] flex flex-col gap-[43px]'>
			<div className='flex items-center justify-between'>
				<div
					onClick={() => navigate(-1)}
					className='flex items-center gap-[21px] cursor-pointer text-[#B2B2B2] hover:text-[#418A7E]'>
					<span>
						<AiOutlineRollback size={21} />
					</span>
					<span className='text-[18px] font-[600]'>Quay lại</span>
				</div>
				<div className='flex items-center gap-[6px]'>
					<div
						onClick={() =>
							dispatch(
								showModal({
									isShowModal: true,
									modalChildren: <CommentModal />,
								}),
							)
						}
						className='flex items-center gap-[14px] py-[6px] px-[24px] cursor-pointer border border-[#408A7E] rounded-[4px] bg-[#408A7E] text-white'>
						<span>
							<BsChatRightTextFill size={14} />
						</span>
						<span className='text-[14px] font-[400]'>Bình luận</span>
					</div>
					<div className='flex items-center gap-[14px] py-[6px] px-[24px] text-[#408A7E] bg-white border border-[#408A7E] cursor-pointer rounded-[4px] hover:bg-[#408A7E] hover:text-white'>
						<span className='text-[14px] font-[400]'>
							Dach sách người tham gia
						</span>
						<span>
							<TfiImport size={16} />
						</span>
					</div>
				</div>
			</div>
			<div className='w-full flex items-center'>
				<div className='w-[50%] flex items-center gap-[32px]'>
					<img
						src={data?.image}
						alt='image'
						className='w-[50%] h-[150px] object-contain rounded-[8px]'
					/>
					<div className='flex flex-col flex-1 gap-[13px]'>
						<p className='text-[#000] text-[24px] font-[600] line-clamp-2'>
							{data?.title}
						</p>
						<p className='text-[#999] text-[14px] font-[400]'>
							{`Ngày tạo: ${moment(data?.createdAt).fromNow()}`}
						</p>
					</div>
				</div>
				<div className='w-[50%] flex items-center justify-around'>
					<div className='flex flex-col items-center gap-[14px]'>
						<p className='text-[#969696] text-[24px] font-[600]'>
							{data?.addPoint}
						</p>
						<p className='text-[#B3B3B3] text-[14px] font-[400]'>
							Điểm rèn luyện
						</p>
					</div>
					<div className='flex flex-col items-center gap-[14px]'>
						<p className='text-[#969696] text-[24px] font-[600]'>
							{data?.userJoined.length}
						</p>
						<p className='text-[#B3B3B3] text-[14px] font-[400]'>
							Số lượng đã tham gia
						</p>
					</div>
					<div className='flex flex-col items-center gap-[14px]'>
						<p className='text-[#969696] text-[24px] font-[600]'>
							{data?.limitParticipant}
						</p>
						<p className='text-[#B3B3B3] text-[14px] font-[400]'>
							Tổng số người tham gia
						</p>
					</div>
				</div>
			</div>
			<div className='w-full bg-white shadow-table px-[50px] py-[38px] rounded-[8px] flex flex-col gap-[27px]'>
				<p className='text-[18px] text-[#418A7E] font-[600]'>
					Thông tin người tổ chức
				</p>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600]'>
						Email
					</p>
					<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
						{data?.author?.email}
					</p>
				</div>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600]'>Tên</p>
					<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
						{data?.author?.name}
					</p>
				</div>
			</div>
			<div className='w-full bg-white shadow-table px-[50px] py-[38px] rounded-[8px] flex flex-col gap-[27px]'>
				<p className='text-[18px] text-[#418A7E] font-[600]'>
					Thông tin sự kiện
				</p>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600]'>
						Loại sự kiện
					</p>
					<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
						{data?.typeEvent === true ? 'Online' : 'Offline'}
					</p>
				</div>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600]'>
						{data?.typeEvent === true ? 'Link online' : 'Địa chỉ'}
					</p>
					{data?.typeEvent === true ? (
						<p
							onClick={() => window.open(`${data?.linkUrl}`, '_blank')}
							className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400] cursor-pointer hover:text-[#418A7E]'>
							{data?.linkUrl}
						</p>
					) : (
						<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
							{data?.location}
						</p>
					)}
				</div>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600]'>
						Thời gian diễn ra
					</p>
					<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
						{`${moment(data?.startDate).format('DD/MM/YYYY hh:mm')} - ${moment(
							data?.finishDate,
						).format('DD/MM/YYYY hh:mm')}`}
					</p>
				</div>
				<div className='flex items-center'>
					<p className='w-[160px] text-[#828282] text-[16px] font-[600] self-start py-[9px]'>
						Mô tả
					</p>
					<p className='py-[9px] px-[27px] bg-[#FAFAFA] rounded-[8px] flex-1 text-[#B3B3B3] text-[20px] font-[400]'>
						{data?.description}
					</p>
				</div>
			</div>
			<div className='w-full bg-white shadow-table px-[50px] py-[38px] rounded-[8px] flex flex-col gap-[27px]'>
				<p className='text-[18px] text-[#418A7E] font-[600]'>Phòng</p>
				<div>
					{data?.typeEvent ? (
						<div className='grid grid-cols-4 gap-[28px] '>
							{data?.onlineEvent?.map(el => (
								<div
									key={el.id}
									className='w-full col-span-1 flex flex-col items-center border rounded-[8px] px-[24px] py-[12px] gap-[12px]'>
									<img
										src={el.qrCode}
										alt='QR'
										className='w-[140px] h-[140px] object-contain'
									/>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Chủ đề:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.topic}
										</span>
									</p>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Link phòng:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.linkRoomUrl}
										</span>
									</p>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Thời gian:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.timeRoom}
										</span>
									</p>
								</div>
							))}
						</div>
					) : (
						<div className='grid grid-cols-4 gap-[28px] '>
							{data?.offlineEvent?.map(el => (
								<div
									key={el.id}
									className='w-full col-span-1 flex flex-col items-center border rounded-[8px] px-[24px] py-[12px] gap-[12px]'>
									<img
										src={el.qrCode}
										alt='QR'
										className='w-[140px] h-[140px] object-contain'
									/>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Chủ đề:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.topic}
										</span>
									</p>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Số phòng:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.numberRoom}
										</span>
									</p>
									<p className='text-[16px] font-[600] text-[#000] self-start'>
										Thời gian:{' '}
										<span className='text-[#408A7E] font-[400]'>
											{el.timeRoom}
										</span>
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(DetailEvent)
