import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState, useLayoutEffect, memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import {
	SceneMap,
	TabView,
	TabBar,
	TabBarIndicator,
} from 'react-native-tab-view'
import { HomeComp, NewComp, FollowComp } from '../../components'
import clsx from 'clsx'

const HomeScreen = ({ layout }) => {
	const [index, setIndex] = useState(0)
	const [routes] = useState([
		// { key: 'follow', title: 'Theo dõi' },
		{ key: 'home', title: 'Trang chủ' },
		{ key: 'new', title: 'Sự kiện mới' },
	])

	const renderScene = SceneMap({
		// follow: FollowComp,
		home: HomeComp,
		new: NewComp,
	})

	return (
		<SafeAreaView className={clsx('flex-1 bg-background--primary--dark')}>
			<StatusBar barStyle={'light-content'} />

			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={props => (
					<TabBar
						className={clsx(
							'relative border-b bg-background--primary--dark border-text-gray--dark',
						)}
						{...props}
						renderIndicator={indicatorProps => {
							return (
								<TabBarIndicator
									{...indicatorProps}
									className={clsx(
										'w-8 absolute bottom-[6px] bg-icon--color--dark',
										// 'left-[47px]',
										Platform.OS === 'ios' ? 'left-[77px]' : 'left-[82px]',
									)}
								/>
							)
						}}
						renderLabel={({ route, focused }) => {
							{
								if (focused) {
									return (
										<Text
											className={clsx(
												'text-[16px] font-[700] capitalize text-text-white--dark',
											)}>
											{route.title}
										</Text>
									)
								}
								return (
									<Text
										className={clsx(
											'text-[16px] font-[700] capitalize text-text-gray--dark',
										)}>
										{route.title}
									</Text>
								)
							}
						}}
					/>
				)}
			/>
		</SafeAreaView>
	)
}

export default withBaseComponent(memo(HomeScreen))
