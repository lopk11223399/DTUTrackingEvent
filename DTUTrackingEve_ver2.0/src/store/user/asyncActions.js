import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCurrent = createAsyncThunk(
	'user/get-current-user',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetCurrent()

		// if (!response.data.err) return rejectWithValue(response.data.mess)

		return response.response[0]
	},
)

export const getFollowEvent = createAsyncThunk(
	'user/get-follow-userId',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetFollowEvent(data)

		if (!response.success) return rejectWithValue(response.mess)

		return response
	},
)

export const getJoinEvent = createAsyncThunk(
	'user/get-event-joined',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetJoinEvent(data)

		if (!response.success) return rejectWithValue(response.mess)

		return response
	},
)
