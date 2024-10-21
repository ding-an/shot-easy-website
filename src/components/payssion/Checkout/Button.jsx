/** @format */

import { Spin } from 'antd'

export default function CheckoutButton({ onClick, loading }) {
	return (
		<button
			className='bg-primary-600 cursor-pointer hover:bg-primary-700 h-[56px] text-white w-full rounded-3xl text-base font-medium'
			onClick={loading ? null : onClick}
		>
			{loading && <Spin />}

			<span className='text-base font-medium'>Continue</span>
		</button>
	)
}
