import axios from '../axios'

export const apiCreateEvent = data =>
	axios({
		url: '/post',
		method: 'post',
		data,
	})

export const apiGetEvents = params =>
	axios({
		url: '/post/get-all-event',
		method: 'get',
		params,
	})

export const apiUpdateStatus = (eid, data) =>
	axios({
		url: '/status/' + eid,
		method: 'put',
		data,
	})
