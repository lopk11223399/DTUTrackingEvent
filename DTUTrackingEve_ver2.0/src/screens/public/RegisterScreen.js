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
import { useSelector } from 'react-redux'

const RegisterScreen = ({ navigation: { navigate }, Ionicons, Entypo }) => {
	const { theme } = useSelector(state => state.app)
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
				setPasswordAgain('')
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
		<SafeAreaView
			className={clsx(
				'flex-1 bg-background--primary--dark',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>

			<KeyboardAwareScrollView>
				<View className='w-full h-full p-4 items-center'>
					<Logo />

					<View className='mt-[12px]'>
						<Text
							className={clsx(
								'capitalize text-[24px] font-[600]',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							đăng ký
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
								error?.nameErr && theme === 'light' && 'border-inpErr_light',
								error?.nameErr &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
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
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.name !== '' && (
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
						{error?.nameErr && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.nameErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'w-full px-3 rounded-md flex-row items-center border',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.usernameErr &&
									theme === 'light' &&
									'border-inpErr_light',
								error?.usernameErr &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
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
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.username !== '' && (
								<Pressable
									onPress={() =>
										setPayload(prev => ({ ...prev, username: '' }))
									}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								</Pressable>
							)}
						</View>
						{error?.usernameErr && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.usernameErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'w-full px-3 rounded-md flex-row items-center border',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.emailErr && theme === 'light' && 'border-inpErr_light',
								error?.emailErr &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
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
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.email !== '' && (
								<Pressable
									onPress={() => setPayload(prev => ({ ...prev, email: '' }))}>
									<Ionicons
										name='close-circle-outline'
										size={24}
										color={theme === 'light' ? '#c1c2c7' : '#575c66'}
									/>
								</Pressable>
							)}
						</View>
						{error?.emailErr && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.emailErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'w-full px-3 rounded-md flex-row items-center border',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.passwordErr &&
									theme === 'light' &&
									'border-inpErr_light',
								error?.passwordErr &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
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
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>
							{payload.password !== '' && (
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
						{error?.passwordErr && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.passwordErr}
							</Text>
						)}
					</View>

					<View className='w-full mt-[19px]'>
						<View
							className={clsx(
								'w-full px-3 rounded-md flex-row items-center border',
								theme === 'light' &&
									'bg-inpBgColor_light border-inpBorder_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'bg-inpBgColor_dark border-inpBorder_dark',
								error?.passwordAgainErr &&
									theme === 'light' &&
									'border-inpErr_light',
								error?.passwordAgainErr &&
									(theme === 'dark' || theme === 'dark-default') &&
									'border-inpErr_dark',
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
								className={clsx(
									'text-[16px] py-[12px] flex-1',
									theme === 'light' && 'text-inpText_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpText_dark',
								)}
								placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
							/>

							{passwordAgain !== '' && (
								<Pressable onPress={() => setPasswordAgain('')}>
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
						{error?.passwordAgainErr && (
							<Text
								className={clsx(
									'mt-[4px] font-[400] text-[12px]',
									theme === 'light' && 'text-inpErr_light',
									(theme === 'dark' || theme === 'dark-default') &&
										'text-inpErr_dark',
								)}>
								{error?.passwordAgainErr}
							</Text>
						)}
					</View>

					<Button
						handlePress={handSubmit}
						style={clsx(
							'w-full h-[44px] mt-[39px] bg-bg-input-active--dark rounded-[8px]',
							theme === 'light' && 'bg-tColor_bg_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-tColor_bg_dark',
						)}
						styleText='text-[16px] text-tColor_text'
						children='đăng ký'
					/>

					<View className='w-full justify-center items-center flex-row mt-[20px]'>
						<Text
							className={clsx(
								'capitalize text-[16px] font-[400]',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>
							đã có tài khoản?
						</Text>
						<Pressable onPress={() => navigate('Login')}>
							<Text className={clsx('capitalize text-[16px] text-tColor_text')}>
								đăng nhập
							</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}

export default withBaseComponent(RegisterScreen)
