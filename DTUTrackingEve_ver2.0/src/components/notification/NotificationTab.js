import { View, Text, Pressable, Image } from 'react-native'
import React, { memo } from 'react'
import clsx from 'clsx'

const NotificationTab = ({
	imageIcon,
	setChooseNotification,
	type,
	name,
	chooseNotification,
}) => {
	return (
		<Pressable
			onPress={() => setChooseNotification(type)}
			className='w-[33%] items-center'>
			<Image source={imageIcon} className='w-[66px] h-[66px] object-contain' />
			<Text
				className={clsx(
					'text-[14px] font-[500] capitalize text-center',
					chooseNotification === type
						? 'text-active--tab--bottom--light'
						: 'text-text-gray--dark',
				)}>
				{name}
			</Text>
		</Pressable>
	)
}

export default memo(NotificationTab)
