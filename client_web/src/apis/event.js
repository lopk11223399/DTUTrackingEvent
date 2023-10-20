import axios from '../axios'

export const apiLogin = data =>
	axios({
		url: '/post',
		method: 'post',
		data,
	})
