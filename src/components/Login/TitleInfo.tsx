/** @format */

export default function TitleInfo({ type, setType }) {
	const handleClick = type => {
		setType(type)
	}
	const TypeMap = {
		login: {
			title: 'Log in',
			tips: 'New user?',
			link: 'signup',
			tag: 'signup',
		},
		signup: {
			title: 'Sign up',
			tips: 'Already have an account?',
			link: 'login',
			tag: 'login',
		},
	}

	const current = TypeMap[type]

	if (!current) {
		return null
	}
	return (
		<>
			{/* title */}
			<h2 className='h-12 text-2xl font-semibold leading-normal text-black xl:text-[32px]'>
				{type}
			</h2>
			{/* desc */}
			<div className=' mt-2 text-sm font-light text-black'>
				<span className=' opacity-[.48]'>{current.tips}</span>
				<a
					className='ml-2 cursor-pointer leading-normal text-black underline'
					onClick={() => handleClick(current.link)}
				>
					{current.tag}
				</a>
			</div>
		</>
	)
}
