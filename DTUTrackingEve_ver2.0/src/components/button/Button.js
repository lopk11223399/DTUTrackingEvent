import { Text, Pressable } from 'react-native'
import React, { memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'

const Button = ({ style, styleText, children, handlePress }) => {
	return (
		<Pressable
			onPress={handlePress}
			className={clsx(
				'w-[100px] h-[24px] justify-center rounded',
				style && style,
			)}>
			<Text
				className={clsx(
					'text-center text-[14px] font-[700] capitalize',
					styleText && styleText,
				)}>
				{children}
			</Text>
		</Pressable>
	)
}

export default withBaseComponent(memo(Button))
