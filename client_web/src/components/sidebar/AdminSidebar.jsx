import { memo, Fragment, useState } from 'react'
import { adminSidebar } from '../../utils/contants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import icons from '../../utils/icons'
import { common, pathAdmin } from '../../utils/path'
import withBaseComponent from '../../hocs/withBaseComponent'
import { logout } from '../../store/user/userSlice'
import { useSelector } from 'react-redux'
import avatarDefault from '../../assets/img/avatarDefault.jpg'

const { AiOutlineCaretDown, AiOutlineCaretRight, TbDoorExit } = icons

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-white text-[#408A7E]'
const notActivedStyle =
	'px-4 py-2 flex items-center gap-2 hover:bg-white hover:text-[#408A7E]'

const AdminSidebar = ({ dispatch, navigate }) => {
	const { current } = useSelector(state => state.user)
	const [actived, setActived] = useState([])

	const handleShowTabs = tabID => {
		if (actived.some(el => el === tabID))
			setActived(prev => prev.filter(el => el !== tabID))
		else setActived(prev => [...prev, tabID])
	}

	return (
		<div className='bg-[#408A7E] text-white h-full py-4 rounded-tr-md rounded-br-md'>
			<div
				onClick={() =>
					navigate(`/${pathAdmin.ADMIN}/${common.PROFILE}/${current.id}`, {
						state: {
							type: 'profile',
						},
					})
				}
				className='px-4 py-2 flex items-center gap-[12px] border-b mb-2 cursor-pointer'>
				<div>
					<img
						src={current.avatar || avatarDefault}
						alt='avatar'
						className='w-[60px] h-[60px] rounded-full object-cover'
					/>
				</div>
				<div className='flex-1'>
					<p className='text-[20px] font-[700] text-white line-clamp-1'>
						{current.name}
					</p>
					<p className='text-[14px] font-[400] text-[#5B5C5C]'>
						{current.roleId === 1 && 'Admin'}
					</p>
				</div>
			</div>
			<div>
				<p className='text-[20px] font-[700] text-white px-4 mb-2'>Danh mục</p>
				{adminSidebar.map(el => (
					<Fragment key={el.id}>
						{el.type === 'SINGLE' && (
							<NavLink
								className={({ isActive }) =>
									clsx(isActive && activedStyle, !isActive && notActivedStyle)
								}
								to={el.path}>
								<span>{el.icon}</span>
								<span>{el.text}</span>
							</NavLink>
						)}
						{el.type === 'PARENT' && (
							<div className='flex flex-col'>
								<div
									onClick={() => handleShowTabs(el.id)}
									className='flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer'>
									<div className='flex items-center gap-2'>
										<span>{el.icon}</span>
										<span>{el.text}</span>
									</div>
									{actived.some(id => id === el.id) ? (
										<AiOutlineCaretRight />
									) : (
										<AiOutlineCaretDown />
									)}
								</div>
								{actived.some(id => id === el.id) && (
									<div className='flex flex-col'>
										{el.submenu?.map(item => (
											<NavLink
												key={item.text}
												to={item.path}
												onClick={e => e.stopPropagation()}
												className={({ isActive }) =>
													clsx(
														isActive && activedStyle,
														!isActive && notActivedStyle,
														'pl-10',
													)
												}>
												<span>{item.text}</span>
											</NavLink>
										))}
									</div>
								)}
							</div>
						)}
					</Fragment>
				))}
			</div>
			<div
				onClick={() => {
					dispatch(logout())
					navigate(`/${common.LOGIN}`)
				}}
				className={clsx(notActivedStyle, 'hover:cursor-pointer border-t mt-2')}>
				<span>
					<TbDoorExit size={20} />
				</span>
				<span>Thoát tài khoản</span>
			</div>
		</div>
	)
}

export default withBaseComponent(memo(AdminSidebar))
