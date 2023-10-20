import { pathAdmin, common, pathCreator } from './path'
import icons from './icons'
const {
	BsShieldShaded,
	RiTruckFill,
	AiFillGift,
	BsReplyFill,
	FaTty,
	AiOutlineDashboard,
	MdGroups,
	TbBrandProducthunt,
	RiBillLine,
} = icons

export const adminSidebar = [
	{
		id: 1,
		type: 'SINGLE',
		text: 'Dashboard',
		path: `/${pathAdmin.ADMIN}/${common.DASHBOARD}`,
		icon: <AiOutlineDashboard size={20} />,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Manage users',
		path: `/${pathAdmin.ADMIN}/${pathAdmin.MANAGE_USERS}`,
		icon: <MdGroups size={20} />,
	},
	{
		id: 3,
		type: 'SINGLE',
		text: 'Manage events',
		path: `/${pathAdmin.ADMIN}/${pathAdmin.MANAGE_EVENT}`,
		icon: <MdGroups size={20} />,
	},
]

export const creatorSidebar = [
	{
		id: 1,
		type: 'SINGLE',
		text: 'Dashboard',
		path: `/${pathCreator.CREATOR}/${common.DASHBOARD}`,
		icon: <AiOutlineDashboard size={20} />,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Create Event',
		path: `/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`,
		icon: <MdGroups size={20} />,
	},
]
