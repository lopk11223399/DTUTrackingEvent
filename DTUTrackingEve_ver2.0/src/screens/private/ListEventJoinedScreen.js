import React, { useLayoutEffect, useState } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import {
	SafeAreaView,
	View,
	ScrollView,
	Text,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native'
import Pagination from '../../components/pagination/Pagination'
import { CardEventJoined } from '../../components'
import Modal from 'react-native-modal'
import { renderStarFromNumber } from '../../utils/helper'

const ListEventJoinedScreen = ({
	navigation: { setOptions, goBack },
	Ionicons,
	route,
}) => {
	const { eventJoined } = route.params
	const [isModalVisible, setModalVisible] = useState(false)
	const [idEventChoose, setIdEventChoose] = useState(null)
	const [starFeedback, setStarFeedback] = useState(5)

	useLayoutEffect(() => {
		setOptions({
			headerTitle: 'Danh Sách Sự Kiện Đã Tham Gia',
			headerLeft: () => (
				<Ionicons
					onPress={() => goBack()}
					name='arrow-back'
					size={24}
					color='black'
				/>
			),
		})
	}, [])

	const handleFeedbackEventModal = idEvent => {
		setIdEventChoose(idEvent)
		setModalVisible(true)
	}

	const toggleModal = () => {
		setModalVisible(false)
	}

	const submitFeedback = () => {
		setModalVisible(false)
	}

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<ScrollView className='flex-1'>
				{eventJoined?.map(el => (
					<CardEventJoined
						key={el.idEvent}
						item={el}
						handleFeedbackEventModal={handleFeedbackEventModal}
					/>
				))}
			</ScrollView>
			<Pagination
				min={eventJoined?.length}
				max={eventJoined?.length}
				totalCount={eventJoined?.length}
			/>
			<Modal
				isVisible={isModalVisible}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'position' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View className='items-center bg-white h-[300px] rounded-md justify-between'>
							<View className='w-full bg-blue-400 rounded-t-md'>
								<Text className='text-center py-3 capitalize text-[20px] text-white font-semibold'>
									{
										eventJoined?.find(el => el.idEvent === idEventChoose)
											?.nameEvent
									}
								</Text>
							</View>

							<View className='flex-1 w-full mt-3'>
								<View className='flex-row items-center justify-center gap-6 '>
									{renderStarFromNumber(starFeedback)?.map((el, index) => (
										<Pressable
											onPress={() => setStarFeedback(index + 1)}
											key={index}>
											{el}
										</Pressable>
									))}
								</View>
								<View className='m-2 flex-1 bg-gray-200 rounded-md'>
									<TextInput
										multiline
										placeholder='nhập nội dung'
										className='w-full p-2 '
									/>
								</View>
							</View>

							<View className='flex-row gap-4 mb-3'>
								<Pressable
									onPress={toggleModal}
									className='bg-red-400 w-[100px] rounded-md'>
									<Text className='text-center capitalize py-2 text-white font-medium'>
										hủy
									</Text>
								</Pressable>

								<Pressable
									onPress={submitFeedback}
									className='bg-green-400 w-[100px] rounded-md'>
									<Text className='text-center capitalize py-2 text-white font-medium'>
										Gửi
									</Text>
								</Pressable>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(ListEventJoinedScreen)
