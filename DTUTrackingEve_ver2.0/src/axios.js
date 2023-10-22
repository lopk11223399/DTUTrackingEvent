import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const instance = axios.create({
	// nhà
	baseURL: 'http://192.168.1.123:3000/api/v1',
	// cf
	// baseURL: 'http://192.168.1.70:3000/api/v1',
	// truong
	// baseURL: 'http://172.25.159.14:3000/api/v1',
})

// Add a request interceptor
instance.interceptors.request.use(
	async function (config) {
		// Do something before request is sent
		let localStorageData = await AsyncStorage.getItem('persist:app/user')
		if (localStorageData && typeof localStorageData === 'string') {
			localStorageData = JSON.parse(localStorageData)
			const accessToken = JSON.parse(localStorageData?.token)
			config.headers = {
				Authorization: `Bearer ${accessToken}`,
			}
			return config
		} else return config
	},
	async function (error) {
		// Do something with request error
		return Promise.reject(error)
	},
)

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return error.response.data
	},
)

export default instance
