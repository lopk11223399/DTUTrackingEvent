import { View, Text, Pressable, Image } from 'react-native'
import React, { memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import StatusEvent from './StatusEvent'
import clsx from 'clsx'
import moment from 'moment'

const CardEventMini = ({
	item,
	navigation: { navigate },
	AntDesign,
	userId,
	borderHiden = true,
}) => {
	return (
		<Pressable
			onPress={() =>
				navigate('DetailEvent', { eventId: item?.id, userId: userId })
			}
			className='py-1'>
			<View
				className={clsx(
					'flex-row pb-1 border-text-desc--dark',
					borderHiden && 'border-b',
				)}>
				<View className='w-[50%] relative'>
					<Image
						source={{ uri: item?.image }}
						className='w-[100%] h-[100px] object-cover rounded-md'
					/>
					<StatusEvent style={'absolute top-0'} idStatus={item?.status} />
				</View>
				<View className='w-[50%] justify-between'>
					<Text
						numberOfLines={2}
						className='text-text-white--dark font-[700] text-[14px] ml-1 mt-1'>
						{item?.title}
					</Text>
					<Text
						numberOfLines={2}
						className='text-text-gray--dark font-[400] text-[12px] ml-1'>
						{item?.description}
					</Text>

					<View
						className={clsx(
							'rounded-md flex-row items-center justify-between ml-1',
							item?.status === 1 && 'bg-background--gray--dark',
							item?.status === 2 && 'bg-background--red--dark',
							item?.status === 3 && 'bg-background--green--dark',
							item?.status === 4 && 'bg-background--gray--dark',
							item?.status === 5 && 'bg-background--gray--dark',
						)}>
						<View className='ml-[4px] mr-[4px]'>
							<AntDesign
								name='clockcircleo'
								size={12}
								color={clsx(
									item?.status === 1 && '#586860',
									item?.status === 2 && '#89323e',
									item?.status === 3 && '#41d4a0',
									item?.status === 4 && '#586860',
									item?.status === 5 && '#586860',
								)}
							/>
						</View>
						<Text className='text-text-white--dark font-bold py-1 flex-1'>{`${moment(
							item?.startDate,
						).format('DD.MM.YYYY')} - ${moment(item?.finishDate).format(
							'DD.MM.YYYY',
						)}`}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

export default withBaseComponent(memo(CardEventMini))
