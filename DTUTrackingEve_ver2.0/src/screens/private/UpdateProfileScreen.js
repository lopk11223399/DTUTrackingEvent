import {
	View,
	Text,
	SafeAreaView,
	Image,
	Pressable,
	Dimensions,
	Platform,
	TextInput,
	StatusBar,
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { gender, user } from '../../utils/contants'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment/moment'
import { handleDate } from '../../utils/helper'
import Modal from 'react-native-modal'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import SelectDropdown from 'react-native-select-dropdown'
import * as ImagePicker from 'expo-image-picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/button/Button'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import avatarDefault from '../../assets/avatarDefault.png'
import { apiUpdateCurrent } from '../../apis'

const { height } = Dimensions.get('window')

const UpdateProfileScreen = ({
	route,
	navigation: { setOptions, goBack },
	Ionicons,
}) => {
	const { current } = useSelector(state => state.user)
	const [userInfo, setUserInfo] = useState({
		name: current.name,
		birthDate: current.birthDate,
		gender: current.gender.toString(),
		address: current.address,
		phone: current.phone,
	})
	const [date, setDate] = useState(
		userInfo.birthDate === null
			? new Date(moment())
			: new Date(handleDate(userInfo.birthDate)),
	)
	const [isModalVisible, setModalVisible] = useState(false)
	const [avaterUpdate, setavaterUpdate] = useState(current.avatar)

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
			headerTitle: 'Thông Tin Cá Nhân',
		})
	}, [])

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate
		setDate(currentDate)
		setUserInfo(prev => ({
			...prev,
			birthDate: moment(selectedDate).format('DD/MM/YYYY'),
		}))
	}

	const showDatepicker = () => {
		if (Platform.OS === 'ios') {
			setModalVisible(true)
		} else showMode('date')
	}

	const showMode = currentMode => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: currentMode,
			themeVariant: 'drak',
			locale: 'vi-VN',
		})
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})

		if (!result.canceled) {
			setavaterUpdate(result.assets[0].uri)
		}
	}

	const handleSubmit = async () => {
		const formData = new FormData()
		let newFile

		if (avaterUpdate !== null) {
			newFile = {
				uri: avaterUpdate,
				type: `test/${avaterUpdate.split('.')[1]}`,
				name: `test/${avaterUpdate.split('.')[1]}`,
			}

			formData.append('avatar', newFile)
		}

		for (let i of Object.entries(userInfo)) {
			if (i[1] === null) continue
			formData.append(i[0], i[1])
		}

		const response = await apiUpdateCurrent(formData)
		console.log(response)
	}

	return (
		<View className='flex-1'>
			<SafeAreaView className='flex-1 bg-background--primary--dark'>
				<StatusBar barStyle={'light-content'} />

				<KeyboardAwareScrollView>
					<View className='w-full h-full px-3'>
						<View className='items-center mt-3'>
							<Image
								source={
									avaterUpdate === null ? avatarDefault : { uri: avaterUpdate }
								}
								className='w-[112px] h-[112px] rounded-full'
							/>
							<Button
								handlePress={pickImage}
								style='w-[200px] mt-3 bg-[#343746] h-[44px]'
								styleText='text-text-white--dark text-[16px]'>
								chọn ảnh đại diện
							</Button>
						</View>
						<View className='mt-3'>
							<View className='mb-3'>
								<Text className='text-[16px] capitalize text-[#ffffffa6] mb-2'>
									Nickname
								</Text>
								<TextInput
									placeholder='Tên người dùng'
									placeholderTextColor={'#4e535c'}
									value={userInfo.name}
									className='py-[10px] px-[14px] border rounded-[8px] bg-transparent border-[#343746] text-[#ffffffa9]'
								/>
							</View>
							<View className='mb-3'>
								<Text className='text-[16px] capitalize text-[#ffffffa6] mb-2'>
									giới tính
								</Text>
								<SelectDropdown
									data={gender.map(el => el.label)}
									defaultValue={
										gender.find(el => el.value === userInfo.gender).label
									}
									onSelect={selectedItem =>
										setUserInfo(prev => ({
											...prev,
											gender: selectedItem === 'Nam' ? 'false' : 'true',
										}))
									}
									buttonTextStyle={{
										fontSize: 14,
										color: '#ffffffa9',
										textAlign: 'left',
									}}
									buttonStyle={[
										{
											width: '100%',
											height: 36,
											borderRadius: 10,
											backgroundColor: 'transparent',
											borderWidth: 1,
											borderColor: '#343746',
										},
										Platform.OS === 'ios' ? { height: 36 } : { height: 46 },
									]}
									dropdownStyle={{
										borderRadius: 8,
									}}
								/>
							</View>
							<View className='mb-3'>
								<Text className='text-[16px] capitalize text-[#ffffffa6] mb-2'>
									số điện thoại
								</Text>
								<TextInput
									keyboardType='numeric'
									placeholder='Số điện thoại'
									placeholderTextColor={'#4e535c'}
									className='py-[10px] px-[14px] border rounded-[8px] bg-transparent border-[#343746] text-[#ffffffa9]'
									value={userInfo.phone}
								/>
							</View>
							<View className='mb-3'>
								<Text className='text-[16px] capitalize text-[#ffffffa6] mb-2'>
									nơi sinh sống
								</Text>
								<TextInput
									multiline
									placeholder='Nơi sinh sống'
									placeholderTextColor={'#4e535c'}
									className='py-[10px] px-[14px] border rounded-[8px] bg-transparent border-[#343746] text-[#ffffffa9]'
									value={userInfo.address}
								/>
							</View>
							<View className={clsx('mb-3')}>
								<Text
									className={clsx(
										'text-[16px] capitalize text-[#ffffffa6] mb-2',
									)}>
									sinh nhật
								</Text>
								<Pressable
									onPress={showDatepicker}
									className='py-[10px] px-[14px] border rounded-[8px] bg-transparent border-[#343746]'>
									<Text className='text-[#ffffffa9]'>
										{userInfo.birthDate !== null
											? moment(userInfo.birthDate).format('DD/MM/YYYY')
											: moment().format('DD/MM/YYYY')}
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</KeyboardAwareScrollView>

				<View className='items-center'>
					<Button
						handlePress={handleSubmit}
						style={clsx('w-[300px] h-[44px] mb-2 bg-text-main--dark')}
						styleText={'text-text-white--dark text-[16px]'}>
						lưu
					</Button>
				</View>
			</SafeAreaView>

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<View
					className={clsx(
						`w-[320px] h-[332px] px-5 mx-auto items-center bg-background--secondary--dark rounded-md`,
					)}>
					<Pressable
						onPress={() => setModalVisible(false)}
						className='self-end pt-4'>
						<Ionicons name='close' size={24} color='#737377' />
					</Pressable>

					<View>
						<DateTimePicker
							testID='dateTimePicker'
							value={date}
							mode={'date'}
							display='spinner'
							onChange={onChange}
							locale='vi_VN'
						/>
					</View>

					<Button
						handlePress={() => {
							setModalVisible(false)
						}}
						children='xác nhận'
						style='bg-bg-input-active--dark w-full h-[44px] mt-4'
						styleText='text-input--text--dark text-[16px] font-[600]'
					/>
				</View>
			</Modal>
		</View>
	)
}

export default withBaseComponent(UpdateProfileScreen)
