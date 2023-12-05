import { View, FlatList, SafeAreaView, Alert } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import CardEvent from '../event/CardEvent'
import {
	apiFeedbackEvent,
	apiGetDetailEvents,
	apiGetEvents,
	apiJoinEvent,
} from '../../apis'
import { useSelector } from 'react-redux'
import EmptyData from './EmptyData'
import withBaseComponent from '../../hocs/withBaseComponent'
import {
	getEventsHot,
	getEventsNew,
	getEventsToday,
} from '../../store/event/asyncActions'
import Modal from 'react-native-modal'
import RoomChoose from './RoomChoose'
import { getCurrent, getJoinEvent } from '../../store/user/asyncActions'
import moment from 'moment'
import Feedback from './Feedback'

const NewComp = ({ dispatch }) => {
	const { current, isLoggedIn } = useSelector(state => state.user)
	const { newEvents } = useSelector(state => state.event)
	const [isModalVisible, setModalVisible] = useState(false)
	const [eventChoose, setEventChoose] = useState(null)
	const [data, setData] = useState(null)
	const [typeEvent, setTypeEvent] = useState('joined')
	const [starFeedback, setStarFeedback] = useState(5)
	const [comementText, setComementText] = useState('')

	useEffect(() => {
		dispatch(
			getEventsNew({
				limit: 10,
				page: 1,
				order: ['createdAt', 'DESC'],
				status: [2, 3],
			}),
		)
	}, [dispatch, isLoggedIn])

	const fetchDetailEvent = async eid => {
		const response = await apiGetDetailEvents(eid)

		if (response.success === true) {
			setData(response.response)
		}
	}

	useEffect(() => {
		if (eventChoose) fetchDetailEvent(eventChoose)
	}, [eventChoose])

	const handleJoinEvent = (event, item) => {
		return Alert.alert(
			'Thông báo',
			`Bạn muốn tham gia sự kiện ${event.title} với chủ đề ${item.topic} phải không?`,
			[
				{
					text: 'Hủy',
					style: 'cancel',
				},
				{
					text: 'Tham gia',
					onPress: async () => {
						const response = await apiJoinEvent(event.id, { roomId: item.id })

						if (response.success) {
							setModalVisible(false)
							dispatch(
								getEventsToday({
									limit: 10,
									page: 1,
									date: moment().format('YYYY-MM-DD'),
									status: [2, 3],
								}),
							)
							dispatch(
								getEventsNew({
									limit: 10,
									page: 1,
									order: ['createdAt', 'DESC'],
									status: [2, 3],
								}),
							)
							dispatch(
								getEventsHot({
									limit: 5,
									page: 1,
									hot: true,
									status: [2, 3],
								}),
							)

							if (current) {
								dispatch(getCurrent())

								dispatch(
									getJoinEvent({
										limit: 5,
										page: 1,
										order: ['createdAt', 'DESC'],
									}),
								)
							}

							return Alert.alert('Thành Công', response.mess, [
								{
									text: 'Hủy',
									style: 'cancel',
								},
								{
									text: 'Đi đến danh sách sự kiện',
									onPress: () => navigate('ListEventFollowCurrent'),
								},
							])
						}
					},
				},
			],
		)
	}

	const handleSubmit = async () => {
		const response = await apiFeedbackEvent(eventChoose, {
			rate: starFeedback,
			feedback: comementText,
		})

		return Alert.alert('Thông báo', response.mess)
	}

	return (
		<SafeAreaView>
			<View className='background--primary--dark px-3 py-1'>
				{newEvents?.length > 0 ? (
					<FlatList
						showsVerticalScrollIndicator={false}
						data={newEvents}
						renderItem={({ item, index }) => (
							<CardEvent
								isModalVisible={isModalVisible}
								setModalVisible={setModalVisible}
								setEventChoose={setEventChoose}
								setTypeEvent={setTypeEvent}
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

			<Modal
				isVisible={isModalVisible}
				onBackdropPress={() => setModalVisible(false)}
				animationIn={'fadeInUp'}
				animationOut={'fadeOutDown'}>
				{typeEvent === 'joined' && (
					<RoomChoose
						item={data}
						setModalVisible={setModalVisible}
						handleJoinEvent={handleJoinEvent}
					/>
				)}
				{typeEvent === 'review' && (
					<Feedback
						setModalVisible={setModalVisible}
						starFeedback={starFeedback}
						setStarFeedback={setStarFeedback}
						comementText={comementText}
						setComementText={setComementText}
						handleSubmit={handleSubmit}
					/>
				)}
			</Modal>
		</SafeAreaView>
	)
}

export default withBaseComponent(memo(NewComp))
