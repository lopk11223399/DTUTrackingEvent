import { View, ScrollView, SafeAreaView, FlatList } from 'react-native'
import React, { memo, useEffect } from 'react'
import { event } from '../../utils/contants'
import CardEvent from '../event/CardEvent'
import RequiresLoginComp from './RequiresLoginComp'
import { useSelector } from 'react-redux'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getFollowEvent } from '../../store/user/asyncActions'
import { apiGetFollowEvent } from '../../apis'
import EmptyData from './EmptyData'

const FollowComp = ({ dispatch }) => {
	const { current, followEvent } = useSelector(state => state.user)

	// useEffect(() => {
	// 	dispatch(
	// 		getFollowEvent({
	// 			limit: 10,
	// 			page: 1,
	// 		}),
	// 	)
	// }, [dispatch])

	if (current === null) {
		return (
			<SafeAreaView className='bg-background--primary--dark flex-1 justify-center'>
				<RequiresLoginComp />
			</SafeAreaView>
		)
	}

	return (
		<View className='background--primary--dark px-3 py-2'>
			{followEvent?.length > 0 ? (
				<FlatList
					showsVerticalScrollIndicator={false}
					data={followEvent}
					renderItem={({ item, index }) => (
						<CardEvent
							item={item.eventData}
							key={item.id}
							userId={current?.id || 0}
							borderHiden={index === followEvent?.length - 1 ? false : true}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : (
				<EmptyData />
			)}
		</View>
	)
}

export default withBaseComponent(memo(FollowComp))
