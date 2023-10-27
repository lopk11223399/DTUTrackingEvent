import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const Logo = () => {
	const { theme } = useSelector(state => state.app)

	return (
		<View className='items-center my-[40px]'>
			<Text
				className={clsx(
					'text-[50px] font-[800]',
					theme === 'light' && 'text-statusColor_icon_red_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-statusColor_icon_red_dark',
				)}>
				DTU
			</Text>
			<Text
				className={clsx(
					'text-[24px] font-[800] capitalize text-center',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				event tracking application
			</Text>
		</View>
	)
}

export default Logo
