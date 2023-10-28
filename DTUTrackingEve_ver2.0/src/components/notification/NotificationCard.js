import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

moment.locale('vi')

const NotificationCard = ({
	item,
	type,
	navigation: { navigate },
	AntDesign,
}) => {
	const { theme } = useSelector(state => state.app)
	return (
		<View
			className={clsx(
				'p-3 mb-3 rounded-[16px]',
				theme === 'light' && 'bg-backgroundColor_secondary_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_secondary_dark',
			)}
			onPress={() =>
				navigate('DetailEvent', {
					eventId: item.senderId,
					userId: item.recipientId,
				})
			}>
			<Text
				className={clsx(
					'text-[12px] text-[#b2bdce] capitalize',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				{moment(item.senderData.createdAt).fromNow()}
			</Text>
			<Text
				className={clsx(
					'text-[16px] font-bold capitalize mt-[12px]',
					theme === 'light' && 'text-textColor_main_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_main_dark',
				)}>
				{item.senderData.name}
			</Text>
			<Text
				className={clsx(
					'text-[14px] text-[#ffffffd9] capitalize mt-[12px]',
					theme === 'light' && 'text-textColor_main_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_main_dark',
				)}>
				{item.senderData.content}
			</Text>
			<Pressable className='flex-row items-center mt-[12px]'>
				<Text
					className={clsx('text-[14px] text-tColor_text capitalize mr-[6px]')}>
					nhấn để tiếp tục
				</Text>
				<AntDesign name='right' size={10} color='#657ef8' />
			</Pressable>
		</View>
	)
}

export default withBaseComponent(NotificationCard)
