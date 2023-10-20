import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import {
	DetailEvent,
	ForgotPasswordScreen,
	LoginScreen,
	RegisterScreen,
} from '../screens'
import BottomTabNavigator from './BottomTabNavigator'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { darkView, lightView, settingView } from '../utils/contants'

const StackNavigator = () => {
	const Stack = createNativeStackNavigator()
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	const getView = async () => {
	// 		try {
	// 			const response =
	// 				(await AsyncStorage.getItem('ViewApp')) || settingView[0].value
	// 			if (response === settingView[0].value) dispatch(addTheme(darkView))
	// 			else if (response === settingView[1].value)
	// 				dispatch(addTheme(lightView))
	// 			else if (response === settingView[2].value) dispatch(addTheme(darkView))
	// 		} catch (error) {}
	// 	}
	// 	getView()
	// }, [])
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Main'
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ headerShown: false, animation: 'slide_from_bottom' }}
				/>
				<Stack.Screen
					name='Register'
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ForgotPassword'
					component={ForgotPasswordScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='DetailEvent'
					component={DetailEvent}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default StackNavigator
