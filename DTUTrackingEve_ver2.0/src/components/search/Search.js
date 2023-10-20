import { View, TextInput } from 'react-native'
import React, { memo } from 'react'
import clsx from 'clsx'
import withBaseComponent from '../../hocs/withBaseComponent'

const Search = ({ placeholder, handleSerach, value, setValue, AntDesign }) => {
	return (
		<View className='flex-row items-center justify-between w-full rounded-full bg-bg--search'>
			<TextInput
				value={value}
				onChangeText={text => setValue(text)}
				placeholder={placeholder}
				placeholderTextColor={'#677789'}
				className={clsx(
					'p-3 w-[85%] text-text-search',
					value ? 'text-[14px]' : 'text-[14px]',
				)}
			/>
			<AntDesign
				name='search1'
				size={16}
				color='#63717f'
				className='mx-3'
				onPress={() => handleSerach(value)}
			/>
		</View>
	)
}

export default withBaseComponent(memo(Search))
