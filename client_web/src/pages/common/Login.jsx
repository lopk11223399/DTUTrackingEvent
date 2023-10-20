import React, { useState } from 'react'
import { apiLogin } from '../../apis/user'
import withBaseComponent from '../../hocs/withBaseComponent'
import { pathAdmin, pathCreator } from '../../utils/path'
import { login } from '../../store/user/userSlice'
import { useSelector } from 'react-redux'

function Login({ navigate, dispatch }) {
	const [error, seterror] = useState({
		usernameErr: null,
		passwordErr: null,
	})
	const [payload, setPayload] = useState({
		username: '',
		password: '',
	})

	const handleLogin = async () => {
		const response = await apiLogin(payload)
		if (response.success === true) {
			dispatch(
				login({
					isLoggedIn: true,
					token: response.token,
					current: response.user,
				}),
			)

			if (+response.user.roleId === 1) {
				navigate(`/${pathAdmin.ADMIN}`)
			} else if (+response.user.roleId === 2) {
				navigate(`/${pathCreator.CREATOR}`)
			}
		}
	}

	return (
		<div className='w-screen h-screen relative'>
			<div className='absolute top-0 bottom-0 left-0 right-0 mr-auto ml-auto flex items-center justify-center'>
				<div className='w-[400px] flex flex-col items-center p-4 gap-8 rounded-md bg-[#fff] shadow-md'>
					<div className='pb-4'>
						<h1 className='text-center text-[48px] font-bold text-red-600'>
							DTU
						</h1>
						<h3 className='text-center text-[30px] font-[600]'>
							Event Tracking Application
						</h3>
					</div>

					<div className='flex flex-col w-full'>
						<label htmlFor='username' className='capitalize self-start'>
							tài khoản
						</label>
						<input
							value={payload.username}
							onChange={text =>
								setPayload(prev => ({ ...prev, username: text.target.value }))
							}
							type='text'
							className='bg-transparent border outline-none'
						/>
						{error?.usernameErr !== null && <small>error</small>}
					</div>

					<div className='flex flex-col w-full'>
						<label htmlFor='username' className='capitalize self-start'>
							mật khẩu
						</label>
						<input
							value={payload.password}
							onChange={text =>
								setPayload(prev => ({ ...prev, password: text.target.value }))
							}
							type='text'
							className=' bg-transparent border outline-none'
						/>
						{error?.passwordErr !== null && <small>error</small>}
					</div>

					<div
						onClick={handleLogin}
						className='w-[30%] text-center bg-sky-300 items-center py-2 rounded-md capitalize'>
						đăng nhập
					</div>
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(Login)
