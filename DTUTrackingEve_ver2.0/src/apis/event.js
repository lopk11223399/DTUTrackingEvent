import axios from '../axios'

export const apiGetEvents = params =>
	axios({
		url: '/post/get-all-event',
		method: 'get',
		params,
	})

export const apiGetDetailEvents = eid =>
	axios({
		url: '/post/detail-event/' + eid,
		method: 'get',
	})
