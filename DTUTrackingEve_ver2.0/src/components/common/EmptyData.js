import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import imageBox from '../../assets/box.png'

const EmptyData = () => {
	return (
		<View className='h-full items-center justify-center'>
			<Image source={imageBox} className='w-[172px] h-[132px] object-cover' />
			<Text className='text-[14px] text-text-gray--dark font-[500] my-1'>
				Không có gì ở đây hết
			</Text>
		</View>
	)
}

export default memo(EmptyData)
