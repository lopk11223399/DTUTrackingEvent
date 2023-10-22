import { View, Text, Image, Alert } from 'react-native'
import React, { memo } from 'react'
import { Pressable } from 'react-native'
import withBaseComponent from '../../hocs/withBaseComponent'
import StatusEvent from './StatusEvent'
import clsx from 'clsx'
import moment from 'moment'
import Button from '../button/Button'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import { apiJoinEvent } from '../../apis'
import { getJoinEvent } from '../../store/user/asyncActions'

const CardEventJoined = ({
	navigation: { navigate },
	item,
	userId,
	handleFeedbackEventModal,
	AntDesign,
	borderHiden = true,
	dispatch,
}) => {
	const handleCancelJoinEvent = async () => {
		return Alert.alert(
			'Thông báo',
			`Bạn muốn hủy tham gia sự kiện ${item.title} phải không?`,
			[
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Hủy tham gia',
					onPress: async () => {
						const response = await apiJoinEvent(item.id)

						if (response.success === true) {
							dispatch(
								getEventsToday({
									limit: 10,
									page: 1,
									date: moment().format('YYYY-MM-DD'),
								}),
							)
							dispatch(
								getEventsNew({
									limit: 10,
									page: 1,
									order: ['createdAt', 'DESC'],
								}),
							)

							dispatch(
								getEventsHot({
									limit: 5,
									page: 1,
									hot: true,
								}),
							)

							if (userId !== 0)
								dispatch(
									getJoinEvent({
										limit: 5,
										page: 1,
										order: ['createdAt', 'DESC'],
									}),
								)

							return Alert.alert('Thành Công', response.mess)
						}
					},
				},
			],
		)
	}
	return (
		<Pressable
			onPress={() =>
				navigate('DetailEvent', {
					eventId: item?.id,
					userId: userId,
				})
			}
			className={clsx('bg-transparent relative mb-3')}>
			<View className='relative'>
				<Image
					source={{ uri: item?.image }}
					className='w-full h-[200px] rounded-md object-cover'
				/>
				<StatusEvent style={'absolute top-0'} idStatus={item?.status} />
				<Button
					handlePress={handleCancelJoinEvent}
					style={clsx(
						'absolute bg-color--green--dark bottom-[12px] right-[12px] w-[110px] h-[28px]',
						item?.status !== 4 && 'bg-input--err--light',
					)}
					styleText={'text-color--text-button--dark'}
					children={item?.status === 4 ? 'Đánh giá' : 'Hủy'}
				/>
			</View>

			<Text
				numberOfLines={2}
				className='text-[16px] text-text-white--dark font-bold mt-2 leading-6'>
				{item?.title}
			</Text>
			<Text
				numberOfLines={2}
				className='text-[14px] text-text-gray--dark font-bold mt-1 leading-5'>
				{item?.description}
			</Text>
			<View
				className={clsx(
					'mt-2 rounded-md flex-row items-center justify-between',

					item?.status === 1 && 'bg-background--gray--dark',
					item?.status === 2 && 'bg-background--red--dark',
					item?.status === 3 && 'bg-background--green--dark',
					item?.status === 4 && 'bg-background--gray--dark',
					item?.status === 5 && 'bg-background--gray--dark',
				)}>
				<View className='ml-[12px] mr-[6px]'>
					<AntDesign
						name='clockcircleo'
						size={12}
						color={
							(item?.status === 1 && '#586860') ||
							(item?.status === 2 && '#89323e') ||
							(item?.status === 3 && '#41d4a0') ||
							(item?.status === 4 && '#586860') ||
							(item?.status === 5 && '#586860')
						}
					/>
				</View>
				<Text className='text-text-white--dark font-bold py-3 flex-1'>
					{`${moment(item?.startDate).format('DD.MM.YYYY')} - ${moment(
						item?.finishDate,
					).format('DD.MM.YYYY')}`}
				</Text>
			</View>

			{borderHiden && <View className='border-b border-text-desc--dark my-2' />}
		</Pressable>
	)
}

export default withBaseComponent(memo(CardEventJoined))
