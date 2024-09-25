/** @format */

export default function TitleInfo({ type }) {
	const handleClick = type => {
		window.location.href = `/${type}`
	}

	const TypeMap = {
		login: {
			title: 'Log in',
			tips: 'New user?',
			tag: 'Sign up',
			link: 'signup',
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
        Log in
			</h2>
			{/* desc */}
			{/* {current.tips && (
				<div className=' mt-2 text-sm font-light text-black'>
					<span className=' opacity-[.48]'>{current.tips}</span>
					<a
						className='ml-2 cursor-pointer leading-normal text-font-blue underline'
						onClick={() => handleClick(current.link)}
					>
						{current.tag}
					</a>
				</div>
			)} */}
		</>
	)
}
