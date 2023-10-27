import {
	View,
	Text,
	ScrollView,
	Image,
	Pressable,
	Platform,
	StatusBar,
	SafeAreaView,
	FlatList,
	Animated,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import {
	EmptyData,
	InforProfile,
	RequiresLoginComp,
	StatusEvent,
} from '../../components'
import { useSelector } from 'react-redux'
import avatarDefault from '../../assets/avatarDefault.png'
import { apiGetFollowEvent, apiGetJoinEvent } from '../../apis'
import moment from 'moment/moment'
import { getFollowEvent, getJoinEvent } from '../../store/user/asyncActions'

const AnimatedAvatar = Animated.createAnimatedComponent(Image)
const AnimatedButtonUpdate = Animated.createAnimatedComponent(View)
const AnimatedAvatarHeader = Animated.createAnimatedComponent(View)

const ProfileScreen = ({
	Ionicons,
	navigation: { navigate },
	FontAwesome,
	FontAwesome5,
	Entypo,
	MaterialIcons,
	Foundation,
	dispatch,
}) => {
	const {
		current,
		followEvent,
		followEventCount,
		isLoggedIn,
		joinEvent,
		joinEventCount,
	} = useSelector(state => state.user)
	const { theme } = useSelector(state => state.app)
	const animatedValue = useRef(new Animated.Value(0)).current
	// const [eventFollowed, setEventFollowed] = useState([])
	// const [eventJoined, setEventJoined] = useState([])

	// const fetchEventFollowed = async () => {
	// 	const response = await apiGetJoinEvent({
	// 		limit: 5,
	// 		page: 1,
	// 	})

	// 	console.log(response)
	// }

	// useEffect(() => {
	// 	fetchEventFollowed({
	// 		limit: 5,
	// 		page: 1,
	// 	})
	// }, [])

	const avatarAnimation = {
		opacity: animatedValue.interpolate({
			inputRange: [0, 30],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	}

	const avatarHeaderAnimation = {
		opacity: animatedValue.interpolate({
			inputRange: [0, 10],
			outputRange: [0, 1],
			extrapolate: 'clamp',
		}),
	}

	const buttonUpdateAnimation = {
		opacity: animatedValue.interpolate({
			inputRange: [0, 30],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		}),
	}

	useEffect(() => {
		// const fetchFollowEvent = setInterval(() => {
		// 	dispatch(
		// 		getFollowEvent({
		// 			limit: 5,
		// 			page: 1,
		// 		}),
		// 	)
		// }, 500)
		// return () => clearInterval(fetchFollowEvent)
		dispatch(
			getFollowEvent({
				limit: 5,
				page: 1,
				order: ['createdAt', 'DESC'],
			}),
		)

		dispatch(
			getJoinEvent({
				limit: 5,
				page: 1,
				order: ['createdAt', 'DESC'],
			}),
		)
	}, [dispatch])

	if (current === null) {
		return (
			<SafeAreaView
				className={clsx(
					'flex-1',
					theme === 'light' && 'bg-backgroundColor_main_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'bg-backgroundColor_main_dark',
				)}>
				<StatusBar
					barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
				/>
				<View className='w-full flex-row px-4 items-center py-2'>
					<View className='flex-1 items-center'>
						<Text
							className={clsx(
								'text-[22px] font-[700] text-text-white--dark capitalize ml-4',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							của tôi
						</Text>
					</View>
					<Pressable onPress={() => navigate('Setting')}>
						<Ionicons
							name='settings-outline'
							size={24}
							color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
						/>
					</Pressable>
				</View>
				<View className='flex-1 justify-center'>
					<RequiresLoginComp />
				</View>
			</SafeAreaView>
		)
	}

	return (
		<View
			className={clsx(
				'flex-1',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<View className={clsx(Platform.OS === 'ios' ? 'h-[50px]' : 'h-[20px]')} />
			<View className='absolute w-full h-[300px]'>
				<View>
					<Image
						source={{
							uri: 'https://hoyolab-upload.hoyolab.com/upload/2022/07/22/86187a81ca71277f9c657c21469b733b_5465989353755595706.png',
						}}
						className='w-full h-full object-cover'
					/>
				</View>
			</View>
			<SafeAreaView className='h-[40px] justify-center'>
				<StatusBar
					barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
				/>
				<View className='w-full px-4 justify-between flex-row'>
					<AnimatedAvatarHeader
						style={[avatarHeaderAnimation]}
						className='flex-1 flex-row items-center'>
						<Image
							source={
								current?.avatar === null
									? avatarDefault
									: { uri: current.avatar }
							}
							className='w-[30px] h-[30px] rounded-full'
						/>
						<Text className={clsx('ml-2 font-[500] text-textColor_main_light')}>
							{current.name}
						</Text>
					</AnimatedAvatarHeader>
					<View className='flex-row items-center'>
						<Pressable onPress={() => navigate('ChangeBackgroundScreen')}>
							<Ionicons name='color-wand-outline' size={24} color='black' />
						</Pressable>
						<Pressable onPress={() => navigate('Setting')} className='pl-5 '>
							<Ionicons name='settings-outline' size={24} color='black' />
						</Pressable>
					</View>
				</View>
			</SafeAreaView>
			<ScrollView
				onScroll={e => {
					const offsetY = e.nativeEvent.contentOffset.y
					animatedValue.setValue(offsetY)
				}}
				scrollEventThrottle={16}>
				<View className='h-[56px]' />
				<View
					className={clsx(
						`h-full rounded-t-[16px]`,
						theme === 'light' && 'bg-backgroundColor_main_light',
						(theme === 'dark' || theme === 'dark-default') &&
							'bg-backgroundColor_main_dark',
					)}>
					<View className='px-3'>
						<AnimatedAvatar
							style={[avatarAnimation]}
							source={
								current?.avatar === null
									? avatarDefault
									: { uri: current.avatar }
							}
							className='w-[80px] h-[80px] absolute top-[-40px] left-[24px] rounded-full'
						/>
						<AnimatedAvatarHeader
							style={[buttonUpdateAnimation]}
							className='absolute top-[16px] left-[84px] bg-text-main--dark w-[24px] h-[24px] items-center justify-center rounded-full'>
							{current?.gender === true && (
								<Foundation name='female-symbol' size={24} color='#ff8296' />
							)}
							{current?.gender === false && (
								<Foundation name='male-symbol' size={24} color='blue' />
							)}
						</AnimatedAvatarHeader>
						<AnimatedButtonUpdate
							style={[buttonUpdateAnimation]}
							className='mt-2 items-end'>
							<Pressable
								onPress={() =>
									navigate('UpdateProfile', { userId: current?.id })
								}
								className='px-3 h-[28px] flex-row items-center justify-center border rounded-[12px] border-text-main--dark'>
								<Ionicons name='create-outline' size={14} color='#62a2f8' />
								<Text className='capitalize text-[16px] font-[400] text-text-main--dark ml-[2px]'>
									Chỉnh sửa
								</Text>
							</Pressable>
						</AnimatedButtonUpdate>
						<View className='mt-2'>
							<View className='flex-row items-center mt-1'>
								<Text
									className={clsx(
										'text-text-white--dark text-[22px] font-[700]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									{current?.name}
								</Text>
								<View
									className={clsx(
										'ml-2 px-2 rounded-[3px] h-[20px] justify-center',
										current?.studentData?.point >= 80
											? 'bg-yellow'
											: current?.studentData?.point >= 60
											? 'bg-panel-red--dark'
											: current?.studentData?.point >= 40
											? 'bg-panel-green--light'
											: current?.studentData?.point >= 20
											? 'bg-panel-gray--dark'
											: 'bg-panel-gray--light',
									)}>
									<Text
										className={clsx(
											'capitalize text-text-white--dark font-bold text-[14px]',
										)}>
										{`cấp ${
											current?.studentData?.point >= 80
												? '5'
												: current?.studentData?.point >= 60
												? '4'
												: current?.studentData?.point >= 40
												? '3'
												: current?.studentData?.point >= 20
												? '2'
												: '1'
										}`}
									</Text>
								</View>
							</View>
							<InforProfile
								icon={<FontAwesome name='id-card' size={24} color='#62a2f8' />}
								name={`mã số sinh viên: ${
									current?.studentData?.studentCode || '(trống)'
								}`}
							/>
							<InforProfile
								icon={<Ionicons name='school' size={24} color='#62a2f8' />}
								name={`Lớp: ${current?.studentData?.classCode || '(trống)'}`}
								type='email'
							/>
							<InforProfile
								icon={<FontAwesome5 name='school' size={24} color='#62a2f8' />}
								name={`Khoa: ${current?.studentData?.program || '(trống)'}`}
							/>
							<InforProfile
								icon={<Entypo name='phone' size={24} color='#62a2f8' />}
								name={`số điện thoại: ${current?.phone || '(trống)'}`}
							/>
							<InforProfile
								icon={
									<FontAwesome name='birthday-cake' size={24} color='#62a2f8' />
								}
								name={`sinh nhật: ${
									current?.birthDate === null
										? '(trống)'
										: moment(current?.birthDate).format('DD/MM/YYYY')
								}`}
							/>
							<InforProfile
								icon={<Entypo name='address' size={24} color='#62a2f8' />}
								name={`nơi sinh sống: ${current?.address || '(trống)'}`}
							/>
							<InforProfile
								icon={<MaterialIcons name='email' size={24} color='#62a2f8' />}
								name={`Email: ${current?.email || '(trống)'}`}
								type='email'
							/>
						</View>
						<View className='flex-row mt-4 justify-around'>
							<View className='w-[25%] items-center'>
								<Text
									className={clsx(
										'text-[22px] text-text-white--dark',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{followEventCount || 0}
								</Text>
								<Text
									className={clsx(
										'capitalize text-[14px] text-text-gray--dark font-[500]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									theo dõi
								</Text>
							</View>
							<View className='w-[25%] items-center'>
								<Text
									className={clsx(
										'text-[22px] text-text-white--dark',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{joinEventCount || 0}
								</Text>
								<Text
									className={clsx(
										'capitalize text-[14px] text-text-gray--dark font-[500]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									tham gia
								</Text>
							</View>
							<View className='w-[25%] items-center'>
								<Text
									className={clsx(
										'text-[22px] text-text-white--dark',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									0
								</Text>
								<Text
									className={clsx(
										'capitalize text-[14px] text-text-gray--dark font-[500]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									đánh giá
								</Text>
							</View>
							<View className='w-[25%] items-center'>
								<Text
									className={clsx(
										'text-[22px] text-text-white--dark',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{current?.studentData?.point || 0}
								</Text>
								<Text
									className={clsx(
										'capitalize text-[14px] text-text-gray--dark font-[500]',
										theme === 'light' && 'text-textColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_secondary_dark',
									)}>
									điểm
								</Text>
							</View>
						</View>
						<View className='mt-4 min-h-[180px]'>
							<View className='mb-2 flex-row justify-between'>
								<Text
									className={clsx(
										'text-[17px] font-[700] capitalize',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{`Sự kiện đã theo dõi (${followEventCount})`}
								</Text>
								<Pressable onPress={() => navigate('ListEventFollowCurrent')}>
									<Text
										className={clsx(
											'capitalize text-[14px] font-[700] text-tColor_text',
										)}>
										xem tất cả
									</Text>
								</Pressable>
							</View>

							{followEvent?.length > 0 ? (
								<FlatList
									data={followEvent}
									horizontal
									showsHorizontalScrollIndicator={false}
									renderItem={({ item, index }) => {
										return (
											<Pressable
												onPress={() =>
													navigate('DetailEvent', {
														eventId: item.eventData.id,
														userId: current.id,
													})
												}
												className={clsx(
													'mr-4 w-[243px]',
													index === followEvent?.length - 1 && 'mr-0',
												)}>
												<View className='relative'>
													<Image
														source={{ uri: item.eventData.image }}
														className='w-full h-[132px] object-contain rounded-[12px]'
													/>
													<StatusEvent
														style={'absolute top-0'}
														idStatus={item.eventData.status}
													/>
												</View>
												<View className='mt-1'>
													<Text
														numberOfLines={2}
														className={clsx(
															'text-[15px] font-bold text-text-white--dark',
															theme === 'light' && 'text-textColor_main_light',
															(theme === 'dark' || theme === 'dark-default') &&
																'text-textColor_main_dark',
														)}>
														{item.eventData.title}
													</Text>
												</View>
											</Pressable>
										)
									}}
								/>
							) : (
								<View className='h-[180px] w-full flex-1'>
									<EmptyData />
								</View>
							)}
						</View>
						<View className='my-4 min-h-[180px]'>
							<View className='mb-2 flex-row justify-between'>
								<Text
									className={clsx(
										'text-[17px] font-[700] capitalize',
										theme === 'light' && 'text-textColor_main_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'text-textColor_main_dark',
									)}>
									{`Sự kiện đã tham gia (${joinEventCount})`}
								</Text>
								<Pressable onPress={() => navigate('ListEventJoinCurrent')}>
									<Text className='capitalize text-[14px] font-[700] text-tColor_text'>
										xem tất cả
									</Text>
								</Pressable>
							</View>

							{joinEvent?.length > 0 ? (
								<FlatList
									data={joinEvent}
									horizontal
									showsHorizontalScrollIndicator={false}
									renderItem={({ item, index }) => {
										return (
											<Pressable
												onPress={() =>
													navigate('DetailEvent', {
														eventId: item.eventData.id,
														userId: current.id,
													})
												}
												className={clsx(
													'mr-4 w-[243px]',
													index === joinEvent?.length - 1 && 'mr-0',
												)}>
												<View className='relative'>
													<Image
														source={{ uri: item.eventData.image }}
														className='w-full h-[132px] object-contain rounded-[12px]'
													/>
													<StatusEvent
														style={'absolute top-0'}
														idStatus={item.eventData.status}
													/>
												</View>
												<View className='mt-1'>
													<Text
														numberOfLines={2}
														className={clsx(
															'text-[15px] font-bold text-text-white--dark',
															theme === 'light' && 'text-textColor_main_light',
															(theme === 'dark' || theme === 'dark-default') &&
																'text-textColor_main_dark',
														)}>
														{item.eventData.title}
													</Text>
												</View>
											</Pressable>
										)
									}}
								/>
							) : (
								<View className='h-[180px] w-full flex-1'>
									<EmptyData />
								</View>
							)}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default withBaseComponent(ProfileScreen)
