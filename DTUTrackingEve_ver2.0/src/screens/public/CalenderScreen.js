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

const themeLight = {
	calendarBackground: '#f5f6fb',
	textSectionTitleColor: '#00000073',
	selectedDayBackgroundColor: '#657ef8',
	selectedDayTextColor: '#fff',
	todayTextColor: '#657ef8',
	dayTextColor: '#000000d9',
	textDisabledColor: '#00000073',
	monthTextColor: '#657ef8',
	arrowColor: '#657ef8',
	textMonthFontWeight: 'bold',
}

const themeDark = {
	calendarBackground: '#0c0f1d',
	textSectionTitleColor: '#ffffff73',
	selectedDayBackgroundColor: '#657ef8',
	selectedDayTextColor: '#fff',
	todayTextColor: '#62a2f8',
	dayTextColor: '#ffffffd9',
	textDisabledColor: '#ffffff73',
	monthTextColor: '#62a2f8',
	arrowColor: '#657ef8',
	textMonthFontWeight: 'bold',
}

const CalenderScreen = ({ navigation: { setOptions, navigate }, layout }) => {
	const { theme } = useSelector(state => state.app)
	const { current } = useSelector(state => state.user)
	const [selected, setSelected] = useState(moment().format('YYYY-MM-DD'))
	const [eventDay, setEventDay] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [count, setCount] = useState(0)

	useEffect(() => {
		const fetchFirst = async () => {
			const response = await apiGetEvents({
				limit: 50,
				page: 1,
				date: selected,
				status: [2, 3, 4, 5],
			})

			if (response.success === true) {
				setCount(response.count)
				setEventDay(response.response)
			}
		}

		fetchFirst()
	}, [])

	useLayoutEffect(() => {
		setOptions({
			headerStyle: {
				backgroundColor: theme === 'light' ? '#f5f6fb' : '#0c0f1d',
			},
			headerTitleStyle: {
				color: theme === 'light' ? '#000000d9' : '#ffffffd9',
			},
			headerTitleAlign: 'center',
			headerTitle: 'Lịch Sự Kiện',
		})
	}, [theme])

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
		<SafeAreaView
			className={clsx(
				'h-full',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>
			<View className={`h-[${layout.heigth - 50 / 100}]`}>
				<Calendar
					onDayPress={day => {
						setEventDay([])
						setSelected(day.dateString)
					}}
					markedDates={{
						[selected]: {
							selected: true,
							disableTouchEvent: true,
							selectedDotColor: 'black',
						},
					}}
					theme={theme === 'light' ? themeLight : themeDark}
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
