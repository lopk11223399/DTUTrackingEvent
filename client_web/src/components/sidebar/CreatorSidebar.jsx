import { memo, Fragment, useState } from "react";
import { creatorSidebar } from "../../utils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import icons from "../../utils/icons";
import { common } from "../../utils/path";
import { logout } from "../../store/user/userSlice";
import withBaseComponent from "../../hocs/withBaseComponent";

const { AiOutlineCaretDown, AiOutlineCaretRight } = icons;

const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-[#86A789]'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-[#B2C8BA]'

const CreatorSidebar = ({ dispatch, navigate }) => {
  const [actived, setActived] = useState([]);

  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };

	return (
		<div className=' bg-white h-full py-4'>
			<div>
				{creatorSidebar.map(el => (
					<Fragment key={el.id}>
						{el.type === 'SINGLE' &&   (
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
									className='flex items-center justify-between gap-2 px-4 py-2 hover:bg-[#B2C8BA] cursor-pointer'>
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
				className={clsx(notActivedStyle, 'hover:cursor-pointer')}>
				Thoát tài khoản
			</div>
		</div>
	)
}

export default withBaseComponent(memo(CreatorSidebar));
