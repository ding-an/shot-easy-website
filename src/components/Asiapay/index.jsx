/** @format */
import useHandlers from './useHandlers'
import { createPortal } from 'react-dom'

export default function Asiapay({ product }) {
	const { createOrder, ordering } = useHandlers()
	return (
		<>
			<Button
				loading={ordering}
				onClick={() => {
					const user = localStorage.getItem('user')
					if (!user) {
						const login = document.getElementById('login')
						login.click()
					} else {
						createOrder(product)
					}
				}}
			/>
			<LoadingMask loading={ordering} />
		</>
	)
}

function Button({ onClick, loading }) {
	return (
		<button
			className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
			onClick={loading ? null : onClick}
		>
			Pay with Debit/Credit Card
		</button>
	)
}

function Loading({ width, height }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			x='0px'
			y='0px'
			width={width || 60}
			height={height || 60}
			viewBox='0 0 40 40'
		>
			<path
				opacity='0.2'
				fill='currentColor'
				d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'
			/>
			<path
				fill='currentColor'
				d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z'
			>
				<animateTransform
					attributeType='xml'
					attributeName='transform'
					type='rotate'
					from='0 20 20'
					to='360 20 20'
					dur='1s'
					repeatCount='indefinite'
				/>
			</path>
		</svg>
	)
}

const LoadingMask = ({ loading }) => {
	if (!loading) {
		return null
	}

	return createPortal(
		<div className='fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[rgba(0,0,0,0.5)]'>
			<div className='flex h-full w-full flex-col items-center justify-center text-white'>
				<Loading width={80} height={80} />
				<div className='mt-2 text-base text-white'>Processing</div>
			</div>
		</div>,
		document.body
	)
}
