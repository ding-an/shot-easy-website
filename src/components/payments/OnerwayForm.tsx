/** @format */

import useOnerway from './useOnerway'

export default function OnerwayForm() {
	const { polling, product } = useOnerway()

	return (
		<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto w-full lg:w-[480px]'>
			{polling ? (
				<div className='text-center'>Updating order status...</div>
			) : (
				<>
					{product && (
						<div className='w-full gap-4 flex flex-col font-bold'>
							<div className=''>Order summary</div>
							<div className='flex border rounded-xl px-2 py-4 border-gray-400 justify-between'>
								<span>Package</span> <span>{product.name}</span>
							</div>
							<div className='flex border rounded-xl px-2 py-4 border-gray-400 justify-between'>
								<span>Total</span> <span>${product.price}</span>
							</div>
						</div>
					)}

					<div id='pacypay_checkout' className='mx-4 my-4 w-full'>
						Loading ...
					</div>
				</>
			)}
		</div>
	)
}
