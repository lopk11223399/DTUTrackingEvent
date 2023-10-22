import React, { useState } from 'react'
import { apiLogin } from '../../apis/user'
import withBaseComponent from '../../hocs/withBaseComponent'
import { pathAdmin, pathCreator } from '../../utils/path'
import { login } from '../../store/user/userSlice'
import { useSelector } from 'react-redux'

function Login({ navigate, dispatch }) {
	const [error, setError] = useState({
		usernameErr: null,
		passwordErr: null,
	})
	const [payload, setPayload] = useState({
		username: '',
		password: '',
	})

	const handleLogin = async () => {
		if (payload.username.length < 0 || payload.username === '')
			setError(prev => ({
				...prev,
				usernameErr: 'Tài khoản không được để trống',
			}))

		if (payload.password.length < 0 || payload.password === '')
			setError(prev => ({
				...prev,
				passwordErr: 'Mật khẩu không được để trống',
			}))

		if (error.usernameErr === null && error.passwordErr === null) {
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
	}

	return (
		<div className='w-screen h-screen relative bg-[#F5F5F5]'>
			<div className='absolute top-0 bottom-0 left-0 right-0 mr-auto ml-auto flex items-center justify-center'>
				<div className='w-[400px] flex flex-col items-center p-4 gap-5 rounded-[20px] bg-[#fff] shadow-md'>
					<div className='pb-4'>
						<h1 className='text-center text-[48px] font-bold text-red-600'>
							DTU
						</h1>
						<h3 className='text-center text-[30px] font-[600]'>
							Event Tracking Application
						</h3>
					</div>

					<div className='flex flex-col w-full'>
						<label
							htmlFor='username'
							className='capitalize self-start mb-[10px] text-[16px] font-[400] text-black'>
							tài khoản
						</label>
						<input
							value={payload.username}
							onChange={text => {
								setError(prev => ({ ...prev, usernameErr: null }))
								setPayload(prev => ({ ...prev, username: text.target.value }))
							}}
							placeholder='Tên tài khoản'
							type='text'
							className='bg-[#F5F5F5] outline-none py-[10px] px-[15px] text-[16px] font-[400] rounded-[10px]'
						/>
						{error?.usernameErr !== null && (
							<small className='mt-[2px] text-red-400'>
								{error?.usernameErr}
							</small>
						)}
					</div>

					<div className='flex flex-col w-full'>
						<label
							htmlFor='username'
							className='capitalize self-start mb-[10px] text-[16px] font-[400] text-black'>
							mật khẩu
						</label>
						<input
							type='password'
							value={payload.password}
							onChange={text => {
								setError(prev => ({ ...prev, passwordErr: null }))
								setPayload(prev => ({ ...prev, password: text.target.value }))
							}}
							placeholder='Mật khẩu'
							className='bg-[#F5F5F5] outline-none py-[10px] px-[15px] text-[16px] font-[400] rounded-[10px]'
						/>
						{error?.passwordErr !== null && (
							<small className='mt-[2px] text-red-400'>
								{error?.passwordErr}
							</small>
						)}
					</div>

					<div
						onClick={handleLogin}
						className='w-full text-center bg-[#519BD0] py-2 text-[16px] font-[700] capitalize text-white rounded-[10px] hover:cursor-pointer hover:opacity-80'>
						đăng nhập
					</div>
				</div>
			</div>
		</div>
	)
}

export default withBaseComponent(Login)
