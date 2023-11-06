import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	StatusBar,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { tabListEvent } from '../../utils/contants'
import clsx from 'clsx'
import { CardEvent, Search } from '../../components'
import Modal from 'react-native-modal'
import { apiGetEvents } from '../../apis'
import { useSelector } from 'react-redux'
import moment from 'moment'

const ListEventScreen = ({
	navigation: { setOptions, goBack },
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

	const renderLoader = () => {
		return isLoading ? (
			<View className='mt-2'>
				<ActivityIndicator size={'large'} color={'#62a2f8'} />
			</View>
		) : null
	}

	// () => fetchUsers(users.length, FETCH_USERS_COUNT, page)

	const loadMoreItem = async () => {
		if (tabList === 'today' && countTodayEvents >= 10 * currentPage)
			setCurrentPage(currentPage + 1)
		else if (tabList === 'hot' && countHotEvents >= 10 * currentPage)
			setCurrentPage(currentPage + 1)
		else if (tabList === 'new' && countNewEvent >= 10 * currentPage)
			setCurrentPage(currentPage + 1)
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
				})
			} else if (tabList === 'hot') {
				response = await apiGetEvents({
					limit: 10,
					page: currentPage,
					hot: true,
				})
			} else if (tabList === 'new') {
				response = await apiGetEvents({
					limit: 10,
					page: currentPage,
					order: ['createdAt', 'DESC'],
				})
			}

			if (response?.success === true) {
				await setData([...data, ...response.response])
				await setIsLoading(false)
			}
		}

		fetchEvent()
	}, [tabList, currentPage])

	const fetchEvent = async () => {
		setIsLoading(true)
		let response
		if (tabList === 'today') {
			response = await apiGetEvents({
				limit: 10,
				page: currentPage,
				date: moment().format('YYYY-MM-DD'),
			})
		} else if (tabList === 'hot') {
			response = await apiGetEvents({
				limit: 10,
				page: currentPage,
				hot: true,
			})
		} else if (tabList === 'new') {
			response = await apiGetEvents({
				limit: 10,
				page: currentPage,
				order: ['createdAt', 'DESC'],
			})
		}

		if (response?.success === true) {
			setData([...data, ...response.response])
			setIsLoading(false)
		}
	}

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

				{/* <FlatList
					showsVerticalScrollIndicator={false}
					data={data}
					renderItem={({ item, index }) => (
						<CardEvent
							item={item}
							key={index}
							userId={current?.id || 0}
							borderHiden={index === data.length - 1 ? false : true}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					ListFooterComponent={renderLoader}
					onEndReached={() => fetchEvent(users.length, FETCH_USERS_COUNT, page)}
					onEndReachedThreshold={0}
				/> */}
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
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
											if (countHotEvents >= 10 * currentPage) setCurrentPage(1)
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
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(ListEventScreen)
