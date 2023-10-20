import { View, Text } from 'react-native'
import React, { memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'

const Pagination = ({ totalCount, min, max, text, AntDesign }) => {
	return (
		<View className='bg-gray-100 py-3 px-5 flex-row items-center justify-between shadow-inner'>
			<Text className='font-semibold text-gray-500'>
				Đang xem {min}-{max} tổng {totalCount} {text}
			</Text>

			<View className='flex-row items-center gap-3'>
				<AntDesign name='leftcircleo' size={24} color='gray' />
				<View className='bg-gray-300 w-[24px] h-[24px] rounded-full items-center justify-center'>
					<Text className='text-black'>1</Text>
				</View>
				<AntDesign name='rightcircleo' size={24} color='gray' />
			</View>
		</View>
	)
}

export default withBaseComponent(memo(Pagination))
