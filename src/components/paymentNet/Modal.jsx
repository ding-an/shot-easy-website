/** @format */

import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import Form from './Form'
import { useDispatch, useStore } from './store'

export default function Modal({ className = '', style = {}, product }) {
	const dispatch = useDispatch()
	const store = useStore()
	const close = useCallback(() => {
		dispatch({ type: 'CLOSE_MODAL' })
	}, [dispatch])

	if (!store.isModalOpen) {
		return null
	}

	return ReactDOM.createPortal(
		<div
			className={`fixed flex inset-0 z-50 justify-center items-center`}
			style={{ background: 'rgba(0,0,0,0.64)' }}
		>
			<div
				className={`w-[600px] rounded-2xl relative p-8 modal-box max-w-max bg-white px-4 text-black-96 xl:px-6 ${className}`}
				style={style}
			>
				<Form product={product} />
				<span
					className='absolute right-1 top-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black-12'
					onClick={close}
				>
					<Close />
				</span>
			</div>
		</div>,
		document.body
	)
}

const Close = () => (
	<svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
		<g fill='#000' fillRule='evenodd'>
			<path
				d='m12.643 11.234.064.059L16 14.585l3.293-3.292a1 1 0 0 1 1.473 1.35l-.059.064L17.415 16l3.292 3.293a1 1 0 0 1-1.35 1.473l-.064-.059L16 17.415l-3.293 3.292a1 1 0 0 1-1.473-1.35l.059-.064L14.585 16l-3.292-3.293a1 1 0 0 1 1.35-1.473z'
				opacity='.88'
				fillOpacity='.8'
				fillRule='nonzero'
			/>
		</g>
	</svg>
)
