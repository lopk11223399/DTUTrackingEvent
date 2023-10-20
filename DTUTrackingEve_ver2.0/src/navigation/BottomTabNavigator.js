import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { QRScreen } from '../screens'
import HomeNavigator from './HomeNavigator'
import withBaseComponent from '../hocs/withBaseComponent'
import CalenderNavigator from './CalenderNavigator'
import ProfileNavigator from './ProfileNavigator'
import NotificationNavigator from './NotificationNavigator'

const BottomTabNavigator = ({ Entypo, Ionicons, AntDesign, FontAwesome5 }) => {
	const Tab = createBottomTabNavigator()

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#161722',
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: 600,
					textTransform: 'capitalize',
				},
				tabBarActiveTintColor: '#62a2f8',
				tabBarInactiveTintColor: '#737377',
				headerShown: false,
			}}>
			<Tab.Screen
				name='HomeStack'
				component={HomeNavigator}
				options={{
					tabBarLabel: 'Trang chủ',
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Entypo name='home' size={24} color='#62a2f8' />
						) : (
							<Entypo name='home' size={24} color='#737377' />
						),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='NotificationStack'
				component={NotificationNavigator}
				options={{
					tabBarLabel: 'Thông báo',
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Ionicons name='ios-notifications' size={24} color='#62a2f8' />
						) : (
							<Ionicons name='ios-notifications' size={24} color='#737377' />
						),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='QR'
				component={QRScreen}
				options={{
					tabBarIcon: ({ focused }) =>
						focused ? (
							<AntDesign name='qrcode' size={24} color='#62a2f8' />
						) : (
							<AntDesign name='qrcode' size={24} color='#737377' />
						),
					headerShown: false,
					tabBarStyle: { display: 'none' },
				}}
			/>
			<Tab.Screen
				name='CalenderStack'
				component={CalenderNavigator}
				options={{
					tabBarLabel: 'Lịch',
					tabBarIcon: ({ focused }) =>
						focused ? (
							<Entypo name='calendar' size={24} color='#62a2f8' />
						) : (
							<Entypo name='calendar' size={24} color='#737377' />
						),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='ProfileStack'
				component={ProfileNavigator}
				options={{
					tabBarLabel: 'Cá nhân',
					tabBarIcon: ({ focused }) =>
						focused ? (
							<FontAwesome5 name='user-cog' size={24} color='#62a2f8' />
						) : (
							<FontAwesome5 name='user-cog' size={24} color='#737377' />
						),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	)
}

export default withBaseComponent(BottomTabNavigator)
