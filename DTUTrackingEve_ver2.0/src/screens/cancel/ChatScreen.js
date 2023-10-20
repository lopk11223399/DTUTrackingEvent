import { View, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Pagination, Search, UserCart } from '../../components'

const ChatScreen = () => {
	const [serachUser, setSerachUser] = useState('')
	return (
		<SafeAreaView className='bg-white justify-between h-full'>
			<View className='p-4'>
				<Search
					placeholder={'Nhập tên cần tìm'}
					value={serachUser}
					setValue={setSerachUser}
				/>
			</View>

			<ScrollView className='px-4'>
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
				<UserCart />
			</ScrollView>

			<Pagination totalCount={100} min={2} max={50} text={'người online'} />
		</SafeAreaView>
	)
}

export default ChatScreen
