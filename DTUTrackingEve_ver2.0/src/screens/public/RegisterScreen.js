import {
	View,
	Text,
	Pressable,
	SafeAreaView,
	TextInput,
	StatusBar,
	Alert,
} from 'react-native'
import React, { useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { Logo } from '../../components'
import Button from '../../components/button/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import clsx from 'clsx'
import { apiRegister } from '../../apis'

const RegisterScreen = ({
	navigation: { navigate, goBack },
	Ionicons,
	Entypo,
}) => {
	const [error, setError] = useState({
		nameErr: null,
		emailErr: null,
		passwordErr: null,
		passwordAgainErr: null,
		usernameErr: null,
	})
	const [payload, setPayload] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
	})
	const [passwordAgain, setPasswordAgain] = useState('')
	const [passwordHiden, setPasswordHiden] = useState(true)

	const handSubmit = async () => {
		if (payload.name.trim() === '')
			setError(prev => ({
				...prev,
				nameErr: 'Tên không được để trống',
			}))

		if (payload.username.includes(' '))
			setError(prev => ({
				...prev,
				usernameErr: 'Tài khoản không được có ký tự đặc biệt',
			}))
		else if (payload.username.trim() === '')
			setError(prev => ({
				...prev,
				usernameErr: 'Tài khoản không được để trống',
			}))

		if (payload.email.trim() === '')
			setError(prev => ({
				...prev,
				emailErr: 'Email không được để trống',
			}))

		if (payload.password.trim() === '')
			setError(prev => ({
				...prev,
				passwordErr: 'Mật khẩu không được để trống',
			}))

		if (passwordAgain.trim() === '')
			setError(prev => ({
				...prev,
				passwordAgainErr: 'Vui lòng xác thực mật khẩu',
			}))

		if (
			error?.nameErr === null &&
			payload?.name !== '' &&
			error?.emailErr === null &&
			payload?.username !== '' &&
			error?.passwordErr === null &&
			payload?.email !== '' &&
			error?.usernameErr === null &&
			payload?.password !== '' &&
			error?.passwordAgainErr === null
		) {
			const reponse = await apiRegister(payload)
			if (reponse.success === true) {
				setPayload({
					name: '',
					username: '',
					email: '',
					password: '',
				})
				Alert.alert('Thành Công', reponse.mess, [
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Login',
						onPress: () => navigate('Login'),
					},
				])
			} else {
				Alert.alert('Thành Công', reponse.mess)
			}
		}
	}

	return (
		<SafeAreaView className='flex-1 bg-background--primary--dark relative'>
			<StatusBar barStyle={'light-content'} />

			<KeyboardAwareScrollView>
				<View className='w-full h-full p-4 items-center'>
					<Logo />

					<View className='mt-[24px]'>
						<Text className='capitalize text-[24px] font-[600] text-login--title--dark'>
							đăng ký
						</Text>
					</View>

					<View className='w-full mt-[32px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.nameErr && 'border-input--err--dark',
							)}>
							<TextInput
								value={payload.name}
								onChangeText={text => {
									if (payload.name.length < 7)
										setError(prev => ({
											...prev,
											nameErr: 'Phải có ít nhất 8 ký tự',
										}))
									else
										setError(prev => ({
											...prev,
											nameErr: null,
										}))
									setPayload(prev => ({ ...prev, name: text }))
								}}
								placeholder='Tên người dùng'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.name !== '' && (
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
						{error?.nameErr && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.nameErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.usernameErr && 'border-input--err--dark',
							)}>
							<TextInput
								value={payload.username}
								onChangeText={text => {
									if (payload.username.length < 7)
										setError(prev => ({
											...prev,
											usernameErr: 'Phải có ít nhất 8 ký tự',
										}))
									else
										setError(prev => ({
											...prev,
											usernameErr: null,
										}))
									setPayload(prev => ({ ...prev, username: text }))
								}}
								placeholder='Tài khoản người dùng'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.username !== '' && (
								<Pressable
									onPress={() =>
										setPayload(prev => ({ ...prev, username: '' }))
									}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color='#d6d6db'
									/>
								</Pressable>
							)}
						</View>
						{error?.usernameErr && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.usernameErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.emailErr && 'border-input--err--dark',
							)}>
							<TextInput
								value={payload.email}
								onChangeText={text => {
									if (payload.email.length < 7)
										setError(prev => ({
											...prev,
											emailErr: 'Phải có ít nhất 8 ký tự',
										}))
									else if (
										payload.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ===
										null
									)
										setError(prev => ({
											...prev,
											emailErr: 'Đây không phải là email',
										}))
									else
										setError(prev => ({
											...prev,
											emailErr: null,
										}))
									setPayload(prev => ({ ...prev, email: text }))
								}}
								placeholder='Email'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.email !== '' && (
								<Pressable
									onPress={() => setPayload(prev => ({ ...prev, email: '' }))}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color='#d6d6db'
									/>
								</Pressable>
							)}
						</View>
						{error?.emailErr && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.emailErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.passwordErr && 'border-input--err--dark',
							)}>
							<TextInput
								secureTextEntry={passwordHiden}
								value={payload.password}
								onChangeText={text => {
									if (payload.password.length < 7)
										setError(prev => ({
											...prev,
											passwordErr: 'Phải có ít nhất 8 ký tự',
										}))
									else
										setError(prev => ({
											...prev,
											passwordErr: null,
										}))
									setPayload(prev => ({ ...prev, password: text }))
								}}
								placeholder='Vui lòng nhập mật khẩu'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>
							{payload.password !== '' && (
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
						{error?.passwordErr && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.passwordErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'bg-login--bg--button--inp--dark w-full px-3 rounded-md flex-row items-center border border-text-gray--dark',
								error?.passwordAgainErr && 'border-input--err--dark',
							)}>
							<TextInput
								secureTextEntry={passwordHiden}
								value={passwordAgain}
								onChangeText={text => {
									setPasswordAgain(text)
									if (text === payload.password)
										setError(prev => ({
											...prev,
											passwordAgainErr: null,
										}))
									else
										setError(prev => ({
											...prev,
											passwordAgainErr: 'Không trùng khớp với mật khẩu',
										}))
								}}
								placeholder='Vui lòng nhập lại mật khẩu'
								className='text-[16px] py-[12px] flex-1 text-input--text--dark'
								placeholderTextColor={'#4e535c'}
							/>

							{passwordAgain !== '' && (
								<Pressable onPress={() => setPasswordAgain('')}>
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
						{error?.passwordAgainErr && (
							<Text className='mt-[4px] font-[400] text-[12px] text-input--err--dark'>
								{error?.passwordAgainErr}
							</Text>
						)}
					</View>

					<Button
						handlePress={handSubmit}
						style='w-full h-[44px] mt-[39px] bg-bg-input-active--dark rounded-[8px]'
						styleText='text-[16px] text-text-white--dark'
						children='đăng ký'
					/>

					<View className='w-full justify-center items-center flex-row mt-[20px]'>
						<Text className='text-text-white--dark capitalize text-[16px] font-[400]'>
							đã có tài khoản?
						</Text>
						<Pressable onPress={() => navigate('Login')}>
							<Text className='text-login--text--navigate--dark capitalize text-[16px]'>
								đăng nhập
							</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAwareScrollView>

			{/* <View
				className={clsx(
					'absolute',
					Platform.OS === 'ios' ? 'top-[10%] left-[5%]' : 'top-[5%] left-[5%]',
				)}>
				<Pressable onPress={() => goBack()}>
					<Ionicons name='md-chevron-back' size={50} color='white' />
				</Pressable>
			</View> */}
		</SafeAreaView>
	)
}

export default withBaseComponent(RegisterScreen)
