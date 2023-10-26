import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Pressable,
	StatusBar,
} from 'react-native'
import React, { useCallback, useLayoutEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { settings } from '../../utils/contants'
import clsx from 'clsx'
import Button from '../../components/button/Button'
import { useSelector } from 'react-redux'
import { logout } from '../../store/user/userSlice'

const SettingScreen = ({
	navigation: { navigate, setOptions, goBack },
	Ionicons,
	AntDesign,
	dispatch,
}) => {
	const { current } = useSelector(state => state.user)
	const { theme } = useSelector(state => state.app)

	const handleLogout = useCallback(() => {
		dispatch(logout())
		goBack()
		navigate('Home')
	}, [])

	const handleNavigate = goNavigate => {
		if (goNavigate === 'ManageView') return navigate(goNavigate)
		if (goNavigate === 'Feedback') return navigate(goNavigate)

		if (current === null) navigate('Login')
		else navigate(goNavigate)
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
			headerTitle: 'Thiết Lập',
		})
	}, [theme])

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
			<ScrollView className='px-3 py-4'>
				{settings.map((el, index) => (
					<Pressable
						onPress={() => handleNavigate(el.navigate)}
						key={el.id}
						className={clsx(
							'px-3 pt-5',
							index === 0 && 'rounded-t-md',
							settings.length - 1 === index && 'rounded-b-md',
							theme === 'light' && 'bg-backgroundColor_secondary_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-backgroundColor_secondary_dark',
						)}>
						<View
							className={clsx(
								'flex-row items-center pb-5',
								settings.length - 1 !== index &&
									'border-b border-textColor_secondary_dark',
								theme === 'light' && 'border-textColor_secondary_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'border-textColor_secondary_dark',
							)}>
							<Text
								className={clsx(
									'capitalize flex-1 text-[16px] font-bold',
									theme === 'light' && 'text-textColor_main_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-textColor_main_dark',
								)}>
								{el.text}
							</Text>
							<AntDesign
								name='right'
								size={16}
								color={theme === 'light' ? '#00000073' : '#ffffff73'}
							/>
						</View>
					</Pressable>
				))}
				{current && (
					<Button
						handlePress={handleLogout}
						children='thoát đăng nhập'
						styleText='text-tColor_text capitalize text-[16px] font-bold'
						style={clsx(
							'mt-5 bg-text-desc--dark w-full h-[48px] rounded-full',
							theme === 'light' && 'bg-tColor_bg_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-tColor_bg_dark',
						)}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default withBaseComponent(SettingScreen)
