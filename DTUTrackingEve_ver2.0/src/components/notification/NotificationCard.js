import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import withBaseComponent from '../../hocs/withBaseComponent'

moment.locale('vi')

const NotificationCard = ({
	item,
	type,
	navigation: { navigate },
	AntDesign,
}) => {
	return (
		<View
			className='bg-[#1b1d2a] p-3 mb-3 rounded-[16px]'
			onPress={() =>
				navigate('DetailEvent', {
					eventId: item.senderId,
					userId: item.recipientId,
				})
			}>
			<Text className='text-[12px] text-[#b2bdce] capitalize'>
				{moment(item.senderData.createdAt).fromNow()}
			</Text>
			<Text className='text-[16px] text-[#ffffffd9] font-bold capitalize mt-[12px]'>
				{item.senderData.name}
			</Text>
			<Text className='text-[14px] text-[#ffffffd9] capitalize mt-[12px]'>
				{item.senderData.content}
			</Text>
			<Pressable className='flex-row items-center mt-[12px]'>
				<Text className='text-[14px] text-[#657ef8] capitalize mr-[6px]'>
					nhấn để tiếp tục
				</Text>
				<AntDesign name='right' size={10} color='#657ef8' />
			</Pressable>
		</View>
	)
}

export default withBaseComponent(NotificationCard)
