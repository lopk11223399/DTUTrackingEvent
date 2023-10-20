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
			headerTitle: 'Thiết Lập',
		})
	}, [])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />
			<ScrollView className='px-3 py-4'>
				{settings.map((el, index) => (
					<Pressable
						onPress={() => handleNavigate(el.navigate)}
						key={el.id}
						className={clsx(
							'px-3 pt-5 bg-background--secondary--dark ',
							index === 0 && 'rounded-t-md',
							settings.length - 1 === index && 'rounded-b-md',
						)}>
						<View
							className={clsx(
								'flex-row items-center pb-5',
								settings.length - 1 !== index &&
									'border-b border-text-desc--dark',
							)}>
							<Text className='text-text-white--dark capitalize flex-1 text-[16px] font-bold'>
								{el.text}
							</Text>
							<AntDesign name='right' size={16} color='#676568' />
						</View>
					</Pressable>
				))}
				{current && (
					<Button
						handlePress={handleLogout}
						children='thoát đăng nhập'
						styleText='text-text-white--dark capitalize text-[16px] font-bold'
						style='mt-5 bg-text-desc--dark w-full h-[48px] rounded-full'
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default withBaseComponent(SettingScreen)
