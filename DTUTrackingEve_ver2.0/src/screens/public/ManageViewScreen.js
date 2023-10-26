import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	Alert,
	StatusBar,
} from 'react-native'
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { settingView } from '../../utils/contants'
import clsx from 'clsx'
import { changeTheme } from '../../store/app/appSlice'
import { useSelector } from 'react-redux'

const ManageViewScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	AsyncStorage,
	dispatch,
}) => {
	const [chooseView, setChooseView] = useState(null)
	const { theme } = useSelector(state => state.app)

	const handleChangeView = async value => {
		try {
			await AsyncStorage.setItem('ViewApp', value)
			setChooseView(value)
			dispatch(changeTheme({ theme: value }))
		} catch (error) {
			Alert.alert(error)
		}
	}

	useEffect(() => {
		const getView = async () => {
			const response = await AsyncStorage.getItem('ViewApp')
			setChooseView(response || settingView[0].value)
		}
		getView()
	}, [])

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
			headerTitle: 'Cài Đặt Hiển Thị',
		})
	}, [theme])

	return (
		<SafeAreaView
			className={clsx(
				'flex-1 ',
				chooseView === 'light' && 'bg-backgroundColor_main_light',
				(chooseView === 'dark' || chooseView === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={chooseView === 'light' ? 'dark-content' : 'light-content'}
			/>
			<View className='px-3 py-4'>
				{settingView.map((el, index) => (
					<Pressable
						onPress={() => handleChangeView(el.value)}
						key={el.id}
						className={clsx(
							'px-3 pt-5',
							index === 0 && 'rounded-t-md',
							settingView.length - 1 === index && 'rounded-b-md',
							chooseView === 'light' && 'bg-backgroundColor_secondary_light',
							(chooseView === 'dark' || chooseView === 'dark-default') &&
								'bg-backgroundColor_secondary_dark',
						)}>
						<View
							className={clsx(
								'flex-row items-center pb-5',
								settingView.length - 1 !== index &&
									'border-b border-textColor_secondary_dark',
								chooseView === 'light' && 'border-textColor_secondary_light',
								(chooseView === 'dark' || chooseView === 'dark-default') &&
									'border-textColor_secondary_dark',
							)}>
							<Text
								className={clsx(
									'capitalize flex-1 text-[16px] font-bold',
									chooseView === 'light' && 'text-textColor_main_light',
									(chooseView === 'dark' || chooseView === 'dark-default') &&
										'text-textColor_main_dark',
								)}>
								{el.text}
							</Text>
							<View
								className={clsx(
									'w-[16px] h-[16px] bg-backgroundColor_main_light rounded-full',
									el.value === chooseView && 'bg-lineTabColor',
								)}
							/>
						</View>
					</Pressable>
				))}
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(memo(ManageViewScreen))
