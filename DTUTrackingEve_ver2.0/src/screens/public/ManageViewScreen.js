import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	TouchableOpacity,
	Alert,
} from 'react-native'
import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { darkView, lightView, settingView } from '../../utils/contants'
import clsx from 'clsx'

const ManageViewScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	AsyncStorage,
	dispatch,
}) => {
	const [chooseView, setChooseView] = useState(null)

	useEffect(() => {
		const getView = async () => {
			// const response = await AsyncStorage.getItem('ViewApp')
			// setChooseView(response || settingView[0].value)
		}
		getView()
	}, [])

	const handleChangeView = async value => {
		try {
			// await AsyncStorage.setItem('ViewApp', value)
			// setChooseView(value)
			// if (value === settingView[0].value) dispatch(addTheme(darkView))
			// else if (value === settingView[1].value) dispatch(addTheme(lightView))
			// else if (value === settingView[2].value) dispatch(addTheme(darkView))
		} catch (error) {
			Alert.alert(error)
		}
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
			headerTitle: 'Cài Đặt Hiển Thị',
		})
	}, [])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<View className='px-3 py-4'>
				{settingView.map((el, index) => (
					<Pressable
						onPress={() => handleChangeView(el.value)}
						key={el.id}
						className={clsx(
							'bg-background--secondary--dark px-3 pt-5',
							index === 0 && 'rounded-t-md',
							settingView.length - 1 === index && 'rounded-b-md',
						)}>
						<View
							className={clsx(
								'flex-row items-center pb-5',
								settingView.length - 1 !== index &&
									'border-b border-text-desc--dark',
							)}>
							<Text className='text-text-white--dark capitalize flex-1 text-[16px] font-bold'>
								{el.text}
							</Text>
							<View
								className={clsx(
									'w-[16px] h-[16px] bg-text-white--dark rounded-full',
									el.value === chooseView && 'bg-text-main--dark',
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
