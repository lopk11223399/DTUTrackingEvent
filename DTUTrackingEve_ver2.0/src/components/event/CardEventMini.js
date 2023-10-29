import { View, Text, Pressable, Image } from 'react-native'
import React, { memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import StatusEvent from './StatusEvent'
import clsx from 'clsx'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CardEventMini = ({
	item,
	navigation: { navigate },
	AntDesign,
	userId,
	borderHiden = true,
}) => {
	const { theme } = useSelector(state => state.app)

	return (
		<Pressable
			onPress={() =>
				navigate('DetailEvent', { eventId: item?.id, userId: userId })
			}
			className='py-1'>
			<View
				className={clsx(
					'flex-row pb-1',
					borderHiden && 'border-b',
					theme === 'light' && 'border-inpBorder_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'border-inpBorder_dark',
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
						className={clsx(
							'text-text-white--dark font-[700] text-[14px] ml-1 mt-1',
							theme === 'light' && 'text-textColor_main_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'text-textColor_main_dark',
						)}>
						{item?.title}
					</Text>
					<Text
						numberOfLines={2}
						className={clsx(
							'text-text-gray--dark font-[400] text-[12px] ml-1',
							theme === 'light' && 'text-textColor_secondary_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'text-textColor_secondary_dark',
						)}>
						{item?.description}
					</Text>

					<View
						className={clsx(
							'rounded-md flex-row items-center justify-between ml-1',
							item?.status === 3 && 'bg-statusColor_bg_green',
							theme === 'light' &&
								(item?.status === 1 ||
									item?.status === 4 ||
									item?.status === 5) &&
								'bg-statusColor_bg_gray_light',
							theme === 'light' &&
								item?.status === 2 &&
								'bg-statusColor_bg_red_light',
							theme === 'dark' &&
								(item?.status === 1 ||
									item?.status === 4 ||
									item?.status === 5) &&
								'bg-statusColor_bg_gray_dark',
							theme === 'dark' &&
								item?.status === 2 &&
								'bg-statusColor_bg_red_dark',
						)}>
						<View className='ml-[4px] mr-[4px]'>
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
								'font-bold py-1 flex-1',
								theme === 'light' && 'text-textColor_main_light',
								(theme === 'dark' || theme === 'dark-default') &&
									'text-textColor_main_dark',
							)}>{`${moment(item?.startDate).format('DD.MM.YYYY')} - ${moment(
							item?.finishDate,
						).format('DD.MM.YYYY')}`}</Text>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

export default withBaseComponent(memo(CardEventMini))
