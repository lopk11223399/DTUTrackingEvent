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
	const [tabList, setTabList] = useState(route.params.chooseTabList || 'none')
	const [isModalVisible, setModalVisible] = useState(false)
	const [isSearch, setIsSearch] = useState(false)
	const [valueSearch, setValueSearch] = useState(null)
	const [data, setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	useLayoutEffect(() => {
		setOptions({
			headerStyle: {
				backgroundColor: '#161722',
			},
			headerTitleAlign: 'center',
			headerTitleStyle: {
				color: '#e8e6e3',
			},
			headerShown: true,
			headerLeft: () => (
				<Pressable onPress={() => goBack()}>
					<Ionicons name='md-chevron-back' size={24} color='white' />
				</Pressable>
			),
			headerRight: () => (
				<Pressable onPress={() => setIsSearch(!isSearch)}>
					<Ionicons name='search' size={24} color='white' />
				</Pressable>
			),
			headerTitle: 'Danh Sách Sự Kiện',
		})
	}, [isSearch])

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
				hot: '',
			})
		}

		if (response?.data?.success === true) {
			setData(response.data.response)
			setIsLoading(false)
		}
	}

	const renderLoader = () => {
		return isLoading ? (
			<View className='mt-2'>
				<ActivityIndicator size={'large'} color={'#62a2f8'} />
			</View>
		) : null
	}

	const loadMoreItem = () => {
		setCurrentPage(currentPage + 1)
	}

	useEffect(() => {
		fetchEvent()
	}, [currentPage])

	useEffect(() => {
		fetchEvent()
	}, [tabList])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />

			<View className='px-3 flex-row mt-1'>
				<FlatList
					data={tabListEvent}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => {
						return (
							<Pressable
								onPress={() => setTabList(item.value)}
								key={item.id}
								className={clsx(
									'justify-center px-2 py-1 rounded-[4px]',
									tabListEvent.length - 1 === index ? '' : 'mr-3',
									tabList === item.value
										? 'bg-bg-input-active--dark'
										: 'bg-text-desc--dark',
								)}>
								<Text
									className={clsx(
										'text-[14px] font-bold',
										tabList === item.value
											? 'text-text-main--dark'
											: 'text-text-white--dark',
									)}>
									{item.text}
								</Text>
							</Pressable>
						)
					}}
				/>
				<Pressable onPress={() => setModalVisible(true)} className='pl-1'>
					<Ionicons name='md-reorder-three-outline' size={30} color='white' />
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
					// ListFooterComponent={renderLoader}
					// onEndReached={loadMoreItem}
					// onEndReachedThreshold={0}
				/>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<View className='w-full h-[300px] bg-background--secondary--dark p-3 rounded-md'>
					<View className='flex-row w-full items-center'>
						<Text className='text-[16px] flex-1 text-center ml-[24px] text-text-gray--dark font-bold'>
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
									}}
									key={el.id}
									className={clsx(
										'justify-center px-2 py-1 rounded-[4px] my-1',
										tabListEvent.length - 1 === index ? '' : 'mr-3',
										tabList === el.value
											? 'bg-bg-input-active--dark'
											: 'bg-text-desc--dark',
									)}>
									<Text
										className={clsx(
											'text-[14px] font-bold',
											tabList === el.value
												? 'text-text-main--dark'
												: 'text-text-white--dark',
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
