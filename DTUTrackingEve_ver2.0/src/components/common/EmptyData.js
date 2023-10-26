import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import imageBox from '../../assets/box.png'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const EmptyData = () => {
	const { theme } = useSelector(state => state.app)
	return (
		<View className='h-full items-center justify-center'>
			<Image source={imageBox} className='w-[172px] h-[132px] object-cover' />
			<Text
				className={clsx(
					'text-[14px] text-text-gray--dark font-[500] my-1',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				Không có gì ở đây hết
			</Text>
		</View>
	)
}

export default memo(EmptyData)
