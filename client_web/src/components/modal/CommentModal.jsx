import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import icons from '../../utils/icons'
import { showModal } from '../../store/app/appSlice'
import withBaseComponent from '../../hocs/withBaseComponent'
import { IoSendSharp } from 'react-icons/io5'
import {
	apiCreateComment,
	apiDeleteComment,
	apiGetDetailEvent,
	apiUpdateComment,
} from '../../apis'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import avatarDefault from '../../assets/img/avatarDefault.jpg'
import { GiMicrophone } from 'react-icons/gi'

const { AiOutlineCloseCircle } = icons

function CommentModal({ dispatch, eid }) {
	const { current } = useSelector(state => state.user)
	const [content, setContent] = useState('')
	const [checkResponse, setCheckResponse] = useState({
		idComment: null,
		value: null,
	})
	const [checkUpdate, setCheckUpdate] = useState({
		idComment: null,
		value: null,
	})
	const [checkUpdateResponse, setCheckUpdateResponse] = useState({
		idComment: null,
		value: null,
	})
	const modalRef = useRef()
	const [update, setUpdate] = useState(false)
	const [data, setData] = useState(null)

	const render = useCallback(() => {
		setUpdate(!update)
	}, [update])

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvent(eid)
		if (response.success) {
			setData(response.response)
		}
	}

	useEffect(() => {
		fetchDetailEvent(eid)
	}, [eid, update])

	const handleSend = async () => {
		if (content.length <= 0) return toast.error('Vui lòng nhập nội dung!')
		else {
			const response = await apiCreateComment({
				comment: content,
				eventId: eid,
			})
			if (response.success) {
				toast.success(response.mess)
				setContent('')
				render()
			}
		}
	}

	const handleResponse = async responseId => {
		if (checkResponse.value.length <= 0)
			return toast.error('Vui lòng nhập nội dung!')
		else {
			const response = await apiCreateComment({
				comment: checkResponse.value,
				responseId,
			})
			if (response.success) {
				toast.success(response.mess)
				setCheckResponse({ idComment: null, value: null })
				render()
			}
		}
	}

	const handleDeleteComment = async commentId => {
		return Swal.fire({
			title: 'Thông báo',
			text: 'Bạn muốn xóa bình luận này?',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Xác nhận',
		}).then(async rs => {
			if (rs.isConfirmed) {
				const response = await apiDeleteComment({ commentId })

				if (response.success) {
					toast.success(response.mess)
					render()
				}
			}
		})
	}

	const handleDeleteResponse = async responseId => {
		return Swal.fire({
			title: 'Thông báo',
			text: 'Bạn muốn xóa bình luận này?',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Xác nhận',
		}).then(async rs => {
			if (rs.isConfirmed) {
				const response = await apiDeleteComment({ responseId })

				if (response.success) {
					toast.success(response.mess)
					render()
				}
			}
		})
	}

	const handleUpdateComment = async () => {
		return Swal.fire({
			title: 'Thông báo',
			text: 'Bạn muốn cập nhật bình luận này?',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Xác nhận',
		}).then(async rs => {
			if (rs.isConfirmed) {
				const response = await apiUpdateComment({
					commentId: checkUpdate.idComment,
					comment: checkUpdate.value,
				})

				if (response.success) {
					setCheckUpdate({ idComment: null, value: null })
					toast.success(response.mess)
					render()
				}
			}
		})
	}

	const handleUpdateResponse = async () => {
		return Swal.fire({
			title: 'Thông báo',
			text: 'Bạn muốn cập nhật bình luận này?',
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Xác nhận',
		}).then(async rs => {
			if (rs.isConfirmed) {
				const response = await apiUpdateComment({
					responseId: checkUpdateResponse.idComment,
					comment: checkUpdateResponse.value,
				})

				if (response.success) {
					setCheckUpdateResponse({ idComment: null, value: null })
					toast.success(response.mess)
					render()
				}
			}
		})
	}

	useEffect(() => {
		modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
	}, [])
	return (
		<div
			ref={modalRef}
			onClick={e => e.stopPropagation()}
			className='w-[50%] h-[500px] bg-white px-[17px] py-[19px] rounded-[8px] flex flex-col justify-betwee gap-1'>
			<div className='w-full flex justify-between items-center'>
				<h1 className='text-[24px] font-[600] text-[#408A7E]'>Bình luận</h1>
				<span
					className='cursor-pointer'
					onClick={() =>
						dispatch(showModal({ isShowModal: false, modalChildren: null }))
					}>
					<AiOutlineCloseCircle size={36} color='#408A7E' />
				</span>
			</div>
			<div
				id='comment'
				className='flex-1 flex flex-col gap-2 overflow-y-scroll'>
				{data?.comments?.length > 0 &&
					data?.comments?.map(el => (
						<div key={el.id} className='flex gap-2'>
							<img
								src={el.avatar || avatarDefault}
								alt='avatar'
								className='w-[50px] h-[50px] object-cover rounded-full'
							/>
							<div className='flex-1 flex flex-col gap-1'>
								<div className='flex flex-col gap-1 bg-gray-100 px-4 py-2 rounded-md'>
									<div className='flex items-center gap-2'>
										<p className='text-[16px] text-[#408A7E] font-bold'>
											{el.name}
										</p>
										{data.author.id === el.userId && (
											<div className='flex items-center gap-1 text-gray-400 text-[12px]'>
												<GiMicrophone />
												<span className='font-[400]'>Tác giả</span>
											</div>
										)}
									</div>

									{checkUpdate.idComment === el.id ? (
										<div className='flex items-center gap-2 bg-transparent text-[#408A7E] rounded-md pr-2'>
											<textarea
												value={checkUpdate.value}
												onChange={text =>
													setCheckUpdate(prev => ({
														...prev,
														value: text.target.value,
													}))
												}
												type='text'
												placeholder='Nhập nội dung'
												className='flex-1 outline-none bg-transparent'
											/>
											<span
												className='cursor-pointer self-end'
												onClick={handleUpdateComment}>
												<IoSendSharp />
											</span>
										</div>
									) : (
										<p className='text-[16px] text-justify'>{el.comment}</p>
									)}
								</div>
								<div className='flex items-center gap-3 px-4'>
									{checkResponse.idComment === el.id ? (
										<span
											onClick={() =>
												setCheckResponse({
													idComment: null,
													value: null,
												})
											}
											className='text-[#408A7E] font-[600] cursor-pointer hover:underline'>
											Hủy phản hồi
										</span>
									) : (
										<span
											onClick={() =>
												setCheckResponse({
													idComment: el.id,
													value: null,
												})
											}
											className='text-[#408A7E] font-[600] cursor-pointer hover:underline'>
											Phản hồi
										</span>
									)}
									{+current.id === +el.userId &&
										(checkUpdate.idComment === el.id ? (
											<span
												onClick={() =>
													setCheckUpdate({ idComment: null, value: null })
												}
												className='text-blue-300 font-[600] cursor-pointer hover:underline'>
												Hủy cập nhật
											</span>
										) : (
											<span
												onClick={() =>
													setCheckUpdate({
														idComment: el.id,
														value: el.comment,
													})
												}
												className='text-blue-300 font-[600] cursor-pointer hover:underline'>
												Cập nhật
											</span>
										))}
									{+current.id === +el.userId && (
										<span
											onClick={() => handleDeleteComment(el.id)}
											className='text-red-300 font-[600] cursor-pointer hover:underline'>
											Xóa
										</span>
									)}
									<p>{moment(el.createdAt).fromNow()}</p>
								</div>
								{checkResponse.idComment === el.id && (
									<div className='flex items-center gap-2 bg-gray-100 text-[#408A7E] rounded-md py-1 px-2'>
										<input
											value={checkResponse.value}
											onChange={text =>
												setCheckResponse(prev => ({
													...prev,
													value: text.target.value,
												}))
											}
											type='text'
											placeholder='Nhập nội dung'
											className='flex-1 px-2 outline-none bg-transparent'
										/>
										<span
											className='cursor-pointer'
											onClick={() => handleResponse(checkResponse.idComment)}>
											<IoSendSharp />
										</span>
									</div>
								)}
								<div>
									{el.responseComment.length > 0 &&
										el.responseComment.map(e => (
											<div key={e.id} className='flex gap-2'>
												<img
													src={e.avatar || avatarDefault}
													alt='avatar'
													className='w-[50px] h-[50px] object-cover rounded-full'
												/>
												<div className='flex-1 flex flex-col gap-1'>
													<div className='flex flex-col gap-1 bg-gray-100 px-4 py-2 rounded-md'>
														<div className='flex items-center gap-2'>
															<p className='text-[16px] text-[#408A7E] font-bold'>
																{e.name}
															</p>
															{data.author.id === e.userId && (
																<div className='flex items-center gap-1 text-gray-400 text-[12px]'>
																	<GiMicrophone />
																	<span className='font-[400]'>Tác giả</span>
																</div>
															)}
														</div>
														{checkUpdateResponse.idComment === e.id ? (
															<div className='flex items-center gap-2 bg-transparent text-[#408A7E] rounded-md pr-2'>
																<textarea
																	value={checkUpdateResponse.value}
																	onChange={text =>
																		setCheckUpdateResponse(prev => ({
																			...prev,
																			value: text.target.value,
																		}))
																	}
																	type='text'
																	placeholder='Nhập nội dung'
																	className='flex-1 outline-none bg-transparent'
																/>
																<span
																	className='cursor-pointer self-end'
																	onClick={handleUpdateResponse}>
																	<IoSendSharp />
																</span>
															</div>
														) : (
															<p className='text-[16px] text-justify'>
																{e.response}
															</p>
														)}
													</div>
													<div className='flex items-center gap-3 px-4'>
														{+current.id === +e.userId &&
															(checkUpdateResponse.idComment === e.id ? (
																<span
																	onClick={() =>
																		setCheckUpdateResponse({
																			idComment: null,
																			value: null,
																		})
																	}
																	className='text-blue-300 font-[600] cursor-pointer hover:underline'>
																	Hủy cập nhật
																</span>
															) : (
																<span
																	onClick={() =>
																		setCheckUpdateResponse({
																			idComment: e.id,
																			value: e.response,
																		})
																	}
																	className='text-blue-300 font-[600] cursor-pointer hover:underline'>
																	Cập nhật
																</span>
															))}
														{+current.id === +e.userId && (
															<span
																onClick={() => handleDeleteResponse(e.id)}
																className='text-red-300 font-[600] cursor-pointer hover:underline'>
																Xóa
															</span>
														)}
														<p>{moment(e.createdAt).fromNow()}</p>
													</div>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					))}
			</div>
			<div className='flex items-center gap-2 bg-gray-100 text-[#408A7E] rounded-md py-1 px-2'>
				<input
					value={content}
					onChange={text => setContent(text.target.value)}
					type='text'
					placeholder='Nhập nội dung'
					className='flex-1 px-2 outline-none bg-transparent'
				/>
				<span className='cursor-pointer' onClick={handleSend}>
					<IoSendSharp />
				</span>
			</div>
		</div>
	)
}

export default withBaseComponent(memo(CommentModal))
