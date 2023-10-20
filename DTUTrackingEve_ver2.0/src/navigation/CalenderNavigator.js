import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DetailEvent, CalenderScreen } from '../screens'
import withBaseComponent from '../hocs/withBaseComponent'

const CalenderNavigator = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen name='Calender' component={CalenderScreen} />
		</Stack.Navigator>
	)
}

export default withBaseComponent(CalenderNavigator)
