import { View, Text, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useLayoutEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'

const FeedbackScreen = ({ navigation: { setOptions, goBack }, Ionicons }) => {
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
			headerTitle: 'Chăm Sóc Khách Hàng',
		})
	}, [])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />
			<View className='px-4 my-auto items-center'>
				<Text className='text-center text-[20px] text-text-white--dark font-[600] mb-3'>
					Nếu có xảy ra lỗi hay vấn đề liên quan đến sản phẩm vui lòng liên hệ
				</Text>
				<Text className='text-[16px] text-text-main--dark'>
					hoang1311176@gmail.com
				</Text>
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(FeedbackScreen)
