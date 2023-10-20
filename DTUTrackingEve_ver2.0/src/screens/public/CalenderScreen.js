import {
	View,
	SafeAreaView,
	StatusBar,
	Text,
	FlatList,
	ActivityIndicator,
} from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import moment from 'moment/moment'
import { CardEventMini, EmptyData } from '../../components'
import withBaseComponent from '../../hocs/withBaseComponent'
import { useSelector } from 'react-redux'
import { apiGetEvents } from '../../apis'
import clsx from 'clsx'

LocaleConfig.locales['fr'] = {
	monthNames: [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	],
	monthNamesShort: [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12',
	],
	dayNames: [
		'Chủ nhật',
		'Thứ hai',
		'Thứ ba',
		'Thứ tư',
		'Thứ năm',
		'Thứ sáu',
		'Thứ bảy',
	],
	dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
	today: 'Hôm nay',
}

LocaleConfig.defaultLocale = 'fr'

const CalenderScreen = ({ navigation: { setOptions }, layout }) => {
	const { current } = useSelector(state => state.user)
	const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'))
	const [eventDay, setEventDay] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const fetchEventDay = async type => {
		setIsLoading(true)

		const response = await apiGetEvents({
			limit: 5,
			page: currentPage,
			date: selected,
		})

		if (response.success === true && type === 'date')
			setEventDay(response.response)
		if (response.success === true && type === 'page')
			setEventDay([...eventDay, response.response])
	}

	// useEffect(() => {
	// 	fetchEventDay('page')
	// }, [currentPage])

	useEffect(() => {
		fetchEventDay('date')
	}, [selected])

	useLayoutEffect(() => {
		setOptions({
			headerStyle: {
				backgroundColor: '#161722',
			},
			headerTitle: () => (
				<Text className='text-[18px] text-text-white--dark font-[700] capitalize'>
					lịch sự kiện
				</Text>
			),
		})
	}, [])

	const renderLoader = () => {
		return isLoading ? (
			<View className='mt-1'>
				<ActivityIndicator size={'small'} color={'#62a2f8'} />
			</View>
		) : null
	}

	const loadMoreItem = () => {
		setCurrentPage(currentPage + 1)
	}

	return (
		<SafeAreaView className='h-full bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />
			<View className={`h-[${layout.heigth - 50 / 100}]`}>
				<Calendar
					onDayPress={day => {
						setSelected(day.dateString)
					}}
					markedDates={{
						[selected]: {
							selected: true,
							disableTouchEvent: true,
							selectedDotColor: 'black',
						},
					}}
					theme={{
						calendarBackground: '#161722',
						textSectionTitleColor: '#e8e6e3',
						selectedDayBackgroundColor: '#657ef8',
						selectedDayTextColor: '#fafeff',
						todayTextColor: '#62a2f8',
						dayTextColor: '#e8e6e3',
						textDisabledColor: '#737377',
						monthTextColor: '#62a2f8',
						arrowColor: '#657ef8',
						textMonthFontWeight: 'bold',
					}}
				/>
			</View>

			{eventDay.length > 0 ? (
				<FlatList
					className={clsx(
						'px-2 border-t border-text-gray--dark',
						`h-[${layout.heigth - 50 / 100}]`,
					)}
					showsVerticalScrollIndicator={false}
					data={eventDay}
					renderItem={({ item, index }) => (
						<CardEventMini
							item={item}
							key={index}
							userId={current?.id || 0}
							borderHiden={index === eventDay?.length - 1 ? false : true}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
					// ListFooterComponent={renderLoader}
					// onEndReached={loadMoreItem}
					// onEndReachedThreshold={0}
				/>
			) : (
				<View
					className={clsx(
						'border-t border-text-gray--dark flex-1',
						`h-[${layout.heigth - 50 / 100}]`,
					)}>
					<EmptyData />
				</View>
			)}
		</SafeAreaView>
	)
}

export default withBaseComponent(CalenderScreen)
