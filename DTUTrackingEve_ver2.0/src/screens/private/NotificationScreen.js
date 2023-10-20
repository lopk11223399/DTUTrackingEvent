import { View, SafeAreaView, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { NotificationCard, RequiresLoginComp } from '../../components'
import withBaseComponent from '../../hocs/withBaseComponent'
import { notification } from '../../utils/contants'
import iconCommentActive from '../../assets/commentActive.png'
import iconCommentNotActive from '../../assets/commentNotActive.png'
import iconSystemNotActive from '../../assets/systemNotActive.png'
import iconSystemActive from '../../assets/systemActive.png'
import iconFollowActive from '../../assets/FollowActive.png'
import iconFollowNotActive from '../../assets/FollowNotActive.png'
import NotificationTab from '../../components/notification/NotificationTab'
import { useSelector } from 'react-redux'

const AnimatedTabNotification = Animated.createAnimatedComponent(View)

const NotificationScreen = ({ navigation: { setOptions } }) => {
	const { current } = useSelector(state => state.user)
	const [notificationData, setNotificationData] = useState(null)
	const [chooseNotification, setChooseNotification] = useState('system')
	const animatedValue = useRef(new Animated.Value(0)).current

	const tabNotificationAnimation = {
		height: animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	}

	useEffect(() => {
		setNotificationData(notification)
	}, [current?.id])

	useLayoutEffect(() => {
		setOptions({
			headerShown: true,
			headerStyle: {
				backgroundColor: '#161722',
			},
			headerTitleAlign: 'center',
			headerTitleStyle: {
				color: '#e8e6e3',
			},
			headerTitle: 'Thông Báo',
		})
	}, [])

	if (current === null) {
		return (
			<SafeAreaView className='bg-background--primary--dark flex-1 justify-center'>
				<RequiresLoginComp />
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark border-t border-text-white--dark'>
			<AnimatedTabNotification
				className='flex-row w-full items-center border-b border-background--secondary--dark pb-2'
				style={[{ height: tabNotificationAnimation }]}>
				<NotificationTab
					chooseNotification={chooseNotification}
					setChooseNotification={setChooseNotification}
					type='comment'
					name='bình luận'
					imageIcon={
						chooseNotification === 'comment'
							? iconCommentActive
							: iconCommentNotActive
					}
				/>
				<NotificationTab
					chooseNotification={chooseNotification}
					setChooseNotification={setChooseNotification}
					type='follow'
					name='theo dõi'
					imageIcon={
						chooseNotification === 'follow'
							? iconFollowActive
							: iconFollowNotActive
					}
				/>
				<NotificationTab
					chooseNotification={chooseNotification}
					setChooseNotification={setChooseNotification}
					type='system'
					name='hệ thống'
					imageIcon={
						chooseNotification === 'system'
							? iconSystemActive
							: iconSystemNotActive
					}
				/>
			</AnimatedTabNotification>

			<ScrollView
				onScroll={e => {
					const offsetY = e.nativeEvent.contentOffset.y
					animatedValue.setValue(offsetY)
				}}
				scrollEventThrottle={16}
				className='p-2 mb-2'>
				{notificationData?.map((el, index) => (
					<NotificationCard type={chooseNotification} item={el} key={index} />
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default withBaseComponent(NotificationScreen)
