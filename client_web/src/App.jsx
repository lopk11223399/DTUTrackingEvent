import { Route, Routes } from 'react-router-dom'
import { common, pathAdmin, pathCreator } from './utils/path'
import { Login } from './pages/common'
import { AdminLayout, ManageEvent, ManageUser, Calendar } from './pages/admin'
import CheckLogin from './pages/common/CheckLogin'
import { CreateEvent, CreatorLayout } from './pages/creator'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from './components'

function App() {
	const { isShowModal, modalChildren } = useSelector(state => state.app)
	return (
		<div className='h-screen relative'>
			{isShowModal && <Modal>{modalChildren}</Modal>}
			<Routes>
				<Route path={'/'} element={<CheckLogin />} />
				<Route path={common.LOGIN} element={<Login />} />
				<Route path={pathAdmin.ADMIN} element={<AdminLayout />}>
					<Route path={pathAdmin.CALENDAR} element={<Calendar />} />
					<Route path={pathAdmin.MANAGE_EVENT} element={<ManageEvent />} />
					<Route path={pathAdmin.MANAGE_USERS} element={<ManageUser />} />
				</Route>
				<Route path={pathCreator.CREATOR} element={<CreatorLayout />}>
					<Route path={pathCreator.CREATE_EVENT} element={<CreateEvent />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
