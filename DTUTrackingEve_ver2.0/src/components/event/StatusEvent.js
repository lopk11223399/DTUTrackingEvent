import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { statusEvent } from '../../utils/contants'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const StatusEvent = ({ style, idStatus }) => {
	const { theme } = useSelector(state => state.app)

	return (
		<View
			className={clsx(
				'rounded-tl-md rounded-br-md',
				theme === 'light' &&
					statusEvent.find(el => el.id === idStatus)?.bgCss_light,
				(theme === 'dark' || theme === 'dark-default') &&
					statusEvent.find(el => el.id === idStatus)?.bgCss_dark,
				style && style,
			)}>
			<Text className='text-white text-[12px] font-bold px-3 py-1'>
				{statusEvent.find(el => el.id === idStatus)?.textStatus}
			</Text>
		</View>
	)
}

export default withBaseComponent(memo(StatusEvent))
