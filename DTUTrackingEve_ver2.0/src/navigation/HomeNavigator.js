import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
	DetailEvent,
	HomeScreen,
	ListEventScreen,
	NotificationScreen,
} from '../screens'
import withBaseComponent from '../hocs/withBaseComponent'
import { View } from 'react-native'

const HomeNavigator = ({ navigation: { navigate }, Ionicons }) => {
	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Notification'
				component={NotificationScreen}
				options={{
					headerTitle: 'Thông báo',
					headerLeft: () => (
						<View className='flex-row items-center gap-[10px]'>
							<Ionicons
								onPress={() => navigate('Home')}
								name='arrow-back'
								size={24}
								color='black'
							/>
						</View>
					),
				}}
			/>
			<Stack.Screen name='ListEvent' component={ListEventScreen} />
		</Stack.Navigator>
	)
}

export default withBaseComponent(HomeNavigator)
