import { AdminSidebar, CreatorSidebar } from '../../components'
import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const CreatorLayout = () => {
	return (
		<div className='flex w-full bg-gray-100 min-h-screen relative text-gray-900'>
			<div className='w-[327px] top-0 bottom-0 flex-none fixed'>
				<CreatorSidebar />
			</div>
			<div className='w-[327px]'></div>
			<div className='flex-auto'>
				<Outlet />
			</div>
		</div>
	)
}

export default CreatorLayout
