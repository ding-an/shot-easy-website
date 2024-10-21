/** @format */

import { createPortal } from 'react-dom'

import { useStore } from './store'
import { Spin } from 'antd'

const LoadingMask = () => {
	const store = useStore()
	const urlSearchParams = new URLSearchParams(window.location.search)
	const payload = urlSearchParams.get('payload')
	let from

	try {
		const obj = JSON.parse(window.atob(payload))
		from = obj.from
	} catch {
		// empty
	}

	if (!store.ordering || from !== '3ds') {
		return null
	}

	return createPortal(
		<div className='fixed bottom-0 left-0 right-0 top-0 z-50 bg-[#000c]'>
			<div className='flex h-full w-full flex-col items-center justify-center text-white'>
				<Spin />
				<div className='mt-2 text-base text-white'>Payment processing…</div>
			</div>
		</div>,
		document.body
	)
}

export default LoadingMask
