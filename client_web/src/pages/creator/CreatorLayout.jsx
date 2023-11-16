import { CreatorSidebar } from '../../components'
import { Outlet, Navigate } from 'react-router-dom'
import { common } from '../../utils/path'
import Swal from 'sweetalert2'
import withBaseComponent from '../../hocs/withBaseComponent'
import { useSelector } from 'react-redux'

const CreatorLayout = ({ navigate }) => {
	const { current, isLoggedIn } = useSelector(state => state.user)

	if (!isLoggedIn) {
		return <Navigate to={`/${common.LOGIN}`} replace={true} />
	} else if (+current?.roleId !== 2) {
		Swal.fire({
			title: 'Thông báo',
			text: 'Bạn không có đủ quyền hạn để truy cập vào đây',
			icon: 'error',
			confirmButtonText: 'Xác nhận',
		}).then(rs => {
			if (rs.isConfirmed) {
				return navigate(`/${common.LOGIN}`)
			}
		})
	} else
		return (
			<div className='flex w-full bg-gray-100 min-h-screen relative text-gray-900'>
				<div className='w-[327px] top-0 bottom-0 flex-none fixed'>
					<CreatorSidebar />
				</div>
				<div className='w-[327px]'></div>
				<div className='flex-1'>
					<Outlet />
				</div>
			</div>
		)
}

export default withBaseComponent(CreatorLayout)
