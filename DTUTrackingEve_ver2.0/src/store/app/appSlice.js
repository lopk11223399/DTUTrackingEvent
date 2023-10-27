import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
	name: 'app',
	initialState: {
		theme: 'dark-default',
	},
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload.theme
		},
	},
	// Code logic xử lý async action
	extraReducers: builder => {},
})

export const { changeTheme } = eventSlice.actions

export default eventSlice.reducer
