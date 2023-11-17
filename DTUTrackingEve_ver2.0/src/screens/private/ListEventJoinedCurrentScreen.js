import React, { useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import {
	SafeAreaView,
	View,
	Pressable,
	FlatList,
	StatusBar,
} from 'react-native'
import { CardEventJoined, EmptyData, Search } from '../../components'
import Modal from 'react-native-modal'
import { renderStarFromNumber } from '../../utils/helper'
import { useSelector } from 'react-redux'
import { getJoinEvent } from '../../store/user/asyncActions'
import clsx from 'clsx'

const ListEventJoinedCurrentScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	route,
	dispatch,
}) => {
	const { theme } = useSelector(state => state.app)
	const { current, joinEvent } = useSelector(state => state.user)
	const [isSearch, setIsSearch] = useState(false)
	const [valueSearch, setValueSearch] = useState(null)

	useEffect(() => {
		dispatch(
			getJoinEvent({
				limit: 10,
				page: 1,
				order: ['createdAt', 'DESC'],
			}),
		)
	}, [dispatch])

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
			headerTitle: 'Danh Sách Sự Kiện Tham Gia',
		})
	}, [isSearch, theme])

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

			{isSearch && (
				<View className='px-3 mt-2'>
					<Search
						placeholder='Nhập từ khóa tìm kiếm'
						setValue={setValueSearch}
						value={valueSearch}
					/>
				</View>
			)}

			<View className='px-3 mt-2 flex-1'>
				{joinEvent?.length > 0 ? (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={joinEvent}
						renderItem={({ item, index }) => (
							<CardEventJoined
								item={item.eventData}
								key={item.eventData.id}
								userId={current.id}
								borderHiden={index === joinEvent?.length - 1 ? false : true}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				) : (
					<EmptyData />
				)}
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(ListEventJoinedCurrentScreen)
