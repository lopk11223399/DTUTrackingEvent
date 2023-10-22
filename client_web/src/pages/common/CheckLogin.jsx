import { Navigate } from 'react-router-dom'
import { common, pathAdmin, pathCreator } from '../../utils/path'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getCurrent } from '../../store/user/asyncActions'

function CheckLogin({ dispatch }) {
	const { current } = useSelector(state => state.user)

	useEffect(() => {
		dispatch(getCurrent())
	}, [])

	if (+current?.roleId === 1) {
		return <Navigate to={`/${pathAdmin.ADMIN}`} replace={true} />
	} else if (+current?.roleId === 2) {
		return <Navigate to={`/${pathCreator.CREATOR}`} replace={true} />
	} else return <Navigate to={`/${common.LOGIN}`} replace={true} />
}

export default withBaseComponent(CheckLogin)
