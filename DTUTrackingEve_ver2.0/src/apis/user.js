import axios from '../axios'

export const apiRegister = data =>
	axios({
		url: '/auth/register',
		method: 'post',
		data,
	})

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

export const apiFollowEvent = eid =>
	axios({
		url: '/follow/' + eid,
		method: 'post',
	})

export const apiGetFollowEvent = params =>
	axios({
		url: '/follow/get-follow-userId',
		method: 'get',
		params,
	})

export const apiJoinEvent = (eid, data) =>
	axios({
		url: '/joinEvent/' + eid,
		method: 'post',
		data,
	})

export const apiGetJoinEvent = params =>
	axios({
		url: '/user/get-event-joined',
		method: 'get',
		params,
	})
