import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { statusEvent } from '../../utils/contants'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'

const StatusEvent = ({ style, idStatus }) => {
	return (
		<View
			className={clsx(
				'rounded-tl-md rounded-br-md',
				statusEvent.find(el => el.id === idStatus)?.bgCss,
				style && style,
			)}>
			<Text className='text-white text-[12px] font-bold px-3 py-1'>
				{statusEvent.find(el => el.id === idStatus)?.textStatus}
			</Text>
		</View>
	)
}

export default withBaseComponent(memo(StatusEvent))
