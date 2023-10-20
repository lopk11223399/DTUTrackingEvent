import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	Pressable,
	Platform,
	StatusBar,
} from 'react-native'
import React, { useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/button/Button'
import clsx from 'clsx'

const ForgotPasswordScreen = ({ Ionicons, navigation: { goBack } }) => {
	const [error, setError] = useState(false)
	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />

			<KeyboardAwareScrollView
				contentContainerStyle={{
					flex: 1,
				}}>
				<View className='w-full h-full p-4 items-center justify-center'>
					<View className='mt-[24px]'>
						<Text className='capitalize text-[24px] font-[600] text-login--title--dark'>
							quên mật khẩu
						</Text>
					</View>

					<View className='w-full mt-[32px]'>
						<View className='bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center'>
							<TextInput
								placeholder='Email'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							<Pressable>
								<Ionicons
									name='close-circle-outline'
									size={24}
									color='#d6d6db'
								/>
							</Pressable>
						</View>
						{error?.nameError && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark capitalize'>
								Tai khoản không được để trống
							</Text>
						)}
					</View>

					<Button
						style='w-full h-[44px] mt-[39px] bg-bg-input-active--dark rounded-[8px]'
						styleText='text-[16px] text-text-white--dark'
						children='lấy lại mật khẩu'
					/>
				</View>
			</KeyboardAwareScrollView>

			<View
				className={clsx(
					'absolute',
					Platform.OS === 'ios' ? 'top-[10%] left-[5%]' : 'top-[5%] left-[5%]',
				)}>
				<Pressable onPress={() => goBack()}>
					<Ionicons name='md-chevron-back' size={50} color='white' />
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(ForgotPasswordScreen)
