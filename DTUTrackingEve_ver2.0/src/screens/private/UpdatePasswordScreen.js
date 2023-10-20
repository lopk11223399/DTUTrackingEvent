import {
	View,
	Text,
	SafeAreaView,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	TextInput,
	Keyboard,
	Pressable,
	Platform,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'

const UpdatePasswordScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
}) => {
	useLayoutEffect(() => {
		setOptions({
			headerTitle: 'Thay Đổi Mật Khẩu',
			headerLeft: () => (
				<Ionicons
					onPress={() => goBack()}
					name='arrow-back'
					size={24}
					color='black'
				/>
			),
		})
	}, [])

	return (
		<SafeAreaView className='bg-white flex-1'>
			<KeyboardAvoidingView className='flex-1'>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className='flex-1 gap-4 mt-2 px-3'>
						<View>
							<Text className='capitalize font-medium text-[18px] mb-1'>
								Nhập Mật Khẩu hiện tại
							</Text>
							<TextInput
								secureTextEntry={true}
								placeholder='nhập mật khẩu hiện tại'
								className={clsx(
									'border pl-2 py-2 rounded-md',
									Platform.OS === 'ios' && 'py-4',
								)}
							/>
						</View>

						<View>
							<Text className='capitalize font-medium text-[18px] mb-1'>
								Nhập Mật Khẩu mới
							</Text>
							<TextInput
								secureTextEntry={true}
								placeholder='nhập mật khẩu mới'
								className={clsx(
									'border pl-2 py-2 rounded-md',
									Platform.OS === 'ios' && 'py-4',
								)}
							/>
						</View>

						<View>
							<Text className='capitalize font-medium text-[18px] mb-1'>
								xác thực mật khẩu mới
							</Text>
							<TextInput
								secureTextEntry={true}
								placeholder='xác thực mật khẩu mới'
								className={clsx(
									'border pl-2 py-2 rounded-md',
									Platform.OS === 'ios' && 'py-4',
								)}
							/>
						</View>

						<View className='flex-row justify-center'>
							<Pressable className='bg-red-400 w-[100px] mr-2 rounded-md'>
								<Text className='text-center py-2 text-white text-[16px] font-medium'>
									Hủy
								</Text>
							</Pressable>
							<Pressable className='bg-blue-400 w-[100px] ml-2 rounded-md'>
								<Text className='text-center py-2 text-white text-[16px] font-medium'>
									Xác Nhận
								</Text>
							</Pressable>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default withBaseComponent(UpdatePasswordScreen)
