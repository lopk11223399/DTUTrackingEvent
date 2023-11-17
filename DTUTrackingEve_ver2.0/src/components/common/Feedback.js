import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import withBaseComponent from '../../hocs/withBaseComponent'
import { renderStarFromNumber } from '../../utils/helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Feedback = ({
	Ionicons,
	setModalVisible,
	starFeedback,
	setStarFeedback,
	comementText,
	setComementText,
	handleSubmit,
}) => {
	const { theme } = useSelector(state => state.app)
	return (
		<View
			className={clsx(
				'p-3 rounded-md',
				theme === 'light' && 'bg-backgroundColor_main_light',
			)}>
			<KeyboardAwareScrollView>
				<View className='flex-row items-center justify-end relative mb-3'>
					<Text className='text-[18px] font-bold absolute right-0 left-0 text-center'>
						Đánh giá
					</Text>
					<Pressable onPress={() => setModalVisible(false)}>
						<Ionicons
							name='close'
							size={24}
							color={theme === 'light' ? '#000000d9' : '#ffffffd9'}
						/>
					</Pressable>
				</View>

				<View className='flex-row items-center justify-center gap-6 '>
					{renderStarFromNumber(starFeedback)?.map((el, index) => (
						<Pressable onPress={() => setStarFeedback(index + 1)} key={index}>
							{el}
						</Pressable>
					))}
				</View>

				<View className='mt-4 rounded-md border border-lineTabColor'>
					<TextInput
						value={comementText}
						onChangeText={text => setComementText(text)}
						multiline
						placeholder='nhập nội dung'
						className='w-full p-3 text-[14px] text-lineTabColor'
					/>
				</View>

				<View className='flex-row gap-4 mt-2 justify-center'>
					<Pressable
						onPress={() => setModalVisible(false)}
						className='bg-red-400 w-[100px] rounded-md'>
						<Text className='text-center capitalize py-2 text-white font-medium'>
							hủy
						</Text>
					</Pressable>

					<Pressable
						onPress={handleSubmit}
						className='bg-green-400 w-[100px] rounded-md'>
						<Text className='text-center capitalize py-2 text-white font-medium'>
							Gửi
						</Text>
					</Pressable>
				</View>
			</KeyboardAwareScrollView>
		</View>
	)
}

export default withBaseComponent(Feedback)
