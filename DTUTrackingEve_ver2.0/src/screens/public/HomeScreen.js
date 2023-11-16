import { Text, SafeAreaView, StatusBar, Platform, Modal } from 'react-native'
import React, { useState, memo } from 'react'
import withBaseComponent from '../../hocs/withBaseComponent'
import {
	SceneMap,
	TabView,
	TabBar,
	TabBarIndicator,
} from 'react-native-tab-view'
import { HomeComp, NewComp, FollowComp } from '../../components'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

const HomeScreen = ({ layout }) => {
	const { theme } = useSelector(state => state.app)
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
		<SafeAreaView
			className={clsx(
				'flex-1',
				theme === 'light' && 'bg-backgroundColor_main_light',
				(theme === 'dark' || theme === 'dark-default') &&
					'bg-backgroundColor_main_dark',
			)}>
			<StatusBar
				barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
			/>

			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={props => (
					<TabBar
						className={clsx(
							'border-b',
							theme === 'light' &&
								'bg-backgroundColor_main_light border-inpBorder_light',
							(theme === 'dark' || theme === 'dark-default') &&
								'bg-backgroundColor_main_dark border-inpBorder_dark',
						)}
						{...props}
						renderIndicator={indicatorProps => {
							return (
								<TabBarIndicator
									{...indicatorProps}
									className={clsx(
										'w-8 absolute bottom-[6px] bg-tColor_bg_active',
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
												'text-[16px] font-[700] capitalize text-tColor_text',
											)}>
											{route.title}
										</Text>
									)
								}
								return (
									<Text
										className={clsx(
											'text-[16px] font-[700] capitalize',
											theme === 'light' && 'text-textColor_secondary_light',
											(theme === 'dark' || theme === 'dark-default') &&
												'text-textColor_secondary_dark',
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
