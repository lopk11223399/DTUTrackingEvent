import {
	View,
	Text,
	Pressable,
	FlatList,
	SafeAreaView,
	StatusBar,
	Alert,
} from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { SliderBox } from 'react-native-image-slider-box'
import CardEvent from '../event/CardEvent'
import clsx from 'clsx'
import { apiGetDetailEvents, apiGetEvents, apiJoinEvent } from '../../apis'
import moment from 'moment'
import { useSelector } from 'react-redux'
import EmptyData from './EmptyData'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import RoomChoose from './RoomChoose'
import Modal from 'react-native-modal'
import { getJoinEvent } from '../../store/user/asyncActions'

const HomeComp = ({ navigation: { navigate }, layout, dispatch }) => {
	const { current, isLoggedIn } = useSelector(state => state.user)
	const { todayEvents, hotEvents } = useSelector(state => state.event)
	const { theme } = useSelector(state => state.app)
	const [eventChoose, setEventChoose] = useState(null)
	const [data, setData] = useState(null)
	const [isModalVisible, setModalVisible] = useState(false)

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			setData(response.response)
		}
	}

	useEffect(() => {
		if (eventChoose) fetchDetailEvent(eventChoose)
	}, [eventChoose])

	const handleJoinEvent = (event, item) => {
		return Alert.alert(
			'Thông báo',
			`Bạn muốn tham gia sự kiện ${event.title} với chủ đề ${item.topic} phải không?`,
			[
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Tham gia',
					onPress: async () => {
						const response = await apiJoinEvent(event.id, { roomId: item.id })

						if (response.success) {
							setModalVisible(false)
							dispatch(
								getEventsToday({
									limit: 10,
									page: 1,
									date: moment().format('YYYY-MM-DD'),
								}),
							)
							dispatch(
								getEventsNew({
									limit: 10,
									page: 1,
									order: ['createdAt', 'DESC'],
								}),
							)
							dispatch(
								getEventsHot({
									limit: 5,
									page: 1,
									hot: true,
								}),
							)

							if (current)
								dispatch(
									getJoinEvent({
										limit: 5,
										page: 1,
										order: ['createdAt', 'DESC'],
									}),
								)

							return Alert.alert('Thành Công', response.mess, [
								{
									text: 'Hủy',
									style: 'cancel',
								},
								{
									text: 'Đi đến danh sách sự kiện',
									onPress: () => navigate('ListEventFollowCurrent'),
								},
							])
						}
					},
				},
			],
		)
	}

	useEffect(() => {
		dispatch(
			getEventsToday({
				limit: 10,
				page: 1,
				date: moment().format('YYYY-MM-DD 00:00:00'),
				status: [2, 3, 4, 5],
			}),
		)
		dispatch(
			getEventsHot({
				limit: 5,
				page: 1,
				hot: true,
				// status: [2, 3, 4, 5],
			}),
		)
	}, [dispatch, isLoggedIn])

	return (
		<SafeAreaView className='flex-1'>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<View
				showsVerticalScrollIndicator={false}
				className={clsx('px-3 my-3 flex-1')}>
				{hotEvents?.length > 0 && (
					<View className='mb-2'>
						<View className='mb-3 flex-row justify-between items-center'>
							<Text
								className={clsx(
									'capitalize text-[16px] font-[700]',
									theme === 'light' && 'text-textColor_main_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-textColor_main_dark',
								)}>
								sự kiện hot
							</Text>
							<Pressable
								onPress={() => navigate('ListEvent', { chooseTabList: 'hot' })}>
								<Text className='capitalize text-[14px] font-[700] text-tColor_text'>
									xem tất cả
								</Text>
							</Pressable>
						</View>
						<SliderBox
							images={hotEvents?.map(el => el?.image)}
							ImageComponentStyle={{
								marginRight: 24,
								width: layout.width - 24,
								borderRadius: 6,
							}}
							autoplay={true}
							circleLoop={true}
							dotColor='#657ef8'
							inactiveDotColor='#fff'
							autoplayInterval={5000}
							onCurrentImagePressed={index => {
								const eventTarget = hotEvents?.find((el, id) => index === id)
								navigate('DetailEvent', {
									eventId: eventTarget?.id,
								})
							}}
						/>
					</View>
				)}
				<View className={clsx(hotEvents?.length > 0 && 'my-1', 'flex-1')}>
					<View className='mb-3 flex-row justify-between items-center'>
						<Text
							className={clsx(
								'capitalize text-[16px] font-[700]',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							sự kiện hôm nay
						</Text>
						<Pressable
							onPress={() => navigate('ListEvent', { chooseTabList: 'today' })}>
							<Text className='capitalize text-[14px] font-[700] text-tColor_text'>
								xem tất cả
							</Text>
						</Pressable>
					</View>
					{todayEvents?.length > 0 ? (
						<FlatList
							showsVerticalScrollIndicator={false}
							data={todayEvents}
							renderItem={({ item, index }) => (
								<CardEvent
									isModalVisible={isModalVisible}
									setModalVisible={setModalVisible}
									setEventChoose={setEventChoose}
									item={item}
									key={item.id}
									userId={current?.id || 0}
									borderHiden={index === todayEvents?.length - 1 ? false : true}
								/>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					) : (
						<EmptyData />
					)}
				</View>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<RoomChoose
					item={data}
					setModalVisible={setModalVisible}
					handleJoinEvent={handleJoinEvent}
				/>
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(memo(HomeComp))
