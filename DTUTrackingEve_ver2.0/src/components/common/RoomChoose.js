import { View, Text, Pressable } from 'react-native'
import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import withBaseComponent from '../../hocs/withBaseComponent'

const RoomChoose = ({ item, handleJoinEvent, Ionicons, setModalVisible }) => {
	const { theme } = useSelector(state => state.app)
	return (
		<View
			className={clsx(
				'p-3 rounded-md',
				theme === 'light' && 'bg-backgroundColor_main_light',
			)}>
			<Pressable onPress={() => setModalVisible(false)} className='self-end'>
				<Ionicons
					name='close'
					size={24}
					color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
				/>
			</Pressable>
			<View className='gap-2 mt-1'>
				<Text numberOfLines={2} className='text-[14px] font-bold'>
					{item?.title}
				</Text>
				<Text className='text-lineTabColor font-bold mb-2'>
					Chọn 1 room để tham gia
				</Text>
				<View className='mt-2'>
					{item?.typeEvent
						? item.onlineEvent?.map((el, index) => (
								<Pressable
									onPress={() => handleJoinEvent(item, el)}
									key={el.id}
									className={clsx(
										'mb-3 gap-1 bg-backgroundColor_secondary_light p-2 rounded-md flex-row items-center justify-between',
										item.onlineEvent.length - 1 === index && 'mb-0',
										theme === 'light' && 'bg-backgroundColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'bg-backgroundColor_secondary_dark',
									)}>
									<View className=''>
										<View className='flex-row items-center mb-1'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Topci:{' '}
											</Text>
											<Text className='textColor_main_light'>{el.topic}</Text>
										</View>
										<View className='flex-row items-center mb-1'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Thời gian bắt đầu:{' '}
											</Text>
											<Text className='textColor_main_light'>
												{el.timeRoom}
											</Text>
										</View>
										<View className='flex-row items-center'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Link tham gia room:{' '}
											</Text>
											<Text className='textColor_main_light'>
												{el.linkRoomUrl}
											</Text>
										</View>
									</View>
									<View className='px-3 py-1 bg-lineTabColor mr-3 rounded-md'>
										<Text className='text-[15px] font-bold text-white'>
											Chọn
										</Text>
									</View>
								</Pressable>
						  ))
						: item?.offlineEvent?.map((el, index) => (
								<Pressable
									onPress={() => handleJoinEvent(item, el)}
									key={el.id}
									className={clsx(
										'mb-3 gap-1 bg-backgroundColor_secondary_light p-2 rounded-md',
										item.onlineEvent.length - 1 === index && 'mb-0',
										theme === 'light' && 'bg-backgroundColor_secondary_light',
										(theme === 'dark' || theme === 'dark-default') &&
											'bg-backgroundColor_secondary_dark',
									)}>
									<View>
										<View className='flex-row items-center'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Topci:{' '}
											</Text>
											<Text className='textColor_main_light'>{el.topic}</Text>
										</View>
										<View className='flex-row items-center'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Thời gian bắt đầu:{' '}
											</Text>
											<Text className='textColor_main_light'>
												{el.timeRoom}
											</Text>
										</View>
										<View className='flex-row items-center'>
											<Text className='text-[14px] font-bold text-lineTabColor'>
												Địa điểm phòng:{' '}
											</Text>
											<Text className='textColor_main_light'>
												{el.numberRoom}
											</Text>
										</View>
									</View>
									<View className='px-3 py-1 bg-lineTabColor mr-3 rounded-md'>
										<Text className='text-[15px] font-bold text-white'>
											Chọn
										</Text>
									</View>
								</Pressable>
						  ))}
				</View>
			</View>
		</View>
	)
}

export default withBaseComponent(RoomChoose)
