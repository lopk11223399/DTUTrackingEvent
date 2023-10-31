import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		isShowModal: false,
		modalChildren: null,
	},
	reducers: {
		showModal: (state, action) => {
			state.isShowModal = action.payload.isShowModal
			state.modalChildren = action.payload.modalChildren
		},
	},
	// Code logic xử lý async action
	extraReducers: builder => {},
})

export const { showModal } = appSlice.actions

export default appSlice.reducer // reducer là export cả reducers vs extraReducers
