import React, { useEffect, useState, useCallback } from 'react'
import { Pagination } from '../../components'
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment/moment'
import { apiUpdateRoleId, apiUser } from '../../apis'
import { pathAdmin } from '../../utils/path'
import icons from '../../utils/icons'
import Select from 'react-select'
import { optionsRoles } from '../../utils/contants'
import { toast } from 'react-toastify'
import withBaseComponent from '../../hocs/withBaseComponent'

const { AiOutlineSearch, AiOutlineCloseCircle } = icons

const ManageUser = ({ navigate }) => {
	const [data, setData] = useState([])
	const [count, setCount] = useState(0)
	const [params] = useSearchParams()
	const [searchText, setSearchText] = useState('')
	const [update, setUpdate] = useState(false)

	const render = useCallback(() => {
		setUpdate(!update)
	}, [update])

	useEffect(() => {
		if (searchText.length > 0) {
			navigate({
				pathname: '',
				search: createSearchParams({ name: searchText }).toString(),
			})
		} else {
			navigate({
				pathname: '',
			})
		}
	}, [searchText])

	const fetchData = async queries => {
		const response = await apiUser({
			limit: 10,
			page: queries.page,
			order: ['createdAt', 'DESC'],
			...queries,
		})
		if (response.success) {
			setData(response.response.rows)
			setCount(response.response.count)
		}
	}

	console.log(data)

	useEffect(() => {
		const queries = Object.fromEntries([...params])
		fetchData({ ...queries })
	}, [params, update])

	const handleUpdateRole = async (value, uid, rid, name) => {
		if (!(+value.value === +rid))
			return Swal.fire({
				title: 'Thông báo',
				text: `Bạn muốn cập nhập lại thông tin tài khoản của ${name} trở thành ${value.label}?`,
				icon: 'question',
				confirmButtonText: 'Xác nhận',
				showDenyButton: true,
				denyButtonText: 'Hủy',
			}).then(async rs => {
				if (rs.isConfirmed) {
					const response = await apiUpdateRoleId(
						{ id: uid },
						{ roleId: Number(value.value) },
					)

					if (response.success) {
						toast.success(response.mess)
						render()
					} else {
						toast.error(response.mess)
						render()
					}
				}
				if (rs.isDenied) {
					window.location.reload()
				}
			})
	}

	return (
		<div className='px-[12px] pt-[70px]'>
			<div className='z-10 flex justify-between items-center bg-white fixed top-0 right-0 left-[327px] px-[12px] shadow-table'>
				<h1 className='text-[24px] font-[700] text-[#408A7E]'>
					Quản lý người dùng
				</h1>
				<div className='flex gap-[17px] py-[15px]'>
					<div className='w-[292px] px-[12px] py-[6px] flex items-center gap-3 rounded-[4px] border border-[#408A7E]'>
						<span>
							<AiOutlineSearch size={16} color='#868686' />
						</span>
						<input
							value={searchText}
							onChange={text => setSearchText(text.target.value)}
							placeholder='Tìm kiếm'
							type='text'
							className='bg-transparent flex-1 outline-none text-[14px] font-[400] text-[#408A7E] placeholder:text-[#868686]'
						/>
						{searchText.length > 0 && (
							<span
								className='cursor-pointer'
								onClick={() => setSearchText('')}>
								<AiOutlineCloseCircle size={16} color='#868686' />
							</span>
						)}
					</div>
				</div>
			</div>
			<div className='rounded-[8px]'>
				<table className='w-full'>
					<thead className='h-[68px] rounded-[8px] bg-white shadow-table'>
						<tr className=''>
							<td className='w-[10%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								#
							</td>
							<td className='w-[15%] text-[14px] font-[700] text-[#5F5F5F] pl-2 py-2'>
								Họ & tên
							</td>
							<td className='w-[15%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								Ngày sinh
							</td>
							<td className='w-[15%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								Giới tính
							</td>
							<td className='w-[15%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								Khoa
							</td>
							<td className='w-[20%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								Vai trò
							</td>
							<td className='w-[10%] text-[14px] font-[700] text-[#5F5F5F] text-center py-2'>
								Số point
							</td>
						</tr>
					</thead>
					<tbody className='text-center'>
						{data?.map((user, index) => (
							<tr
								onClick={() =>
									navigate(
										`/${pathAdmin.ADMIN}/${pathAdmin.USERDETAIL}/${user.id}`,
										{
											state: {
												data: user,
												type: 'userDetail',
											},
										},
									)
								}
								key={user.id}
								className='border-b border-[#D3D3D3] cursor-pointer hover:bg-white hover:shadow-md'>
								<td className='w-[10%] text-center py-2'>
									{(+params.get('page') > 1 ? +params.get('page') - 1 : 0) *
										+import.meta.env.VITE_REACT_APP_LIMIT +
										index +
										1}
								</td>
								<td className='w-[15%] pl-2 text-left'>{user.name}</td>
								<td className='w-[15%] text-center'>
									{moment(user.birthDate).format('DD/MM/YYYY')}
								</td>
								<td className='text-center w-[15%]'>
									{user.gender === 1 ? 'Nam' : 'Nữ'}
								</td>
								<td className='text-center w-[15%]'>
									{user.facultyData.nameFaculty}
								</td>
								<td onClick={e => e.stopPropagation()} className='w-[20%] py-2'>
									{optionsRoles.some(e => +e.value === +user.roleId) ? (
										<Select
											options={optionsRoles}
											defaultValue={optionsRoles.filter(
												e => +e.value === +user.roleId,
											)}
											onChange={value =>
												handleUpdateRole(value, user.id, user.roleId, user.name)
											}
											styles={{
												control: (base, state) => ({
													...base,
													borderRadius: 8,
													marginLeft: 6,
													marginRight: 6,
													fontSize: 14,
													font: 400,
													color: 'black',
													outline: 'none',
													cursor: 'pointer',
												}),
											}}
										/>
									) : (
										'Admin'
									)}
								</td>
								<td className='w-[10%] text-center'>
									{user.studentData.point}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='w-full my-2'>
				<Pagination totalCount={count} text={'người dùng'} />
			</div>
		</div>
	)
}

export default withBaseComponent(ManageUser)
