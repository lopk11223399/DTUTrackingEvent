import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { Pressable } from 'react-native'
import withBaseComponent from '../../hocs/withBaseComponent'
import { user } from '../../utils/contants'
import StatusEvent from './StatusEvent'
import clsx from 'clsx'

const CardEventJoined = ({
	navigation: { navigate },
	item,
	handleFeedbackEventModal,
}) => {
	return (
		<View className='p-2'>
			<Pressable
				onPress={() =>
					navigate('DetailEvent', {
						eventId: item.idEvent,
						userId: user.id,
					})
				}
				className='flex-row items-center flex-1 p-2 rounded-md border'>
				<Image
					source={{ uri: item.image }}
					className='h-[60px] w-[60px] object-cover rounded-full'
				/>

				<View className='ml-2 flex-1'>
					<Text numberOfLines={1} className='text-[16px] font-semibold'>
						{item.nameEvent}
					</Text>
					<StatusEvent
						idStatus={item.statusEvent.idStatus}
						textStatus={item.statusEvent.textStatus}
						textStyle={'p-1 text-[12px]'}
						style={'mt-2'}
					/>
				</View>

				<View className='flex-row ml-1'>
					{item.statusEvent.idStatus === 4 ? (
						<Pressable
							onPress={() => handleFeedbackEventModal(item.idEvent)}
							className='bg-green-400 w-[80px] py-2 rounded-md'>
							<Text className='text-center text-white capitalize font-semibold text-[14px]'>
								đánh giá
							</Text>
						</Pressable>
					) : (
						<Pressable
							className={clsx(
								'bg-red-400 w-[80px] py-2 rounded-md',
								item.statusEvent.idStatus === 5 && 'opacity-40',
							)}>
							<Text className='text-center text-white capitalize font-semibold text-[14px]'>
								hủy
							</Text>
						</Pressable>
					)}
				</View>
			</Pressable>
		</View>
	)
}

export default withBaseComponent(memo(CardEventJoined))
