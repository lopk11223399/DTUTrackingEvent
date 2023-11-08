import { pathAdmin, common, pathCreator } from './path'
import icons from './icons'
const {
	AiOutlineDashboard,
	MdGroups,
	IoMdCreate,
	AiOutlineUnorderedList,
	IoIosStats,
	MdPendingActions,
	BsCheckAll,
	TbRun,
	BiBadgeCheck,
	MdCancelScheduleSend,
} = icons

export const adminSidebar = [
	{
		id: 1,
		type: 'SINGLE',
		text: 'Calendar',
		path: `/${pathAdmin.ADMIN}/${pathAdmin.CALENDAR}`,
		icon: <AiOutlineDashboard size={20} />,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Dashboard',
		path: `/${pathAdmin.ADMIN}/${common.DASHBOARD}`,
		icon: <AiOutlineDashboard size={20} />,
	},

	{
		id: 3,
		type: 'SINGLE',
		text: 'Manage users',
		path: `/${pathAdmin.ADMIN}/${pathAdmin.MANAGE_USERS}`,
		icon: <MdGroups size={20} />,
	},
	{
		id: 4,
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
		text: 'Thống kê',
		path: `/${pathCreator.CREATOR}/${common.DASHBOARD}`,
		icon: <IoIosStats size={20} />,
	},
	{
		id: 2,
		type: 'SINGLE',
		text: 'Tạo sự kiện',
		path: `/${pathCreator.CREATOR}/${pathCreator.CREATE_EVENT}`,
		icon: <IoMdCreate size={20} />,
	},
	{
		id: 3,
		type: 'SINGLE',
		text: 'Danh sách sự kiện của tôi',
		path: `/${pathCreator.CREATOR}/${pathCreator.LIST_EVENT}`,
		icon: <AiOutlineUnorderedList size={20} />,
	},
]
export const status = [
	{
		id: 1,
		text: 'Chờ duyệt',
		icon: <MdPendingActions size='21' />,
	},
	{
		id: 2,
		text: 'Đã duyệt',
		icon: <BsCheckAll size='21' />,
	},
	{
		id: 3,
		text: 'Đang diễn ra',
		icon: <TbRun size='21' />,
	},
	{
		id: 4,
		text: 'Đã kết thúc',
		icon: <BiBadgeCheck size='21' />,
	},
	{
		id: 5,
		text: 'Đã hủy',
		icon: <MdCancelScheduleSend size='21' />,
	},
]
