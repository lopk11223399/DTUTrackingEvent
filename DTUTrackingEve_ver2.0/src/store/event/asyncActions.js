import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getEventsToday = createAsyncThunk(
	'event/event_today',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetEvents(data)

		// if (!response.data.err) return rejectWithValue(response.data.mess)

		return response
	},
)

export const getEventsNew = createAsyncThunk(
	'event/event_new',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetEvents(data)

		// if (!response.data.err) return rejectWithValue(response.data.mess)

		return response
	},
)

export const getEventsHot = createAsyncThunk(
	'event/event_hot',
	async (data, { rejectWithValue }) => {
		const response = await apis.apiGetEvents(data)

		// if (!response.data.err) return rejectWithValue(response.data.mess)

		return response
	},
)
