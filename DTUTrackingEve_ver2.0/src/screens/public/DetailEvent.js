import {
	View,
	Text,
	Image,
	Pressable,
	StatusBar,
	SafeAreaView,
	Animated,
	Alert,
	Clipboard,
	TextInput,
} from 'react-native'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import {
	apiCreateComment,
	apiDeleteComment,
	apiFeedbackEvent,
	apiFollowEvent,
	apiGetDetailEvents,
	apiJoinEvent,
	apiUpdateComment,
} from '../../apis'
import moment from 'moment'
import avatarDefault from '../../assets/avatarDefault.png'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import {
	getCurrent,
	getFollowEvent,
	getJoinEvent,
} from '../../store/user/asyncActions'
import { useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import RoomChoose from '../../components/common/RoomChoose'
import { Feedback } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
	const { current } = useSelector(state => state.user)
	const [data, setData] = useState({})
	const [update, setUpdate] = useState(false)
	const animatedValue = useRef(new Animated.Value(0)).current
	const opacityyyy = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	})
	const [userJoined, setUserJoined] = useState(null)
	const [isModalVisible, setModalVisible] = useState(false)
	const [feedback, setFeedback] = useState(false)
	const [starFeedback, setStarFeedback] = useState(5)
	const [comementText, setComementText] = useState('')
	const [content, setContent] = useState('')
	const [checkUpdate, setCheckUpdate] = useState({
		idComment: null,
		value: null,
	})
	const [checkResponse, setCheckResponse] = useState({
		idComment: null,
		value: null,
	})
	const [checkUpdateResponse, setCheckUpdateResponse] = useState({
		idComment: null,
		value: null,
	})
	const [MoreDescription, setMoreDescription] = useState(false)

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			setUpdate(false)
			setData(response.response)

			const user = response.response.userJoined.find(el => el.id === userId)
			if (user) setUserJoined(user)
			else setUserJoined(null)
		}
	}

	useEffect(() => {
		fetchDetailEvent(eventId)
	}, [eventId, update])

	const render = useCallback(() => {
		setUpdate(!update)
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

									render()

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

								render()

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

	const handleJoinEventDetail = (data, item) => {
		return Alert.alert(
			'Thông báo',
			`Bạn muốn tham gia sự kiện ${data.title} với chủ đề ${item.topic} phải không?`,
			[
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Tham gia',
					onPress: async () => {
						const response = await apiJoinEvent(data.id, {
							roomId: item.roomId,
						})

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

							render()

							if (!current)
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

										if (userId !== 0) {
											dispatch(getCurrent())

											dispatch(
												getJoinEvent({
													limit: 5,
													page: 1,
													order: ['createdAt', 'DESC'],
												}),
											)
										}

										render()

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

				return setModalVisible(true)
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

	const handleSubmit = async () => {
		const response = await apiFeedbackEvent(eventId, {
			rate: starFeedback,
			feedback: comementText,
		})

		if (response.scucess) {
			setModalVisible(false)
			return Alert.alert('Thông báo', response.mess)
		}

		return Alert.alert('Thông báo', response.mess)
	}

	const handleSend = async () => {
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
			if (content.length > 0) {
				const response = await apiCreateComment({
					comment: content,
					eventId: eventId,
				})
				if (response.success) {
					setContent('')
					render()
				}
			} else {
				return Alert.alert('Thông báo', 'Vui lòng điền nội dung')
			}
		}
	}

	const handleDeleteComment = async commentId => {
		return Alert.alert('Thông báo', 'Bạn muốn xóa bình luận của bạn?', [
			{
				text: 'Không',
				style: 'cancel',
			},
			{
				text: 'Có',
				onPress: async () => {
					const response = await apiDeleteComment({ commentId })

					if (response.success) {
						render()
					}
				},
			},
		])
	}

	const handleUpdateComment = async () => {
		return Alert.alert(
			'Thông báo',
			'Bạn muốn cập nhật lại nội dung bình luận của bạn',
			[
				{
					text: 'Không',
					style: 'cancel',
				},
				{
					text: 'Có',
					onPress: async () => {
						const response = await apiUpdateComment({
							commentId: checkUpdate.idComment,
							comment: checkUpdate.value,
						})

						if (response.success) {
							setCheckUpdate({ idComment: null, value: null })
							render()
						}
					},
				},
			],
		)
	}

	const handleDeleteResponse = async responseId => {
		return Alert.alert('Thông báo', 'Bạn muốn xóa bình luận của bạn?', [
			{
				text: 'Không',
				style: 'cancel',
			},
			{
				text: 'Có',
				onPress: async () => {
					const response = await apiDeleteComment({ responseId })

					if (response.success) {
						render()
					}
				},
			},
		])
	}

	const handleResponse = async responseId => {
		if (checkResponse.value.length <= 0)
			return Alert.alert('Thông báo', 'Vui lòng nhập nội dung!')
		else {
			const response = await apiCreateComment({
				comment: checkResponse.value,
				responseId,
			})
			if (response.success) {
				setCheckResponse({ idComment: null, value: null })
				render()
			}
		}
	}

	const handleUpdateResponse = async () => {
		return Alert.alert('Thông báo', 'Bạn muốn cập nhật bình luận của bạn?', [
			{
				text: 'Không',
				style: 'cancel',
			},
			{
				text: 'Có',
				onPress: async () => {
					const response = await apiUpdateComment({
						responseId: checkUpdateResponse.idComment,
						comment: checkUpdateResponse.value,
					})

					if (response.success) {
						setCheckUpdateResponse({ idComment: null, value: null })
						render()
					}
				},
			},
		])
	}

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
							className={clsx(
								'h-[80px]',
								theme === 'light' && 'bg-backgroundColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-backgroundColor_main_dark',
							)}
							style={{
								position: 'absolute',
								top: -50,
								left: 0,
								right: 0,
								bottom: 0,
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
									translateY: animatedValue,
								},
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
							'hh:mm DD/MM/YYYY a',
						)} - ${moment(data?.finishDate).format(
							'hh:mm DD/MM/YYYY a',
						)}`}</Text>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							{data?.typeEvent ? 'Link tham gia' : 'địa điểm tổ chức'}
						</Text>
						<Pressable
							onPress={() => {
								Alert.alert('Đã copy thành công')
								return Clipboard.setString(
									data?.typeEvent ? data?.linkUrl : data?.location,
								)
							}}>
							<Text
								className={clsx(
									'text-[14px] mt-1',
									data?.typeEvent && 'underline',
									theme === 'light' && 'text-textColor_main_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-textColor_main_dark',
								)}>
								{data?.typeEvent ? data?.linkUrl : data?.location}
							</Text>
						</Pressable>
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							Mô tả
						</Text>
						<Text
							numberOfLines={MoreDescription ? undefined : 3}
							className={clsx(
								'text-[14px] mt-1  text-justify',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							{data?.description}
						</Text>
						{MoreDescription ? (
							<Pressable onPress={() => setMoreDescription(false)}>
								<Text className='text-tColor_text'>Rút gọn</Text>
							</Pressable>
						) : (
							<Pressable onPress={() => setMoreDescription(true)}>
								<Text className='text-tColor_text'>Xem thêm</Text>
							</Pressable>
						)}
					</View>

					<View className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							Room
						</Text>
						<View className='mt-2'>
							{data?.typeEvent
								? data.onlineEvent?.map((el, index) => (
										<View
											key={el.id}
											className={clsx(
												'mb-3 gap-1 bg-backgroundColor_secondary_light p-2 rounded-md',
												data.onlineEvent?.length - 1 === index && 'mb-0',
												theme === 'light' &&
													'bg-backgroundColor_secondary_light',
												(theme === 'dark' || theme === 'dark-default') &&
													'bg-backgroundColor_secondary_dark',
												userJoined &&
													userJoined?.roomId === el.id &&
													'bg-statusColor_icon_green',
											)}>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Topci:{' '}
												</Text>
												<Text className='textColor_main_light'>{el.topic}</Text>
											</View>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Thời gian bắt đầu:{' '}
												</Text>
												<Text className='textColor_main_light'>
													{el.timeRoom}
												</Text>
											</View>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Link tham gia room:{' '}
												</Text>
												<Text className='textColor_main_light'>
													{el.linkRoomUrl}
												</Text>
											</View>
										</View>
								  ))
								: data.offlineEvent?.map((el, index) => (
										<View
											key={el.id}
											className={clsx(
												'mb-3 gap-1 bg-backgroundColor_secondary_light p-2 rounded-md',
												data.onlineEvent?.length - 1 === index && 'mb-0',
												theme === 'light' &&
													'bg-backgroundColor_secondary_light',
												(theme === 'dark' || theme === 'dark-default') &&
													'bg-backgroundColor_secondary_dark',
												userJoined &&
													userJoined?.roomId === el.id &&
													'bg-statusColor_icon_green',
											)}>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Topci:{' '}
												</Text>
												<Text className='textColor_main_light'>{el.topic}</Text>
											</View>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Thời gian bắt đầu:{' '}
												</Text>
												<Text className='textColor_main_light'>
													{moment(el.timeRoom).format('hh:mm a')} -{' '}
													{moment(el.finishRoom).format('hh:mm a')}
												</Text>
											</View>
											<View className='flex-row items-center'>
												<Text className='text-[14px] font-bold text-lineTabColor'>
													Địa điểm phòng:{' '}
												</Text>
												<Text className='textColor_main_light'>
													{el.numberRoom}
												</Text>
											</View>
										</View>
								  ))}
						</View>
					</View>

					<KeyboardAwareScrollView className='mt-3'>
						<Text className='text-[22px] text-tColor_text font-bold capitalize'>
							Bình luận ({data?.comments?.length || '0'})
						</Text>
						<View className='mt-2'>
							{data.comments?.length > 0 &&
								data.comments.map(el => (
									<View key={el.id} className='mb-2'>
										<View className='flex-row items-center'>
											<View className='mr-2'>
												<Image
													source={
														el.avatar === null
															? avatarDefault
															: { uri: el?.avatar }
													}
													className='w-[50px] h-[50px] rounded-full'
												/>
											</View>
											<View className='flex-1 bg-white p-1 rounded-md'>
												<View className='gap-1'>
													<View className='flex-row'>
														<Text className='font-bold pr-2'>{el.name}</Text>
														{data.author.id === el.userId && (
															<View className='flex-row items-center gap-1'>
																<Entypo name='modern-mic' size={12} />
																<Text>Tác giả</Text>
															</View>
														)}
													</View>
													{checkUpdate.idComment === el.id ? (
														<View className='py-[2px] bg-white rounded-md flex-row items-center px-1'>
															<TextInput
																value={checkUpdate.value}
																onChangeText={text =>
																	setCheckUpdate(prev => ({
																		...prev,
																		value: text,
																	}))
																}
																multiline
																placeholder='Bình luận'
																className='flex-1'
															/>
															<Pressable onPress={handleUpdateComment}>
																<Ionicons name='send-sharp' size={10} />
															</Pressable>
														</View>
													) : (
														<Text>{el.comment}</Text>
													)}
												</View>
											</View>
										</View>
										<View className='ml-[58px] flex-row'>
											{checkResponse.idComment === el.id ? (
												<Pressable
													onPress={() =>
														setCheckResponse({
															idComment: null,
															value: null,
														})
													}
													className='mr-2'>
													<Text className='text-[#408A7E]'>Hủy Phản hồi</Text>
												</Pressable>
											) : (
												<Pressable
													onPress={() =>
														setCheckResponse({ idComment: el.id, value: null })
													}
													className='mr-2'>
													<Text className='text-[#408A7E]'>Phản hồi</Text>
												</Pressable>
											)}

											{+userId === +el.userId &&
												(checkUpdate.idComment === el.id ? (
													<Pressable
														onPress={() =>
															setCheckUpdate({ idComment: null, value: null })
														}
														className='mr-2'>
														<Text className='text-blue-300'>Hủy Cập nhập</Text>
													</Pressable>
												) : (
													<Pressable
														onPress={() =>
															setCheckUpdate({
																idComment: el.id,
																value: el.comment,
															})
														}
														className='mr-2'>
														<Text className='text-blue-300'>Cập nhập</Text>
													</Pressable>
												))}
											{+userId === +el.userId && (
												<Pressable
													onPress={() => handleDeleteComment(el.id)}
													className='mr-2'>
													<Text className='text-red-300'>Xóa</Text>
												</Pressable>
											)}
											<Text>{moment(el.createdAt).fromNow()}</Text>
										</View>
										{checkResponse.idComment === el.id && (
											<View className='py-1 ml-[58px] mt-1 bg-white rounded-md flex-row items-center px-3'>
												<TextInput
													value={checkResponse.value}
													onChangeText={text =>
														setCheckResponse(prev => ({
															...prev,
															value: text,
														}))
													}
													multiline
													placeholder='Phản hồi bình luận'
													className='flex-1'
												/>
												<Pressable
													onPress={() =>
														handleResponse(checkResponse.idComment)
													}>
													<Ionicons name='send-sharp' size={14} />
												</Pressable>
											</View>
										)}
										<View>
											{el.responseComment.length > 0 &&
												el.responseComment.map(e => (
													<View key={e.id} className='mb-1 ml-[58px]'>
														<View className='mt-2 flex-row items-center'>
															<View className='mr-2'>
																<Image
																	source={
																		e.avatar === null
																			? avatarDefault
																			: { uri: e?.avatar }
																	}
																	className='w-[50px] h-[50px] rounded-full'
																/>
															</View>
															<View className='flex-1 bg-white p-1 rounded-md'>
																<View className='gap-1'>
																	<View className='flex-row'>
																		<Text className='font-bold pr-2'>
																			{e.name}
																		</Text>
																		{data.author.id === e.userId && (
																			<View className='flex-row items-center gap-1'>
																				<Entypo name='modern-mic' size={12} />
																				<Text>Tác giả</Text>
																			</View>
																		)}
																	</View>
																	{checkUpdateResponse.idComment === e.id ? (
																		<View className='py-[2px] bg-white rounded-md flex-row items-center px-1'>
																			<TextInput
																				value={checkUpdateResponse.value}
																				onChangeText={text =>
																					setCheckUpdateResponse(prev => ({
																						...prev,
																						value: text,
																					}))
																				}
																				multiline
																				placeholder='Cập nhật bình luận'
																				className='flex-1'
																			/>
																			<Pressable onPress={handleUpdateResponse}>
																				<Ionicons name='send-sharp' size={10} />
																			</Pressable>
																		</View>
																	) : (
																		<Text>{e.response}</Text>
																	)}
																</View>
															</View>
														</View>
														<View className='ml-[58px] flex-row'>
															{+userId === +e.userId &&
																(checkUpdateResponse.idComment === e.id ? (
																	<Pressable
																		onPress={() =>
																			setCheckUpdateResponse({
																				idComment: null,
																				value: null,
																			})
																		}
																		className='mr-2'>
																		<Text className='text-blue-300'>
																			Hủy Cập nhập
																		</Text>
																	</Pressable>
																) : (
																	<Pressable
																		onPress={() =>
																			setCheckUpdateResponse({
																				idComment: e.id,
																				value: e.response,
																			})
																		}
																		className='mr-2'>
																		<Text className='text-blue-300'>
																			Cập nhập
																		</Text>
																	</Pressable>
																))}
															{+userId === +e.userId && (
																<Pressable
																	onPress={() => handleDeleteResponse(e.id)}
																	className='mr-2'>
																	<Text className='text-red-300'>Xóa</Text>
																</Pressable>
															)}
															<Text>{moment(e.createdAt).fromNow()}</Text>
														</View>
													</View>
												))}
										</View>
									</View>
								))}
						</View>
						<View className='py-2 bg-white rounded-md flex-row items-center px-3'>
							<TextInput
								value={content}
								onChangeText={text => setContent(text)}
								multiline
								placeholder='Bình luận'
								className='flex-1'
							/>
							<Pressable onPress={handleSend}>
								<Ionicons name='send-sharp' size={14} />
							</Pressable>
						</View>
					</KeyboardAwareScrollView>
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
							{data?.comments?.length || '0'}
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
							<Pressable
								className='items-center'
								onPress={() => {
									setFeedback(true)
									setModalVisible(true)
								}}>
								<MaterialIcons name='rate-review' size={30} color='#41d4a0' />
								<Text className='text-color--green--dark text-[12px] font-[500] mt-1 capitalize'>
									đánh giá
								</Text>
							</Pressable>
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

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				{feedback ? (
					<Feedback
						setModalVisible={setModalVisible}
						starFeedback={starFeedback}
						setStarFeedback={setStarFeedback}
						comementText={comementText}
						setComementText={setComementText}
						handleSubmit={handleSubmit}
					/>
				) : (
					<RoomChoose
						item={data}
						setModalVisible={setModalVisible}
						handleJoinEvent={handleJoinEventDetail}
					/>
				)}
			</Modal>
		</View>
	)
}

export default withBaseComponent(DetailEvent)
