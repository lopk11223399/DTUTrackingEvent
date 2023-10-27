import {
	View,
	Text,
	StatusBar,
	SafeAreaView,
	TextInput,
	Pressable,
	Image,
	Platform,
	Alert,
} from 'react-native'
import React, { useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { Logo } from '../../components'
import Button from '../../components/button/Button'
import Modal from 'react-native-modal'
import askCustomerFeedback from '../../assets/ask-customer-feedback.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import clsx from 'clsx'
import { apiLogin } from '../../apis'
import { login } from '../../store/user/userSlice'
import { useSelector } from 'react-redux'

const LoginScreen = ({
	navigation: { goBack, navigate },
	Ionicons,
	Entypo,
	dispatch,
	route,
}) => {
	const { theme } = useSelector(state => state.app)
	const [error, setError] = useState({
		nameError: null,
		passwordError: null,
	})
	const [passwordHiden, setPasswordHiden] = useState(true)
	const [isModalVisible, setModalVisible] = useState(false)
	const [payload, setPayload] = useState({
		name: '',
		password: '',
	})

	const handleSubmit = async () => {
		if (payload.name.includes(' '))
			setError(prev => ({
				...prev,
				nameError: 'Tài khoản không được có ký tự đặc biệt',
			}))
		else if (payload.name.trim() === '')
			setError(prev => ({
				...prev,
				nameError: 'Tài khoản không được để trống',
			}))

		if (payload.password.trim() === '')
			setError(prev => ({
				...prev,
				passwordError: 'Mật khẩu không được để trống',
			}))

		if (error?.nameError === null && error?.passwordError === null) {
			const response = await apiLogin({
				username: payload.name,
				password: payload.password,
			})

			if (response.success === true) {
				dispatch(
					login({
						isLoggedIn: true,
						token: response?.token,
						current: response?.user,
					}),
				)

				if (route.params?.caption) return navigate(route.params?.caption)
				if (route.params?.eventId)
					return navigate('DetailEvent', {
						eventId: route.params?.eventId,
						userId: response?.user?.id,
						caption: route.name,
					})

				navigate('Home')
			} else {
				Alert.alert('Thông báo', response.mess)
			}
		}
	}

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

			<KeyboardAwareScrollView>
				<View className='w-full h-full items-center p-4'>
					<Logo />

					<View className='mt-[12px]'>
						<Text
							className={clsx(
								'capitalize text-[24px] font-[600] ',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							đăng nhập tài khoản
						</Text>
					</View>

					<View className='w-full mt-[32px]'>
						<View
							className={clsx(
								'w-full px-3 rounded-md flex-row items-center border',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.nameError && theme === 'light' && 'border-inpErr_light',
								error?.nameError &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
							)}>
							<TextInput
								value={payload.name}
								onChangeText={text => {
									setError(prev => ({
										...prev,
										nameError: null,
									}))
									setPayload(prev => ({ ...prev, name: text }))
								}}
								placeholder='Tên Người Dùng'
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.name && payload.name !== '' && (
								<Pressable
									onPress={() => setPayload(prev => ({ ...prev, name: '' }))}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								</Pressable>
							)}
						</View>
						{error?.nameError && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.nameError}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.passwordError &&
									theme === 'light' &&
									'border-inpErr_light',
								error?.passwordError &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
							)}>
							<TextInput
								secureTextEntry={passwordHiden}
								value={payload.password}
								onChangeText={text => {
									setError(prev => ({
										...prev,
										passwordError: null,
									}))
									setPayload(prev => ({ ...prev, password: text }))
								}}
								placeholder='Mật khẩu'
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.password && payload.password !== '' && (
								<Pressable
									onPress={() =>
										setPayload(prev => ({ ...prev, password: '' }))
									}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								</Pressable>
							)}

							<Pressable
								className='ml-2'
								onPress={() => setPasswordHiden(!passwordHiden)}>
								{!passwordHiden ? (
									<Entypo
										name='eye-with-line'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								) : (
									<Entypo
										name='eye'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								)}
							</Pressable>
						</View>
						{error?.passwordError && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.passwordError}
							</Text>
						)}
					</View>

					<Button
						style={clsx(
							'w-full h-[44px] mt-[39px] rounded-[8px]',
							theme === 'light' && 'bg-tColor_bg_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-tColor_bg_dark',
						)}
						styleText='text-[16px] text-tColor_text'
						children='đăng nhập'
						handlePress={handleSubmit}
					/>

					<View className='flex-row justify-between w-full mt-[20px]'>
						<Pressable onPress={() => setModalVisible(true)}>
							<Text className='text-tColor_text capitalize text-[16px]'>
								gặp khó khăn
							</Text>
						</Pressable>

						<Pressable onPress={() => navigate('Register')}>
							<Text className='text-tColor_text capitalize text-[16px]'>
								đăng ký ngay
							</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAwareScrollView>

			<View
				className={clsx(
					'absolute',
					Platform.OS === 'ios' ? 'top-[10%] left-[5%]' : 'top-[5%] left-[5%]',
				)}>
				<Pressable onPress={() => goBack()}>
					<Ionicons
						name='md-chevron-back'
						size={50}
						color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
					/>
				</Pressable>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<View
					className={clsx(
						`w-[320px] h-[465px] px-5 mx-auto items-center rounded-md`,
						theme === 'light' && 'bg-backgroundColor_main_light',
						(theme === 'dark' || theme === 'dark-default') &&
							'bg-backgroundColor_main_dark',
					)}>
					<Pressable
						onPress={() => setModalVisible(false)}
						className='self-end pt-4'>
						<Ionicons
							name='close'
							size={24}
							color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
						/>
					</Pressable>

					<Image
						source={askCustomerFeedback}
						className='w-[240px] h-[240px] object-cover'
					/>

					<Text
						className={clsx(
							'capitalize mb-[32px] font-[500] text-[14px] tracking-[0.1px]',
							theme === 'light' && 'text-textColor_secondary_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'text-textColor_secondary_dark',
						)}>
						gặp khó khăn
					</Text>

					<Button
						handlePress={() => {
							setModalVisible(false)
							navigate('ForgotPassword')
						}}
						children='quên mật khẩu'
						style={clsx(
							'w-full h-[44px]',
							theme === 'light' && 'bg-tColor_bg_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-tColor_bg_dark',
						)}
						styleText={clsx('text-[16px] font-[600] text-tColor_text')}
					/>

					<Button
						children='vấn đề thường gặp'
						style={clsx(
							'w-full h-[44px] mt-[15px]',
							theme === 'light' && 'bg-tColor_bg_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-tColor_bg_dark',
						)}
						styleText={clsx('text-tColor_text text-[16px] font-[600]')}
					/>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(LoginScreen)
