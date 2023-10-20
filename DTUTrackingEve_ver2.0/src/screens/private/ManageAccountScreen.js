import { View, Text, SafeAreaView, StatusBar, Pressable } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import Button from '../../components/button/Button'
import { useSelector } from 'react-redux'

const ManageAccountScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	MaterialIcons,
	Entypo,
}) => {
	const { current } = useSelector(state => state.user)

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
			headerTitle: 'Thiết Lập An Toàn Tài Khoản',
		})
	}, [])

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />

			<View className='p-3'>
				<Text className='text-[20px] text-text-white--dark'>
					Thiết lập an toàn tài khoản
				</Text>

				<View className='flex-row items-center mt-[30px] border-b border-text-gray--dark pb-4'>
					<View className='w-[15%]'>
						<View className='w-[40px] h-[40px] bg-text-main--dark items-center justify-center rounded-full'>
							<MaterialIcons name='email' size={24} color='white' />
						</View>
					</View>

					<View className='w-[55%]'>
						<Text className='text-text-white--dark text-[16px] font-[600]'>
							Email
						</Text>
						<Text className='text-text-desc--dark text-[14px] font-[400]'>
							{current?.email}
						</Text>
					</View>

					<View className='w-[30%]'>
						<Button
							style='w-full border h-[36px] border-text-gray--dark bg-transparent'
							styleText='text-[14px] font-[400] text-text-main--dark'>
							Liên kết
						</Button>
					</View>
				</View>

				<View className='flex-row items-center mt-[30px] border-b border-text-gray--dark pb-4'>
					<View className='w-[15%]'>
						<View className='w-[40px] h-[40px] bg-text-main--dark items-center justify-center rounded-full'>
							<Entypo name='pencil' size={24} color='white' />
						</View>
					</View>

					<View className='w-[55%]'>
						<Text className='text-text-white--dark text-[16px] font-[600]'>
							Đổi Mật Khẩu
						</Text>
					</View>

					<View className='w-[30%]'>
						<Button
							style='w-full border h-[36px] border-text-gray--dark bg-transparent'
							styleText='text-[14px] font-[400] text-text-main--dark'>
							Đổi
						</Button>
					</View>
				</View>

				<View className='flex-row items-center mt-[30px] border-b border-text-gray--dark pb-4'>
					<View className='w-[15%]'>
						<View className='w-[40px] h-[40px] bg-text-main--dark items-center justify-center rounded-full'>
							<Entypo name='trash' size={24} color='white' />
						</View>
					</View>

					<View className='w-[55%]'>
						<Text className='text-text-white--dark text-[16px] font-[600]'>
							Xóa Tài Khoản
						</Text>
					</View>

					<View className='w-[30%]'>
						<Button
							style='w-full border h-[36px] border-text-gray--dark bg-transparent'
							styleText='text-[14px] font-[400] text-text-main--dark'>
							Yêu Cầu Xóa
						</Button>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(ManageAccountScreen)
