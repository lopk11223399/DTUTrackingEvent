import {
	View,
	Text,
	SafeAreaView,
	Pressable,
	StatusBar,
	FlatList,
} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { CardEventFollowed, EmptyData, Search } from '../../components'
import { useSelector } from 'react-redux'
import { getFollowEvent } from '../../store/user/asyncActions'

const ListEventFollowCurrentScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	dispatch,
}) => {
	const { current, followEvent } = useSelector(state => state.user)
	const [isSearch, setIsSearch] = useState(false)
	const [valueSearch, setValueSearch] = useState(null)

	useEffect(() => {
		dispatch(
			getFollowEvent({
				limit: 10,
				page: 1,
			}),
		)
	}, [dispatch])

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
			headerTitle: 'Danh Sách Sự Kiện Theo Dõi',
		})
	}, [isSearch])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />

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
				{followEvent?.length > 0 ? (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={followEvent}
						renderItem={({ item, index }) => (
							<CardEventFollowed
								item={item.eventData}
								key={item.eventData.id}
								userId={current.id}
								borderHiden={index === followEvent?.length - 1 ? false : true}
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

export default withBaseComponent(ListEventFollowCurrentScreen)
