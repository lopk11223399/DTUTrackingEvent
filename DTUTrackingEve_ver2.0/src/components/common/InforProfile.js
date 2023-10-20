import { View, Text } from 'react-native'
import React, { memo } from 'react'
import clsx from 'clsx'

const InforProfile = ({ icon, name, type }) => {
	return (
		<View className='flex-row items-center mt-1'>
			<View className='w-[10%] mr-2 items-center'>{icon}</View>
			<Text
				className={clsx(
					'text-[14px] text-text-gray--dark font-[500] flex-1',
					type === 'email' ? '' : 'capitalize',
				)}>
				{name}
			</Text>
		</View>
	)
}

export default memo(InforProfile)
