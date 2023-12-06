import axios from '../axios'

export const apiCreateComment = data =>
	axios({
		url: 'comment/post-comment',
		method: 'post',
		data,
	})

export const apiDeleteComment = data =>
	axios({
		url: 'comment/delete-comment',
		method: 'delete',
		data,
	})

export const apiUpdateComment = data =>
	axios({
		url: 'comment/update-comment',
		method: 'put',
		data,
	})
