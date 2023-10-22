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
	const { current } = useSelector(state => state.user)
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
		<SafeAreaView className='flex-1 bg-background--primary--dark'>
			<StatusBar barStyle={'light-content'} />

			<KeyboardAwareScrollView>
				<View className='w-full h-full items-center p-4'>
					<Logo />

					<View className='mt-[24px]'>
						<Text className='capitalize text-[24px] font-[600] text-login--title--dark'>
							đăng nhập tài khoản
						</Text>
					</View>

					<View className='w-full mt-[32px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.nameError && 'border-input--err--dark',
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
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.name && payload.name !== '' && (
								<Pressable
									onPress={() => setPayload(prev => ({ ...prev, name: '' }))}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color='#d6d6db'
									/>
								</Pressable>
							)}
						</View>
						{error?.nameError && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.nameError}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.passwordError && 'border-input--err--dark',
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
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.password && payload.password !== '' && (
								<Pressable
									onPress={() =>
										setPayload(prev => ({ ...prev, password: '' }))
									}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color='#d6d6db'
									/>
								</Pressable>
							)}

							<Pressable
								className='ml-2'
								onPress={() => setPasswordHiden(!passwordHiden)}>
								{!passwordHiden ? (
									<Entypo name='eye-with-line' size={24} color='#d6d6db' />
								) : (
									<Entypo name='eye' size={24} color='#d6d6db' />
								)}
							</Pressable>
						</View>
						{error?.passwordError && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.passwordError}
							</Text>
						)}
					</View>

					<Button
						style='w-full h-[44px] mt-[39px] bg-bg-input-active--dark rounded-[8px]'
						styleText='text-[16px] text-text-white--dark'
						children='đăng nhập'
						handlePress={handleSubmit}
					/>

					<View className='flex-row justify-between w-full mt-[20px]'>
						<Pressable onPress={() => setModalVisible(true)}>
							<Text className='text-login--text--navigate--dark capitalize text-[16px]'>
								gặp khó khăn
							</Text>
						</Pressable>

						<Pressable onPress={() => navigate('Register')}>
							<Text className='text-login--text--navigate--dark capitalize text-[16px]'>
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
					<Ionicons name='md-chevron-back' size={50} color='white' />
				</Pressable>
			</View>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<View
					className={clsx(
						`w-[320px] h-[465px] px-5 mx-auto items-center bg-background--secondary--dark rounded-md`,
					)}>
					<Pressable
						onPress={() => setModalVisible(false)}
						className='self-end pt-4'>
						<Ionicons name='close' size={24} color='#737377' />
					</Pressable>

					<Image
						source={askCustomerFeedback}
						className='w-[240px] h-[240px] object-cover'
					/>

					<Text className='capitalize text-text-gray--dark mb-[32px] font-[500] text-[14px] tracking-[0.1px]'>
						gặp khó khăn
					</Text>

					<Button
						handlePress={() => {
							setModalVisible(false)
							navigate('ForgotPassword')
						}}
						children='quên mật khẩu'
						style='bg-bg-input-active--dark w-full h-[44px]'
						styleText='text-input--text--dark text-[16px] font-[600]'
					/>

					<Button
						children='vấn đề thường gặp'
						style='bg-bg-input-active--dark w-full h-[44px] mt-[15px]'
						styleText='text-input--text--dark text-[16px] font-[600]'
					/>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(LoginScreen)
