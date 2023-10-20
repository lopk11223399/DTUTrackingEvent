import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const eventSlice = createSlice({
	name: 'event',
	initialState: {
		isLoading: false,
		newEvents: [],
		todayEvents: [],
		hotEvents: [],
	},
	reducers: {},
	// Code logic xử lý async action
	extraReducers: builder => {
		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getEventsToday.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getEventsToday.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.todayEvents = action.payload
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsNew.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.todayEvents = []
		})

		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getEventsNew.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getEventsNew.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.newEvents = action.payload
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsToday.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.newEvents = []
		})

		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getEventsHot.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getEventsHot.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.hotEvents = action.payload
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsHot.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.hotEvents = []
		})
	},
})

export const {} = eventSlice.actions

export default eventSlice.reducer
