import axios from '../axios'

export const apiLogin = data =>
	axios({
		url: '/auth/login',
		method: 'post',
		data,
	})

export const apiGetCurrent = () =>
	axios({
		url: '/user/get-current-user',
		method: 'get',
	})
