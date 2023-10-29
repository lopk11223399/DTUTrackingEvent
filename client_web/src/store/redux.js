import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import userSlice from './user/userSlice'
import appSlice from './app/appSlice'

const commonConfig = {
	key: 'app/user',
	storage,
}

const userConfig = {
	...commonConfig,
	whitelist: ['isLoggedIn', 'token', 'current'],
}

export const store = configureStore({
	reducer: {
		app: appSlice,
		user: persistReducer(userConfig, userSlice),
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)
