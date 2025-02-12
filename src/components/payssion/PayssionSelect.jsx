/** @format */

import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import PaymentSelect from './PaymentSelect'
import { get } from '@utils/request'
import Checkout from './Checkout/index.jsx'
import Processing from './Processing'

export default function PayssionSelect({
	paymentList,
	selectedPayment,
	setSelectedPayment,
	visible,
	setVisible,
	creating,
	createOrder,
	polling,
	product,
}) {
	return (
		<div
			id='PricingModal'
			className={`${visible ? 'fixed' : 'hidden'} flex inset-0 z-50 justify-center items-center`}
			style={{ background: 'rgba(0,0,0,0.64)' }}
		>
			<div className='flex flex-col bg-white w-[600px] rounded-2xl relative p-8'>
				<div
					id='pricing-modal-close'
					className='absolute right-1 top-1 bg-black opacity-40 rounded-full cursor-pointer'
					onClick={e => {
						setVisible(false)
					}}
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
				<div>
					<h1 className='font-bold text-xl'>Select Payment Method</h1>
					<div className='text-base opacity-80 flex justify-between mt-3'>
						<div>
							{product?.productTypeDes}&nbsp;•&nbsp;{product?.name}
						</div>
						<div>${product?.discount?.price || product?.price}</div>
					</div>
					<div className='h-[1px] bg-black opacity-40 w-full my-3'></div>
				</div>
				<div className='max-h-[316px] min-h-[204px] w-full overflow-y-auto p-6 xl:max-h-[224px] xl:min-h-[224px] xl:p-8'>
					<PaymentSelect
						options={paymentList}
						value={selectedPayment}
						onChange={setSelectedPayment}
					/>
				</div>
				<div className='w-full pt-6'>
					{selectedPayment?.pmId === 'klarna' ? (
						<Checkout product={product} payment={selectedPayment} />
					) : (
						<button
							className={`bg-primary-600 hover:bg-primary-700 h-[56px] text-white w-full rounded-3xl text-base font-medium ${
								paymentList.length
									? !selectedPayment
										? 'disabled cursor-not-allowed opacity-80'
										: 'cursor-pointer'
									: 'disabled cursor-not-allowed opacity-40 bg-gray-600 hover:bg-gray-700'
							} ${creating && 'disabled cursor-not-allowed'}`}
							onClick={() => (paymentList.length ? createOrder(selectedPayment, product) : null)}
						>
							{creating ? <Spin /> : 'Continue'}
						</button>
					)}
				</div>
			</div>
			{polling && <Processing />}
		</div>
	)
}
