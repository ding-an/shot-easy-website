/** @format */

import LoginForm from '@components/Login/LoginForm'
import TitleInfo from '@components/Login/TitleInfo'
import { useState } from 'react'

export default function Login() {
	const [type, setType] = useState('login')
	return (
		<div className='flex'>
			<main className='flex h-screen flex-1 items-center xl:h-auto xl:justify-center'>
				<div className='w-full xl:w-[400px]'>
					<TitleInfo type={type} setType={setType} />
					{/* email and login*/}
					<LoginForm type={type} />
				</div>
			</main>
		</div>
	)
}
