import { configureStore } from '@reduxjs/toolkit'
import eventSlice from './event/eventSlice'
import userSlice from './user/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'

const persistConfig = {
	key: 'app/user',
	storage: AsyncStorage,
}

const userConfig = {
	...persistConfig,
	whitelist: ['isLoggedIn', 'token', 'current'],
}

export const store = configureStore({
	reducer: {
		event: eventSlice,
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
