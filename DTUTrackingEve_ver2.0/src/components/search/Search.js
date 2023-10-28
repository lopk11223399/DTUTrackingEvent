import { View, TextInput } from 'react-native'
import React, { memo } from 'react'
import clsx from 'clsx'
import withBaseComponent from '../../hocs/withBaseComponent'
import { useSelector } from 'react-redux'

const Search = ({ placeholder, handleSerach, value, setValue, AntDesign }) => {
	const { theme } = useSelector(state => state.app)
	return (
		<View
			className={clsx(
				'flex-row items-center justify-between w-full rounded-full bg-bg--search',
				theme === 'light' && 'bg-inpBgColor_light',
				(theme === 'dark' || theme === 'dark-default') && 'bg-inpBgColor_dark',
			)}>
			<TextInput
				value={value}
				onChangeText={text => setValue(text)}
				placeholder={placeholder}
				placeholderTextColor={theme === 'light' ? '#c1c2c7' : '#575c66'}
				className={clsx(
					'p-3 w-[85%] text-text-search',
					value ? 'text-[14px]' : 'text-[14px]',
				)}
			/>
			<AntDesign
				name='search1'
				size={16}
				color={theme === 'light' ? '#63717f' : '#575c66'}
				className='mx-3'
				onPress={() => handleSerach(value)}
			/>
		</View>
	)
}

export default withBaseComponent(memo(Search))
