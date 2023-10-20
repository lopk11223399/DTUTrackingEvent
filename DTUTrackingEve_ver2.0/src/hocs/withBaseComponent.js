import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import icons from '../utils/icons'
import { useWindowDimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
const {
	Ionicons,
	MaterialIcons,
	Entypo,
	Feather,
	FontAwesome,
	Octicons,
	AntDesign,
	MaterialCommunityIcons,
	EvilIcons,
	SimpleLineIcons,
	FontAwesome5,
	Foundation,
} = icons

const withBaseComponent = Component => props => {
	const navigation = useNavigation()
	const route = useRoute()
	const layout = useWindowDimensions()
	const dispatch = useDispatch()

	return (
		<Component
			{...props}
			navigation={navigation}
			route={route}
			Ionicons={Ionicons}
			SimpleLineIcons={SimpleLineIcons}
			AntDesign={AntDesign}
			EvilIcons={EvilIcons}
			FontAwesome={FontAwesome}
			MaterialIcons={MaterialIcons}
			Entypo={Entypo}
			Feather={Feather}
			Octicons={Octicons}
			MaterialCommunityIcons={MaterialCommunityIcons}
			FontAwesome5={FontAwesome5}
			Foundation={Foundation}
			layout={layout}
			AsyncStorage={AsyncStorage}
			dispatch={dispatch}
		/>
	)
}

export default withBaseComponent
