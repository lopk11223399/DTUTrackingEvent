import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'

const UserCart = ({ navigation: { navigate } }) => {
	return (
		<Pressable
			className='flex-row items-center mb-4'
			onPress={() => navigate('ChatMessage')}>
			<Image
				source={{
					uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
				}}
				className='w-[65px] h-[65px] object-cover rounded-full'
			/>

			<View className='flex-1 pl-3 gap-1'>
				<View className='flex-row items-center justify-between'>
					<Text className='text-[20px] font-bold'>ABC</Text>
					<Text className='text-green-400 text-[12px]'>online</Text>
				</View>

				<View className='flex-row justify-between items-center'>
					<Text numberOfLines={1} className='text-gray-400 text-[14px] w-[70%]'>
						abcabcabcabcabcabcabc bcabcabcabcabc
						bcabcabcabcabcbcabcabcabcabcbcabcabcabcabcbcabcabcabcabcbcabcabcabcabc
					</Text>

					<Text className='text-[12px] text-gray-400'>2 giờ trước</Text>
				</View>
			</View>
		</Pressable>
	)
}

export default withBaseComponent(UserCart)
