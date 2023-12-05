import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	StatusBar,
	FlatList,
	ActivityIndicator,
	Alert,
} from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { tabListEvent } from '../../utils/contants'
import clsx from 'clsx'
import { CardEvent, Feedback, RoomChoose, Search } from '../../components'
import Modal from 'react-native-modal'
import {
	apiFeedbackEvent,
	apiGetDetailEvents,
	apiGetEvents,
	apiJoinEvent,
} from '../../apis'
import { useSelector } from 'react-redux'
import moment from 'moment'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import { getJoinEvent } from '../../store/user/asyncActions'

const ListEventScreen = ({
	navigation: { setOptions, goBack, navigate },
	dispatch,
	Ionicons,
	route,
}) => {
	const { current } = useSelector(state => state.user)
	const { theme } = useSelector(state => state.app)
	const { countTodayEvents, countHotEvents, countNewEvent } = useSelector(
		state => state.event,
	)
	const [tabList, setTabList] = useState(route.params.chooseTabList || 'none')
	const [isModalVisible, setModalVisible] = useState(false)
	const [isSearch, setIsSearch] = useState(false)
	const [valueSearch, setValueSearch] = useState(null)
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [typeEvent, setTypeEvent] = useState('joined')
	const [starFeedback, setStarFeedback] = useState(5)
	const [comementText, setComementText] = useState('')
	const [eventChoose, setEventChoose] = useState(null)
	const [detailData, setDetailData] = useState(null)
	const [update, setUpdate] = useState(false)

	const render = useCallback(() => {
		setUpdate(!update)
	}, [update])

	const renderLoader = () => {
		return isLoading ? (
			<View className='mt-2'>
				<ActivityIndicator size={'large'} color={'#62a2f8'} />
			</View>
		) : null
	}

	const loadMoreItem = async () => {
		return (
			isLoading &&
			(tabList === 'today' && countTodayEvents >= 10 * currentPage
				? setCurrentPage(currentPage + 1)
				: tabList === 'hot' && countHotEvents >= 10 * currentPage
				? setCurrentPage(currentPage + 1)
				: tabList === 'new' && countNewEvent >= 10 * currentPage
				? setCurrentPage(currentPage + 1)
				: null)
		)
	}

	useEffect(() => {
		const fetchEvent = async () => {
			setIsLoading(true)
			let response
			if (tabList === 'today') {
				response = await apiGetEvents({
					limit: 10,
					page: currentPage,
					date: moment().format('YYYY-MM-DD'),
					status: [2, 3],
				})
			} else if (tabList === 'hot') {
				response = await apiGetEvents({
					limit: 10,
					page: currentPage,
					hot: true,
					status: [2, 3],
				})
			} else if (tabList === 'new') {
				response = await apiGetEvents({
					limit: 10,
					page: currentPage,
					order: ['createdAt', 'DESC'],
					status: [2, 3],
				})
			}

			if (response?.success === true) {
				await setData([...data, ...response.response])
				await setIsLoading(false)
			}
		}

		fetchEvent()
	}, [tabList, currentPage, update])

	useLayoutEffect(() => {
		setOptions({
			headerStyle: {
				backgroundColor: theme === 'light' ? '#f5f6fb' : '#0c0f1d',
			},
			headerTitleAlign: 'center',
			headerTitleStyle: {
				color: theme === 'light' ? '#000000d9' : '#ffffffd9',
			},
			headerShown: true,
			headerLeft: () => (
				<Pressable onPress={() => goBack()}>
					<Ionicons
						name='md-chevron-back'
						size={24}
						color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
					/>
				</Pressable>
			),
			headerRight: () => (
				<Pressable onPress={() => setIsSearch(!isSearch)}>
					<Ionicons
						name='search'
						size={24}
						color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
					/>
				</Pressable>
			),
			headerTitle: 'Danh Sách Sự Kiện',
		})
	}, [isSearch, theme])

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
									status: [2, 3],
								}),
							)
							dispatch(
								getEventsNew({
									limit: 10,
									page: 1,
									order: ['createdAt', 'DESC'],
									status: [2, 3],
								}),
							)
							dispatch(
								getEventsHot({
									limit: 5,
									page: 1,
									hot: true,
									status: [2, 3],
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

							render()

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

	const handleSubmit = async () => {
		const response = await apiFeedbackEvent(eventChoose, {
			rate: starFeedback,
			feedback: comementText,
		})

		return Alert.alert('Thông báo', response.mess)
	}

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			setDetailData(response.response)
		}
	}

	useEffect(() => {
		if (eventChoose) fetchDetailEvent(eventChoose)
	}, [eventChoose])

	// console.log('Số lượng dữ liệu hiện có: ', data.length)
	// console.log('Tổng dữ liệu trên database: ', countNewEvent)
	// console.log('Dữ liệu hiện cần phải có: ', 10 * currentPage)
	// console.log('Page hiện tại: ', currentPage)
	// console.log('------------------------------')

	return (
		<SafeAreaView
			className={clsx(
				'flex-1 bg-background--primary--dark',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>

			<View className='px-3 flex-row mt-1'>
				<FlatList
					data={tabListEvent}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								onPress={() => {
									setTabList(item.value)
									if (tabList === 'today') {
										if (countTodayEvents >= 10 * currentPage) setCurrentPage(1)
										else setCurrentPage(0)
									}

									if (tabList === 'hot') {
										if (countHotEvents >= 10 * currentPage) setCurrentPage(1)
										else setCurrentPage(0)
									}

									if (tabList === 'new') {
										if (countNewEvent >= 10 * currentPage) setCurrentPage(1)
										else setCurrentPage(0)
									}
									setData([])
								}}
								key={item.id}
								className={clsx(
									'justify-center px-2 py-1 rounded-[4px]',
									tabListEvent.length - 1 === index ? '' : 'mr-3',
									tabList === item.value
										? 'bg-tColor_bg_active'
										: theme == 'light'
										? 'bg-tColor_bg_light'
										: 'bg-tColor_bg_dark',
								)}>
								<Text
									className={clsx(
										'text-[14px] font-bold',
										tabList === item.value
											? 'text-tColor_text_active'
											: 'text-tColor_text',
									)}>
									{item.text}
								</Text>
							</Pressable>
						)
					}}
				/>
				<Pressable onPress={() => setModalVisible(true)} className='pl-1'>
					<Ionicons
						name='md-reorder-three-outline'
						size={30}
						color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
					/>
				</Pressable>
			</View>

			{isSearch && (
				<View className='px-2 pt-3'>
					<Search
						placeholder='Nhập từ khóa tìm kiếm'
						setValue={setValueSearch}
						value={valueSearch}
					/>
				</View>
			)}

			<View className='flex-1 px-3 pt-1 my-1'>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={data}
					renderItem={({ item, index }) => (
						<CardEvent
							isModalVisible={isModalVisible}
							setModalVisible={setModalVisible}
							setEventChoose={setEventChoose}
							setTypeEvent={setTypeEvent}
							item={item}
							key={index}
							userId={current?.id || 0}
							borderHiden={index === data.length - 1 ? false : true}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={renderLoader}
					onEndReached={loadMoreItem}
					onEndReachedThreshold={0}
				/>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				{typeEvent === 'joined' ? (
					<RoomChoose
						item={detailData}
						setModalVisible={setModalVisible}
						handleJoinEvent={handleJoinEvent}
					/>
				) : typeEvent === 'review' ? (
					<Feedback
						setModalVisible={setModalVisible}
						starFeedback={starFeedback}
						setStarFeedback={setStarFeedback}
						comementText={comementText}
						setComementText={setComementText}
						handleSubmit={handleSubmit}
					/>
				) : (
					<View
						className={clsx(
							'w-full h-[300px] p-3 rounded-md',
							theme === 'light' && 'bg-backgroundColor_secondary_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-backgroundColor_secondary_dark',
						)}>
						<View className='flex-row w-full items-center'>
							<Text
								className={clsx(
									'text-[16px] flex-1 text-center ml-[24px] text-text-gray--dark font-bold',
									theme === 'light' && 'text-textColor_secondary_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-textColor_secondary_dark',
								)}>
								Chọn
							</Text>
							<Pressable
								onPress={() => setModalVisible(false)}
								className='self-end'>
								<Ionicons name='close' size={24} color='#737377' />
							</Pressable>
						</View>
						<View className='flex-row flex-1 flex-wrap mt-3'>
							{tabListEvent.map((el, index) => {
								return (
									<Pressable
										onPress={() => {
											setModalVisible(false)
											setTabList(el.value)
											if (tabList === 'today') {
												if (countTodayEvents >= 10 * currentPage)
													setCurrentPage(1)
												else setCurrentPage(0)
											}

											if (tabList === 'hot') {
												if (countHotEvents >= 10 * currentPage)
													setCurrentPage(1)
												else setCurrentPage(0)
											}

											if (tabList === 'new') {
												if (countNewEvent >= 10 * currentPage) setCurrentPage(1)
												else setCurrentPage(0)
											}
											setData([])
										}}
										key={el.id}
										className={clsx(
											'justify-center px-2 py-2 rounded-[4px] my-1',
											tabListEvent.length - 1 === index ? '' : 'mr-3',
											tabList === el.value
												? 'bg-tColor_bg_active'
												: theme === 'light'
												? 'bg-tColor_bg_light'
												: 'bg-tColor_bg_dark',
										)}>
										<Text
											className={clsx(
												'text-[14px] font-bold',
												tabList === el.value
													? 'text-tColor_text_active'
													: 'text-tColor_text',
											)}>
											{el.text}
										</Text>
									</Pressable>
								)
							})}
						</View>
					</View>
				)}
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(ListEventScreen)
