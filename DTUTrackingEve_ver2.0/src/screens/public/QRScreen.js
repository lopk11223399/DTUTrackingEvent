import {
	View,
	Text,
	Pressable,
	StatusBar,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { BarCodeScanner } from 'expo-barcode-scanner'

const QRScreen = ({ navigation: { goBack }, Ionicons }) => {
	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)

	const getBarCodeScannerPermissions = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync()
		setHasPermission(status === 'granted')
	}

	useEffect(() => {
		getBarCodeScannerPermissions()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		alert(`Bar code with type ${type} and data ${data} has been scanned!`)
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
		<View className='flex-1 relative bg-black items-center'>
			<StatusBar barStyle={'light-content'} />

			<View className='absolute top-[10%] left-6 z-50'>
				<Pressable onPress={() => goBack()}>
					<Ionicons name='arrow-back' size={50} color='white' />
				</Pressable>
			</View>

			<View className='flex-1 items-center justify-center'>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					className='w-[300px] h-[300px]'
				/>
			</View>
		</View>
	)
}

export default withBaseComponent(QRScreen)
