import React, { useEffect, useRef } from 'react'
import icons from '../../utils/icons'
import { showModal } from '../../store/app/appSlice'
import withBaseComponent from '../../hocs/withBaseComponent'

const { AiOutlineCloseCircle } = icons

function CommentModal({ dispatch }) {
	const modalRef = useRef()

	useEffect(() => {
		modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
	}, [])
	return (
		<div
			ref={modalRef}
			onClick={e => e.stopPropagation()}
			className='w-[50%] h-[50%] bg-white px-[17px] py-[19px] rounded-[8px]'>
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
		</div>
	)
}

export default withBaseComponent(CommentModal)
