/** @format */

import LoginForm from '@components/Login/LoginForm'
import TitleInfo from '@components/Login/TitleInfo'

export default function Login() {
	return (
		<div className='flex'>
			<main className='flex h-screen flex-1 items-center xl:h-auto xl:justify-center'>
				<div className='w-full xl:w-[400px]'>
					<TitleInfo type='login' />
					{/* email and login*/}
					<LoginForm />
				</div>
			</main>
		</div>
	)
}
