import { View, FlatList, SafeAreaView } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import CardEvent from '../event/CardEvent'
import { apiGetEvents } from '../../apis'
import { useSelector } from 'react-redux'
import EmptyData from './EmptyData'
import withBaseComponent from '../../hocs/withBaseComponent'
import { getEventsNew } from '../../store/event/asyncActions'

const NewComp = ({ dispatch }) => {
	const { current, isLoggedIn } = useSelector(state => state.user)
	const { newEvents } = useSelector(state => state.event)

	useEffect(() => {
		dispatch(
			getEventsNew({
				limit: 10,
				page: 1,
				order: ['createdAt', 'DESC'],
			}),
		)
	}, [dispatch, isLoggedIn])

	return (
		<SafeAreaView>
			<View className='background--primary--dark px-3 py-1'>
				{newEvents?.length > 0 ? (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={newEvents}
						renderItem={({ item, index }) => (
							<CardEvent
								newEvent
								item={item}
								key={index}
								userId={current?.id || 0}
								borderHiden={index === newEvents?.length - 1 ? false : true}
							/>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				) : (
					<EmptyData />
				)}
			</View>
		</SafeAreaView>
	)
}

export default withBaseComponent(memo(NewComp))
