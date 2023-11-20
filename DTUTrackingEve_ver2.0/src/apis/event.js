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

export const apiFeedbackEvent = (eid, data) =>
	axios({
		url: '/feedback/' + eid,
		method: 'post',
		data,
	})

export const apiScanQREvent = data =>
	axios({
		url: '/post/scanQr/',
		method: 'put',
		data,
	})
