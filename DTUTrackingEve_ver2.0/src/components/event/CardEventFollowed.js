import { View, Text, Image, Alert } from 'react-native'
import React, { memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import { Pressable } from 'react-native'
import clsx from 'clsx'
import StatusEvent from './StatusEvent'
import moment from 'moment'
import { apiFollowEvent } from '../../apis'
import { getFollowEvent } from '../../store/user/asyncActions'
import { getEventsNew, getEventsToday } from '../../store/event/asyncActions'
import { useSelector } from 'react-redux'

const CardEventFollowed = ({
	item,
	userId,
	navigation: { navigate },
	FontAwesome,
	AntDesign,
	borderHiden = true,
	dispatch,
}) => {
	const { theme } = useSelector(state => state.app)

	const handleFollowEvent = async () => {
		return Alert.alert(
			'Thông báo',
			`Bạn muốn hủy theo dõi sự kiện ${item.title} phải không?`,
			[
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Bỏ theo dõi',
					onPress: async () => {
						const reponse = await apiFollowEvent(item.id)

						if (reponse.success) {
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

							if (userId !== 0)
								dispatch(
									getFollowEvent({
										limit: 10,
										page: 1,
										order: ['createdAt', 'DESC'],
									}),
								)

							return Alert.alert('Thành Công', reponse.mess)
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
				<Pressable
					onPress={handleFollowEvent}
					className='absolute right-[12px] top-[12px] border border-yellow p-[6px] rounded-md'>
					<FontAwesome name='star' size={24} color='#fcae59' />
				</Pressable>
			</View>

			<Text
				numberOfLines={2}
				className={clsx(
					'text-[16px] text-text-white--dark font-bold mt-2 leading-6',
					theme === 'light' && 'text-textColor_main_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_main_dark',
				)}>
				{item?.title}
			</Text>
			<Text
				numberOfLines={2}
				className={clsx(
					'text-[14px] text-text-gray--dark font-bold mt-1 leading-5',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				{item?.description}
			</Text>
			<View
				className={clsx(
					'mt-2 rounded-md flex-row items-center justify-between',
					item?.status === 3 && 'bg-statusColor_bg_green',
					theme === 'light' &&
						(item?.status === 1 || item?.status === 4 || item?.status === 5) &&
						'bg-statusColor_bg_gray_light',
					theme === 'light' &&
						item?.status === 2 &&
						'bg-statusColor_bg_red_light',
					theme === 'dark' &&
						(item?.status === 1 || item?.status === 4 || item?.status === 5) &&
						'bg-statusColor_bg_gray_dark',
					theme === 'dark' &&
						item?.status === 2 &&
						'bg-statusColor_bg_red_dark',
				)}>
				<View className='ml-[12px] mr-[6px]'>
					{theme === 'light' ? (
						<AntDesign
							name='clockcircleo'
							size={12}
							color={
								(item?.status === 1 && '#8592a3') ||
								(item?.status === 2 && '#ff8296') ||
								(item?.status === 3 && '#41d4a0') ||
								(item?.status === 4 && '#8592a3') ||
								(item?.status === 5 && '#8592a3')
							}
						/>
					) : (
						<AntDesign
							name='clockcircleo'
							size={12}
							color={
								(item?.status === 1 && '#76777f') ||
								(item?.status === 2 && '#b43e4b') ||
								(item?.status === 3 && '#41d4a0') ||
								(item?.status === 4 && '#76777f') ||
								(item?.status === 5 && '#76777f')
							}
						/>
					)}
				</View>
				<Text
					className={clsx(
						'text-text-white--dark font-bold py-3 flex-1',
						theme === 'light' && 'text-textColor_main_light',
						(theme === 'dark' || theme === 'dark-default') &&
							'text-textColor_main_dark',
					)}>
					{`${moment(item?.startDate).format('DD.MM.YYYY')} - ${moment(
						item?.finishDate,
					).format('DD.MM.YYYY')}`}
				</Text>
			</View>

			{borderHiden && <View className='border-b border-text-desc--dark my-2' />}
		</Pressable>
	)
}

export default withBaseComponent(memo(CardEventFollowed))
