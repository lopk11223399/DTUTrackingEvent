import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const eventSlice = createSlice({
	name: 'event',
	initialState: {
		isLoading: false,
		newEvents: [],
		countNewEvent: 0,
		todayEvents: [],
		countTodayEvents: 0,
		hotEvents: [],
		countHotEvents: 0,
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
			state.todayEvents = action.payload.response
			state.countTodayEvents = action.payload.count
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsNew.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.todayEvents = []
			state.countTodayEvents = 0
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
			state.newEvents = action.payload.response
			state.countNewEvent = action.payload.count
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsToday.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.newEvents = []
			state.countNewEvent = 0
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
			state.hotEvents = action.payload.response
			state.countHotEvents = action.payload.count
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getEventsHot.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.hotEvents = []
			state.countHotEvents = 0
		})
	},
})

export const {} = eventSlice.actions

export default eventSlice.reducer
