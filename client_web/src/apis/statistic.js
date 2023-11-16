import axios from '../axios'

export const apiGetFivePeopleHot = () =>
	axios({
		url: '/statistic/5-people-hot',
		method: 'get',
	})

export const apiGettotalRateOfAuthor = () =>
	axios({
		url: '/statistic/total-rate-author',
		method: 'get',
	})
