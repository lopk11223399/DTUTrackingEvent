import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoggedIn: false,
		current: null,
		token: null,
		isLoading: false,
		followEvent: [],
		followEventCount: 0,
		joinEvent: [],
		joinEventCount: 0,
	},
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
			state.token = action.payload.token
			state.current = action.payload.current
		},
		logout: (state, action) => {
			state.isLoggedIn = false
			state.token = null
			state.current = null
			state.followEvent = []
			state.followEventCount = 0
			state.joinEvent = []
			state.joinEventCount = 0
		},
	},
	// Code logic xử lý async action
	extraReducers: builder => {
		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getCurrent.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.current = action.payload
			state.isLoggedIn = true
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getCurrent.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.current = null
			state.isLoggedIn = false
			state.token = null
			state.followEvent = []
			state.followEventCount = 0
			state.joinEvent = []
			state.joinEventCount = 0
		})

		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getFollowEvent.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getFollowEvent.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.followEvent = action.payload.response
			state.followEventCount = action.payload.count
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getFollowEvent.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.followEvent = []
			state.followEventCount = 0
		})

		// Bắt đầu thực hiện action login (Promise pending)
		builder.addCase(actions.getJoinEvent.pending, state => {
			// Bật trạng thái loading
			state.isLoading = true
		})
		// Khi thực hiện action login thành công (Promise fulfilled)
		builder.addCase(actions.getJoinEvent.fulfilled, (state, action) => {
			// Tắt trạng thái loading, lưu thông tin user vào store
			state.isLoading = false
			state.joinEvent = action.payload.response
			state.joinEventCount = action.payload.count
		})
		// Khi thực hiện action login thất bại (Promise rejected)
		builder.addCase(actions.getJoinEvent.rejected, (state, action) => {
			// Tắt trạng thái loading, lưu thông báo lỗi vào store
			state.isLoading = false
			state.joinEvent = []
			state.joinEventCount = 0
		})
	},
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
