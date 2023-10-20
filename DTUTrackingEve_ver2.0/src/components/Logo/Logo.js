import { View, Text } from 'react-native'
import React from 'react'

const Logo = () => {
	return (
		<View className='items-center my-[40px]'>
			<Text className='text-[50px] font-[800] text-panel-red--dark'>DTU</Text>
			<Text className='text-[24px] font-[800] text-panel-gray--dark capitalize text-center'>
				event tracking application
			</Text>
		</View>
	)
}

export default Logo
