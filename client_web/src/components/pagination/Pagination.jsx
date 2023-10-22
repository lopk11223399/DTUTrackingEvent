import React, { memo } from 'react'
import usePagination from '../../hooks/usePagination'
import { useSearchParams } from 'react-router-dom'
import { PaginationItem } from '..'

const Pagination = ({ totalCount }) => {
	const [params] = useSearchParams()
	const pagination = usePagination(totalCount, +params.get('page') || 1)

	const range = () => {
		const curentPage = +params.get('page')
		const pageSize = +import.meta.env.VITE_REACT_APP_LIMIT || 10
		const start = Math.min((curentPage - 1) * pageSize + 1, totalCount)
		const end = Math.min(curentPage * pageSize, totalCount)

		return `${start} - ${end}`
	}

	// 3 => 21 - 30

	return (
		<div className='flex w-full justify-between items-center'>
			{!+params.get('page') && (
				<span className='text-sm italic'>{`Có ${Math.min(
					totalCount,
					1,
				)} - ${Math.min(
					+import.meta.env.VITE_REACT_APP_LIMIT,
					totalCount,
				)} sự kiện của tổng ${totalCount} sự kiện`}</span>
			)}
			{params.get('page') && (
				<span className='text-sm italic'>{`Có ${range()} sự kiện của tổng ${totalCount} sự kiện`}</span>
			)}
			<div className='flex items-center'>
				{pagination?.map(el => (
					<PaginationItem key={el}>{el}</PaginationItem>
				))}
			</div>
		</div>
	)
}

export default memo(Pagination)
