import {
	View,
	Text,
	Image,
	Pressable,
	StatusBar,
	SafeAreaView,
	Animated,
	Alert,
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import { apiFollowEvent, apiGetDetailEvents, apiJoinEvent } from '../../apis'
import moment from 'moment'
import avatarDefault from '../../assets/avatarDefault.png'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import { getFollowEvent, getJoinEvent } from '../../store/user/asyncActions'
import { useSelector } from 'react-redux'

const DetailEvent = ({
	route,
	navigation: { goBack, navigate },
	Ionicons,
	Entypo,
	FontAwesome,
	FontAwesome5,
	dispatch,
	MaterialIcons,
}) => {
	const { eventId, userId } = route.params
	const { theme } = useSelector(state => state.app)
	const [data, setData] = useState({})
	const [update, setUpdate] = useState(false)
	const animatedValue = useRef(new Animated.Value(0)).current
	const opacityyyy = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	})
	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			setUpdate(false)
			setData(response.response)
		}
	}

	useEffect(() => {
		fetchDetailEvent(eventId)
	}, [eventId, update])

	useEffect(() => {
		fetchDetailEvent(eventId)
	}, [update])

	const handleFollow = async () => {
		if (userId === 0) {
			return Alert.alert('Bạn chưa đăng nhập', 'Đi đến trang đăng nhập', [
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Đi đến Login',
					onPress: () => navigate('Login', { eventId: eventId }),
				},
			])
		} else {
			if (data?.followers?.some(el => el.id === userId))
				return Alert.alert(
					'Thông báo',
					`Bạn muốn hủy theo dõi sự kiện ${data.title} phải không?`,
					[
						{
							text: 'Hủy',
							style: 'cancel',
						},
						{
							text: 'Bỏ theo dõi',
							onPress: async () => {
								const reponse = await apiFollowEvent(data.id)

								if (reponse.success) {
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

									if (userId !== 0)
										dispatch(
											getFollowEvent({
												limit: 10,
												page: 1,
												order: ['createdAt', 'DESC'],
											}),
										)

									setUpdate(true)

									return Alert.alert('Thành Công', reponse.mess, [
										{
											text: 'Hủy',
											style: 'cancel',
										},
										{
											text: 'Sự kiện theo dõi',
											onPress: () =>
												navigate('ProfileStack', {
													screen: 'ListEventFollowCurrent',
												}),
										},
									])
								}
							},
						},
					],
				)

			return Alert.alert(
				'Thông báo',
				`Bạn muốn theo dõi sự kiện ${data.title} phải không?`,
				[
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Theo dõi',
						onPress: async () => {
							const reponse = await apiFollowEvent(data.id)

							if (reponse.success) {
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

								if (userId !== 0)
									dispatch(
										getFollowEvent({
											limit: 10,
											page: 1,
											order: ['createdAt', 'DESC'],
										}),
									)

								setUpdate(true)

								return Alert.alert('Thành Công', reponse.mess, [
									{
										text: 'Hủy',
										style: 'cancel',
									},
									{
										text: 'Sự kiện theo dõi',
										onPress: () => navigate('ListEventFollowCurrent'),
									},
								])
							}
						},
					},
				],
			)
		}
	}

	const handleJoinEvent = () => {
		if (userId === 0) {
			return Alert.alert('Bạn chưa đăng nhập', 'Đi đến trang đăng nhập', [
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Đi đến Login',
					onPress: () => navigate('Login', { eventId: eventId }),
				},
			])
		} else {
			if (
				data?.userJoined?.length >= data?.limitParticipant &&
				!data?.userJoined?.some(el => el.id === userId)
			) {
				return Alert.alert('Thông báo', 'Sự kiện này đã hết chỗ tham dự')
			} else if (data?.statusEvent?.id === 2 || data?.statusEvent?.id === 3) {
				if (data?.userJoined?.some(el => el.id === userId)) {
					return Alert.alert(
						'Thông báo',
						`Bạn muốn hủy tham gia sự kiện ${data.title} phải không?`,
						[
							{
								text: 'Hủy',
								style: 'cancel',
							},
							{
								text: 'Hủy tham gia',
								onPress: async () => {
									const reponse = await apiJoinEvent(data.id)

									if (reponse.success) {
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

										if (userId !== 0)
											dispatch(
												getJoinEvent({
													limit: 5,
													page: 1,
													order: ['createdAt', 'DESC'],
												}),
											)

										setUpdate(true)

										return Alert.alert('Thành Công', reponse.mess, [
											{
												text: 'Hủy',
												style: 'cancel',
											},
											{
												text: 'Sự kiện tham gia',
												onPress: () => navigate('ListEventFollowCurrent'),
											},
										])
									}
								},
							},
						],
					)
				}

				return Alert.alert(
					'Thông báo',
					`Bạn muốn tham gia sự kiện ${data.title} phải không?`,
					[
						{
							text: 'Hủy',
							style: 'cancel',
						},
						{
							text: 'Tham gia',
							onPress: async () => {
								const reponse = await apiJoinEvent(data.id)

								if (reponse.success) {
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

									if (userId !== 0)
										dispatch(
											getJoinEvent({
												limit: 5,
												page: 1,
												order: ['createdAt', 'DESC'],
											}),
										)

									setUpdate(true)

									return Alert.alert('Thành Công', reponse.mess, [
										{
											text: 'Hủy',
											style: 'cancel',
										},
										{
											text: 'Sự kiện tham gia',
											onPress: () => navigate('ListEventFollowCurrent'),
										},
									])
								}
							},
						},
					],
				)
			} else if (data?.statusEvent?.id === 1) {
				return Alert.alert(
					'Thông báo',
					'Sự kiện này chưa duyệt. Vui lòng theo dõi để nhận thông báo về sự kiện này',
				)
			} else if (data?.statusEvent?.id === 5) {
				return Alert.alert(
					'Thông báo',
					'Sự kiện đã bị hủy bỏ. Bạn không thể thao tác với sự kiện này',
				)
			} else if (data?.statusEvent?.id === 4) {
				if (data?.userJoined?.some(el => el.id === userId)) {
					// đánh giá sự kiện
				} else {
					return Alert.alert('Thông báo', 'Sự kiện đã kết thúc')
				}
			}
		}
	}

	//door-open
	//door-closed

	return (
		<View
			className={clsx(
				'flex-1',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<View style={[{ zIndex: 10 }]} scr className={clsx('absolute w-full')}>
				<SafeAreaView className='w-full h-[80px] justify-center'>
					<View className='px-4'>
						<Animated.View
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: 'white',
								opacity: opacityyyy,
							}}></Animated.View>
						<Pressable
							onPress={() => {
								if (route.params.caption) return navigate('Home')
								return goBack()
							}}>
							<Ionicons
								name='md-chevron-back'
								size={24}
								color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
							/>
						</Pressable>
					</View>
				</SafeAreaView>
			</View>
			<Animated.ScrollView
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: animatedValue } } }],
					{ useNativeDriver: true },
				)}
				scrollEventThrottle={16}>
				<View className={clsx('w-full h-[200px]')}>
					<Animated.Image
						style={{
							transform: [
								{
									// translateY: animatedValue.interpolate({
									// 	inputRange: [-200, 0, 200, 200 + 1],
									// 	outputRange: [-200 / 2, 0, 200 * 0.75, 200 * 0.75],
									// }),

									translateY: animatedValue,
								},
								// {
								// 	scale: animatedValue.interpolate({
								// 		inputRange: [-200, 0, 200, 200 + 1],
								// 		outputRange: [2, 1, 0.5, 0.5],
								// 	}),
								// },
							],
						}}
						source={{ uri: data?.image }}
						className={clsx('w-full h-full object-cover')}
					/>
				</View>
				<View
					className={clsx(
						'p-2',
						theme === 'light' && 'bg-backgroundColor_main_light',
						(theme === 'dark' || theme === 'dark-default') &&
							'bg-backgroundColor_main_dark',
					)}>
					<Text
						className={clsx(
							'text-[22px] font-bold text-justify capitalize',
							theme === 'light' && 'text-textColor_main_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'text-textColor_main_dark',
						)}>
						{data?.title}
					</Text>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							người tổ chức
						</Text>
						<View className='mt-1 flex-row items-center'>
							<View>
								<Image
									source={
										data?.author?.avatar === null
											? avatarDefault
											: { uri: data?.author?.avatar }
									}
									className='w-[48px] h-[48px] rounded-full'
								/>
							</View>
							<View className='flex-1 ml-2'>
								<Text
									numberOfLines={1}
									className={clsx(
										'text-[16px] font-bold mb-[2px]',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{data?.author?.name}
								</Text>
								<Text
									numberOfLines={1}
									className={clsx(
										'text-[12px] mt-[2px]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									{data?.author?.email}
								</Text>
							</View>
						</View>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							thời gian sự kiện
						</Text>
						<Text
							className={clsx(
								'text-[14px] mt-1',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>{`${moment(data?.startDate).format(
							'hh:mm DD/MM/YYYY',
						)} - ${moment(data?.finishDate).format('hh:mm DD/MM/YYYY')}`}</Text>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							địa điểm tổ chức
						</Text>
						<Text
							className={clsx(
								'text-[14px] mt-1',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							{data?.location}
						</Text>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							Mô tả
						</Text>
						<Text
							className={clsx(
								'text-[14px] mt-1  text-justify',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							{data?.description}
						</Text>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							Room
						</Text>
					</View>
				</View>
			</Animated.ScrollView>

			<View
				className={clsx(
					'h-[80px] w-full border-t',
					theme === 'light' && 'border-inpBorder_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'border-inpBorder_dark',
				)}>
				<View className='flex-row px-3 py-2 justify-around'>
					<Pressable className='items-center w-[33%]'>
						<Entypo name='chat' size={30} color='#657ef8' />
						<Text className='text-tColor_text text-[12px] font-[500] mt-1'>
							{data?.commentEvent?.length}
						</Text>
					</Pressable>
					<Pressable onPress={handleJoinEvent} className='items-center w-[33%]'>
						{data?.userJoined?.some(el => el.id === userId) &&
						(data?.statusEvent?.id === 2 || data?.statusEvent?.id === 3) ? (
							<>
								<FontAwesome5 name='door-open' size={30} color='#ff6c6c' />
								<Text className='text-input--err--light text-[12px] font-[500] mt-1 capitalize'>
									hủy
								</Text>
							</>
						) : data?.statusEvent?.id === 1 ? (
							<>
								<FontAwesome5 name='door-closed' size={30} color='#4e535c' />
								<Text className='text-placeholder--dark text-[12px] font-[500] mt-1 capitalize'>
									tham gia
								</Text>
							</>
						) : data?.userJoined?.length >= data?.limitParticipant &&
						  !data?.userJoined?.some(el => el.id === userId) ? (
							<View className='opacity-50 items-center'>
								<FontAwesome5 name='door-closed' size={30} color='#62a2f8' />
								<Text className='text-text-main--dark text-[12px] font-[500] mt-1 capitalize'>
									tham gia
								</Text>
							</View>
						) : data?.statusEvent?.id === 5 ? (
							<>
								<FontAwesome5 name='door-closed' size={30} color='#4e535c' />
								<Text className='text-placeholder--dark text-[12px] font-[500] mt-1 capitalize'>
									tham gia
								</Text>
							</>
						) : data?.statusEvent?.id === 4 &&
						  !data?.userJoined?.some(el => el.id === userId) ? (
							<>
								<FontAwesome5 name='door-closed' size={30} color='#4e535c' />
								<Text className='text-placeholder--dark text-[12px] font-[500] mt-1 capitalize'>
									tham gia
								</Text>
							</>
						) : data?.statusEvent?.id === 4 &&
						  data?.userJoined?.some(el => el.id === userId) ? (
							<>
								<MaterialIcons name='rate-review' size={30} color='#41d4a0' />
								<Text className='text-color--green--dark text-[12px] font-[500] mt-1 capitalize'>
									đánh giá
								</Text>
							</>
						) : (
							<>
								<FontAwesome5 name='door-open' size={30} color='#62a2f8' />
								<Text className='text-text-main--dark text-[12px] font-[500] mt-1 capitalize'>
									tham gia
								</Text>
							</>
						)}
					</Pressable>
					<Pressable onPress={handleFollow} className='items-center w-[33%]'>
						{data?.followers?.some(el => el.id === userId) ? (
							<>
								<FontAwesome name='star' size={30} color='#fcae59' />
								<Text className='text-yellow text-[12px] font-[500] mt-1 capitalize'>
									đã theo dõi
								</Text>
							</>
						) : (
							<>
								<FontAwesome name='star-o' size={30} color='#ffcf39' />
								<Text className='text-yellow_star text-[12px] font-[500] mt-1 capitalize'>
									theo dõi
								</Text>
							</>
						)}
					</Pressable>
				</View>
			</View>
		</View>
	)
}

export default withBaseComponent(DetailEvent)
