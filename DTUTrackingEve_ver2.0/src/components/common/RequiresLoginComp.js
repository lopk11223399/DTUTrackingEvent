import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import imageBox from '../../assets/box.png'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import Button from '../button/Button'
import { useSelector } from 'react-redux'

const RequiresLoginComp = ({ layout, navigation: { navigate }, route }) => {
	const { theme } = useSelector(state => state.app)

	const handLogin = () => {
		navigate('Login', { caption: route.name })
	}

	return (
		<View className={clsx(`w-[${layout.width}] items-center justify-center`)}>
			<Image source={imageBox} className='w-[172px] h-[132px] object-cover' />
			<Text
				className={clsx(
					'text-[14px] text-text-gray--dark font-[500]',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				Đăng nhập để trải nghiệm
			</Text>
			<Text
				className={clsx(
					'text-[14px] text-text-gray--dark font-[500] my-1',
					theme === 'light' && 'text-textColor_secondary_light',
					(theme === 'dark' || theme === 'dark-default') &&
						'text-textColor_secondary_dark',
				)}>
				Thêm nhiều nội dung thú vị hơn
			</Text>
			<Button
				handlePress={handLogin}
				children='đăng nhập'
				style={clsx(
					'h-[40px] w-[160px] rounded-full mt-2',
					theme === 'light' && 'bg-tColor_bg_light',
					(theme === 'dark' || theme === 'dark-default') && 'bg-tColor_bg_dark',
				)}
				styleText='text-tColor_text text-[16px]'
			/>
		</View>
	)
}

export default withBaseComponent(memo(RequiresLoginComp))
