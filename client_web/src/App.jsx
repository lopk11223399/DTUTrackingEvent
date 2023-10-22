import { Route, Routes } from 'react-router-dom'
import { common, pathAdmin, pathCreator } from './utils/path'
import { Login } from './pages/common'
import { AdminLayout, ManageEvent } from './pages/admin'
import CheckLogin from './pages/common/CheckLogin'
import { CreateEvent, CreatorLayout } from './pages/creator'

function App() {
	return (
		<Routes>
			<Route path={'/'} element={<CheckLogin />} />
			<Route path={common.LOGIN} element={<Login />} />
			<Route path={pathAdmin.ADMIN} element={<AdminLayout />}>
				<Route path={pathAdmin.MANAGE_EVENT} element={<ManageEvent />} />
			</Route>
			<Route path={pathCreator.CREATOR} element={<CreatorLayout />}>
				<Route path={pathCreator.CREATE_EVENT} element={<CreateEvent />} />
			</Route>
		</Routes>
	)
}

export default App
