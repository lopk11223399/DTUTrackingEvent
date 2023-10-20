import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import imageBox from '../../assets/box.png'
import withBaseComponent from '../../hocs/withBaseComponent'
import clsx from 'clsx'
import Button from '../button/Button'

const RequiresLoginComp = ({ layout, navigation: { navigate }, route }) => {
	const handLogin = () => {
		navigate('Login', { caption: route.name })
	}

	return (
		<View className={clsx(`w-[${layout.width}] items-center justify-center`)}>
			<Image source={imageBox} className='w-[172px] h-[132px] object-cover' />
			<Text className='text-[14px] text-text-gray--dark font-[500]'>
				Đăng nhập để trải nghiệm
			</Text>
			<Text className='text-[14px] text-text-gray--dark font-[500] my-1'>
				Thêm nhiều nội dung thú vị hơn
			</Text>
			<Button
				handlePress={handLogin}
				children='đăng nhập'
				style='bg-text-main--dark h-[40px] w-[160px] rounded-full mt-2'
				styleText='text-text-white--dark text-[16px]'
			/>
		</View>
	)
}

export default withBaseComponent(memo(RequiresLoginComp))
