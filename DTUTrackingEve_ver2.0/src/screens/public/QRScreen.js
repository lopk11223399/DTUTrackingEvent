import {
	View,
	Text,
	Pressable,
	StatusBar,
	SafeAreaView,
	TouchableOpacity,
	Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { apiGetDetailEvents, apiScanQREvent } from '../../apis'
import { useSelector } from 'react-redux'
import { getCurrent } from '../../store/user/asyncActions'

const QRScreen = ({ navigation: { goBack, navigate }, Ionicons, dispatch }) => {
	const { current } = useSelector(state => state.user)
	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(true)

	const getBarCodeScannerPermissions = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync()
		setHasPermission(status === 'granted')
	}

	useEffect(() => {
		getBarCodeScannerPermissions()
	}, [])

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			return response.response
		}
	}

	const scanQREvent = async eid => {
		const response = await apiScanQREvent(eid)

		// if (response.success === true) {
		// 	return response.response
		// }

		return response
	}

	const handleBarCodeScanned = async ({ type, data }) => {
		console.log(data)
		setScanned(true)

		if (!current) {
			return Alert.alert(
				'Thông báo',
				'Bạn chưa đăng nhập. Vui lòng đăng nhập để quét mã',
				[
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Đi đến Login',
						onPress: () => navigate('Login'),
					},
				],
			)
		}

		if (data) {
			const { eventId, roomId } = JSON.parse(data)
			const response = await apiGetDetailEvents(eventId)

			if (response.success) {
				if (response.response.userJoined.some(el => +el.id === +current.id)) {
					const joinEvent = await apiScanQREvent({ eventId, roomId })
					if (joinEvent.success) {
						dispatch(getCurrent())
						return Alert.alert(
							'Thông báo',
							`Cảm ơn bạn bạn đã tham gia sự kiện!`,
							[
								{
									text: 'Ok',
									style: 'cancel',
								},
							],
						)
					} else return Alert.alert('Thông báo', joinEvent.mess)
				} else
					return Alert.alert('Thông báo', 'Bạn chưa tham gia sự kiện', [
						{
							text: 'Hủy',
							style: 'cancel',
						},
						{
							text: 'Đi đến sự kiện',
							onPress: () =>
								navigate('DetailEvent', {
									eventId: eventId,
									userId: current.id,
								}),
						},
					])
			} else
				return Alert.alert('Thông báo', 'Không thể nhận dạng vui lòng quét lại')
		}
	}

	if (hasPermission === null) {
		return (
			<SafeAreaView className='justify-center items-center flex-1 relative bg-background--primary--dark'>
				<StatusBar barStyle={'light-content'} />
				<Pressable
					className='absolute top-[10%] left-6'
					onPress={() => goBack()}>
					<Ionicons name='arrow-back' size={50} color='#e8e6e3' />
				</Pressable>
				<Text className='text-color--text-button--dark text-[16px] font-[600] capitalize'>
					Yêu cầu quyền sử dụng máy ảnh
				</Text>
			</SafeAreaView>
		)
	}

	if (hasPermission === false) {
		return (
			<SafeAreaView className='justify-center items-center flex-1 relative bg-background--primary--dark'>
				<StatusBar barStyle={'light-content'} />
				<Pressable
					className='absolute top-[10%] left-6'
					onPress={() => goBack()}>
					<Ionicons name='arrow-back' size={50} color='#e8e6e3' />
				</Pressable>
				<Text className='mb-4 text-[16px] text-text-white--dark font-[700] capitalize'>
					Không có quyền truy cập vào máy ảnh
				</Text>
				<TouchableOpacity
					onPress={() => getBarCodeScannerPermissions()}
					className='bg-color--bg-button--dark rounded-md'>
					<Text className='px-2 py-3 text-color--text-button--dark text-[16px] font-[600] capitalize'>
						Cho phép Camarea
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		)
	}

	return (
		<View className='flex-1 relative'>
			<StatusBar barStyle={'light-content'} />

			<View className='absolute top-[10%] left-6 z-50'>
				<Pressable onPress={() => goBack()}>
					<Ionicons name='arrow-back' size={50} color='white' />
				</Pressable>
			</View>

			<View className='flex-1 items-center justify-center relative'>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					className='w-full h-full'
				/>
				<View className='border-l-4 border-t-4 border-white absolute top-[30%] left-[15%] w-[50px] h-[50px]'></View>
				<View className='border-r-4 border-t-4 border-white absolute top-[30%] right-[15%] w-[50px] h-[50px]'></View>
				<View className='border-r-4 border-b-4 border-white absolute top-[55%] right-[15%] w-[50px] h-[50px]'></View>
				<View className='border-l-4 border-b-4 border-white absolute top-[55%] left-[15%] w-[50px] h-[50px]'></View>
			</View>
			<View className='absolute bottom-[15%] z-50 w-full'>
				<Pressable
					onPress={() => setScanned(false)}
					className='w-[50%] bg-lineTabColor mx-auto items-center py-3 rounded-md flex-row justify-center'>
					<Ionicons name='scan' size={24} color='white' />
					<Text className='text-[20px] font-[500] pl-4 text-white'>Quét</Text>
				</Pressable>
			</View>
		</View>
	)
}

export default withBaseComponent(QRScreen)
