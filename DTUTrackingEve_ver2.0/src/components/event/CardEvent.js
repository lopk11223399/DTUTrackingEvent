import { View, Text, Image, Pressable, Alert } from 'react-native'
import React, { memo } from 'react'
import clsx from 'clsx'
import withBaseComponent from '../../hocs/withBaseComponent'
import moment from 'moment'
import Button from '../button/Button'
import StatusEvent from './StatusEvent'
import { apiFollowEvent, apiJoinEvent } from '../../apis'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import { getFollowEvent } from '../../store/user/asyncActions'

const CardEvent = ({
	item,
	navigation: { navigate },
	AntDesign,
	FontAwesome,
	userId,
	newEvent,
	borderHiden = true,
	dispatch,
}) => {
	const handleFollowEvent = () => {
		if (userId === 0)
			return Alert.alert('Bạn chưa đăng nhập', 'Đi đến trang đăng nhập', [
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Đi đến Login',
					onPress: () =>
						navigate('Login', {
							eventId: item?.id,
						}),
				},
			])
		else {
			if (item?.followers?.some(el => el.id === userId))
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
								const response = await apiFollowEvent(item.id)

								if (response.success) {
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

									return Alert.alert('Thành Công', response.mess, [
										{
											text: 'Hủy',
											style: 'cancel',
										},
										{
											text: 'Sự kiện theo dõi',
											onPress: () =>
												navigate('ProfileStack', {
													screen: 'ListEventFollowCurrent',
												}),
										},
									])
								}
							},
						},
					],
				)

			return Alert.alert(
				'Thông báo',
				`Bạn muốn theo dõi sự kiện ${item.title} phải không?`,
				[
					{
						text: 'Hủy',
						style: 'cancel',
					},
					{
						text: 'Theo dõi',
						onPress: async () => {
							const response = await apiFollowEvent(item.id)

							if (response.success) {
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

								return Alert.alert('Thành Công', response.mess, [
									{
										text: 'Hủy',
										style: 'cancel',
									},
									{
										text: 'Sự kiện theo dõi',
										onPress: () =>
											navigate('ProfileStack', {
												screen: 'ListEventFollowCurrent',
											}),
									},
								])
							}
						},
					},
				],
			)
		}
	}

	const handleJoinEvent = async () => {
		if (userId === 0)
			return Alert.alert('Bạn chưa đăng nhập', 'Đi đến trang đăng nhập', [
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Đi đến Login',
					onPress: () =>
						navigate('Login', {
							eventId: item?.id,
						}),
				},
			])
		else {
			if (
				item?.userJoined?.length >= item?.limitParticipant &&
				!item?.userJoined?.some(el => el.id === userId)
			) {
				return Alert.alert('Thông báo', 'Sự kiện này đã hết chỗ tham dự')
			} else if (item?.status === 2 || item?.status === 3) {
				// tham gia sk
				if (item?.userJoined?.some(el => el.id === userId))
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

										return Alert.alert('Thành Công', response.mess, [
											{
												text: 'Hủy',
												style: 'cancel',
											},
											{
												text: 'Đi đến danh sách sự kiện',
												onPress: () => navigate('ListEventFollowCurrent'),
											},
										])
									}
								},
							},
						],
					)

				return Alert.alert(
					'Thông báo',
					`Bạn muốn tham gia sự kiện ${item.title} phải không?`,
					[
						{
							text: 'Hủy',
							style: 'cancel',
						},
						{
							text: 'Tham gia',
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

									return Alert.alert('Thành Công', response.mess, [
										{
											text: 'Hủy',
											style: 'cancel',
										},
										{
											text: 'Đi đến danh sách sự kiện',
											onPress: () => navigate('ListEventFollowCurrent'),
										},
									])
								}
							},
						},
					],
				)
			} else if (item?.status === 1) {
				return Alert.alert(
					'Thông báo',
					'Sự kiện này chưa duyệt. Vui lòng theo dõi để nhận thông báo về sự kiện này',
				)
			} else if (item?.status === 5) {
				return Alert.alert(
					'Thông báo',
					'Sự kiện đã bị hủy bỏ. Bạn không thể thao tác với sự kiện này',
				)
			} else if (item?.status === 4) {
				if (item?.userJoined?.some(el => el.id === userId)) {
					// đánh giá sự kiện
				} else {
					return Alert.alert('Thông báo', 'Sự kiện đã kết thúc')
				}
			}
		}
	}

	return (
		<Pressable
			className={clsx('bg-transparent relative my-1')}
			onPress={() =>
				navigate('DetailEvent', {
					eventId: item?.id,
					userId: userId,
				})
			}>
			<View className='relative'>
				<Image
					source={{ uri: item?.image }}
					className='w-full h-[200px] rounded-md object-cover'
				/>
				<StatusEvent style={'absolute top-0'} idStatus={item?.status} />
				<Pressable
					onPress={handleFollowEvent}
					className='absolute right-[12px] top-[12px] border border-yellow p-[6px] rounded-md'>
					{item?.followers?.some(el => el.id === userId) ? (
						<FontAwesome name='star' size={24} color='#fcae59' />
					) : (
						<FontAwesome name='star-o' size={24} color='#fcae59' />
					)}
				</Pressable>
				<Button
					handlePress={handleJoinEvent}
					style={clsx(
						'absolute bg-color--bg-button--dark bottom-[12px] right-[12px] w-[110px] h-[28px]',
						item?.userJoined?.some(el => el.id === userId) &&
							'bg-input--err--light',
						item?.status === 1 && 'opacity-50',
						item?.userJoined?.length >= item?.limitParticipant &&
							!item?.userJoined?.some(el => el.id === userId) &&
							'opacity-50',
						item?.status === 5 &&
							!item?.userJoined?.some(el => el.id === userId) &&
							'opacity-50',
						item?.status === 5 &&
							item?.userJoined?.some(el => el.id === userId) &&
							'bg-input--err--light opacity-50',
						item?.status === 4 &&
							!item?.userJoined?.some(el => el.id === userId) &&
							'opacity-50',
						item?.status === 4 &&
							item?.userJoined?.some(el => el.id === userId) &&
							'bg-color--green--dark',
					)}
					styleText={'text-color--text-button--dark'}
					children={
						item?.status === 4 && item?.userJoined?.some(el => el.id === userId)
							? 'Đánh giá'
							: item?.userJoined?.some(el => el.id === userId)
							? 'Hủy'
							: `tham gia(${item?.userJoined?.length}/${item?.limitParticipant})`
					}
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

			{newEvent && (
				<View className='absolute top-[-2px] right-[44%] bg-yellow justify-center w-[50px] shadow-sm rounded-br-sm rounded-bl-sm'>
					<Text className='text-[12px] text-center text-text-white--dark font-[600]'>
						Mới
					</Text>
				</View>
			)}
		</Pressable>
	)
}

export default withBaseComponent(memo(CardEvent))
