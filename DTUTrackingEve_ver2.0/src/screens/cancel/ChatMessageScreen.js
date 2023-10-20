import {
	View,
	Text,
	Image,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	Pressable,
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import icons from '../../utils/icons'

const { Ionicons, FontAwesome } = icons

const ChatMessageScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: '',
			headerLeft: () => (
				<View className='flex-row items-center gap-[10px]'>
					<Ionicons
						onPress={() => navigation.goBack()}
						name='arrow-back'
						size={24}
						color='black'
					/>
					<View className='flex-row items-center'>
						<Image
							className='w-[30px] h-[30px] rounded-full object-cover'
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
						/>

						<View className='ml-2 justify-center'>
							<Text className='text-[18px] font-bold'>abc</Text>
							<Text className='text-green-400 text-[10px]'>Online</Text>
						</View>
					</View>
				</View>
			),
		})
	}, [])

	return (
		<SafeAreaView className='bg-white flex-1'>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className='flex-1 p-2'>
				<ScrollView className='gap-4' showsVerticalScrollIndicator={false}>
					<View className='flex-row justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-red-200 p-2 rounded-md ml-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
					<View className='flex-row-reverse justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-green-200 p-2 rounded-md mr-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
					<View className='flex-row justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-red-200 p-2 rounded-md ml-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
					<View className='flex-row-reverse justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-green-200 p-2 rounded-md mr-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
					<View className='flex-row-reverse justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-green-200 p-2 rounded-md mr-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
					<View className='flex-row justify-start w-full'>
						<Image
							source={{
								uri: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-bia-Zalo-tam-trang-chiec-cay-co-don.jpg',
							}}
							className='w-[44px] h-[44px] object-cover rounded-full'
						/>

						<View className='w-[60%] bg-red-200 p-2 rounded-md ml-2'>
							<Text className='text-[14px]'>
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
								abc abc abc abc abc abc abc abcabc abc abc abc abc abc abc abc
							</Text>
							<Text className='text-[12px] text-gray-400 mt-2'>10:52</Text>
						</View>
					</View>
				</ScrollView>

				<View className='flex-row items-center justify-between p-1 bg-gray-100 rounded-full'>
					<TextInput
						placeholder='Nhập nội dung tin nhắn'
						className='flex-1 p-2 text-[14px]'
					/>
					<Pressable className='px-2'>
						<FontAwesome name='send-o' size={24} color='black' />
					</Pressable>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default withBaseComponent(ChatMessageScreen)
