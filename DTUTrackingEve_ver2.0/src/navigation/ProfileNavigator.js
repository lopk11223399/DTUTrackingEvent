import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
	ListEventFollowCurrentScreen,
	ManageAccountScreen,
	ManageViewScreen,
	ProfileScreen,
	SettingScreen,
	UpdateProfileScreen,
} from '../screens'
import withBaseComponent from '../hocs/withBaseComponent'
import FeedbackScreen from '../screens/private/FeedbackScreen'

const ProfileNavigator = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Profile'
				component={ProfileScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Setting'
				component={SettingScreen}
				options={{ headerShown: false }}
			/>
			{/* <Stack.Screen name='ChangePassword' component={SettingScreen} /> */}
			{/* <Stack.Screen name='ListEventJoined' component={ListEventJoinedScreen} />
			<Stack.Screen
				name='ListEventFollowed'
				component={ListEventFollowedScreen}
			/> */}
			<Stack.Screen name='UpdateProfile' component={UpdateProfileScreen} />
			{/* <Stack.Screen name='UpdatePassword' component={UpdatePasswordScreen} /> */}
			<Stack.Screen name='ManageView' component={ManageViewScreen} />
			<Stack.Screen name='ManageAccount' component={ManageAccountScreen} />
			<Stack.Screen name='Feedback' component={FeedbackScreen} />
			<Stack.Screen
				name='ListEventFollowCurrent'
				component={ListEventFollowCurrentScreen}
			/>
		</Stack.Navigator>
	)
}

export default withBaseComponent(ProfileNavigator)
