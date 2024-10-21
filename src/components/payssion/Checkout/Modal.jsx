/** @format */

import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import Form from './Form'
import { useDispatch, useStore } from './store'

export default function Modal({ className = '', style = {}, product, payment }) {
	const dispatch = useDispatch()
	const store = useStore()
	const close = useCallback(() => {
		dispatch({ type: 'CLOSE_MODAL' })
	}, [dispatch])

	if (!store.isModalOpen) {
		return null
	}

	return (
		<div
			className={`${
				store.isModalOpen ? 'fixed' : 'hidden'
			} flex inset-0 z-50 justify-center items-center`}
			style={{ background: 'rgba(0,0,0,0.64)' }}
		>
			<div
				className={`relative max-w-max p-6 bg-white px-4 rounded-2xl text-black-96 xl:px-6 ${className}`}
				style={style}
			>
				<Form product={product} payment={payment} />
				<Close onClick={close} />
			</div>
		</div>
	)
}

const Close = ({ onClick }) => (
	<div
		className='absolute right-1 top-1 bg-black opacity-40 rounded-full cursor-pointer'
		onClick={onClick}
	>
		<svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='m9.613 8.21.094.083L16 14.585l6.293-6.292a1 1 0 0 1 1.497 1.32l-.083.094L17.415 16l6.292 6.293a1 1 0 0 1-1.32 1.497l-.094-.083L16 17.415l-6.293 6.292a1 1 0 0 1-1.497-1.32l.083-.094L14.585 16 8.293 9.707a1 1 0 0 1 1.32-1.497z'
				fill='#fff'
				fillRule='evenodd'
				opacity='.642'
			></path>
		</svg>
	</div>
)
