import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DetailEvent, NotificationScreen, SearchScreen } from '../screens'
import withBaseComponent from '../hocs/withBaseComponent'

const NotificationNavigator = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen name='Notification' component={NotificationScreen} />
		</Stack.Navigator>
	)
}

export default withBaseComponent(NotificationNavigator)
