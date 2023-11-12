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

export const apiUpdateCurrent = data =>
	axios({
		url: '/user/update-user',
		method: 'put',
		data,
	})

export const apiUser = params =>
	axios({
		url: '/user',
		method: 'get',
		params,
	})

export const apiUpdateRoleId = (data, params) => {
	console.log(data, params)
	return axios({
		url: `/user/update-role?id=${params.id}`,
		method: 'put',
		data: data,
	})
}
