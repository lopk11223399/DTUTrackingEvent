import { AntDesign } from '@expo/vector-icons'

export const handleDate = inputDate => {
	var parts = inputDate.split('/')
	var dateObject = new Date(parts[2], parts[1] - 1, parts[0])
	var year = dateObject.getFullYear()
	var month = String(dateObject.getMonth() + 1).padStart(2, '0')
	var day = String(dateObject.getDate()).padStart(2, '0')
	var newDate = `${year}-${month}-${day}`
	return newDate
}

export const renderStarFromNumber = number => {
	if (!Number(number)) return

	const stars = []
	number = Math.round(number)

	for (let i = 0; i < +number; i++)
		stars.push(<AntDesign name='star' size={24} color='orange' />)
	for (let i = 5; i > +number; i--)
		stars.push(<AntDesign name='staro' size={24} color='orange' />)

	return stars
}
