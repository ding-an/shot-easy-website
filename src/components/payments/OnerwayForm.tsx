/** @format */

import useOnerway from './useOnerway'

export default function OnerwayForm() {
	const { polling, product } = useOnerway()

	return (
		<div
			className={`flex flex-col items-center px-5 py-16 lg:px-6 lg:py-8 mx-auto w-full h-screen ${
				product ? 'lg:w-[1200px]' : 'lg:w-[480px]'
			}`}
		>
			{polling ? (
				<div className='text-center'>Updating order status...</div>
			) : (
				<>
					{product ? (
						<div className='w-full gap-5 flex flex-col'>
							<div className='lg:text-[32px] text-2xl font-black text-[#15191f]'>Order summary</div>
							<div className='border rounded-2xl flex flex-col gap-4 lg:gap-8 border-[rgba(21,25,31,0.12)] bg-white p-4 lg:p-8'>
								<div className='flex justify-between'>
									<span className='text-[#475569]'>Package</span>{' '}
									<span className='text-[#15191f] lg:text-xl'>{product.name}</span>
								</div>
								<div className='w-full h-[1px] bg-[rgba(21,25,31,0.12)]'></div>
								<div className='flex justify-between'>
									<span className='text-[#475569]'>Total</span>{' '}
									<span className='text-[#15191f] lg:text-xl font-bold'>${product.price}</span>
								</div>
								<div className='w-full h-[1px] bg-[rgba(21,25,31,0.12)]'></div>
								<div className='flex justify-end'>
									<div id='pacypay_checkout' className='lg:w-[232px] w-full rounded-3xl h-12'>
										Loading ...
									</div>
								</div>
							</div>
						</div>
					) : (
						<div id='pacypay_checkout' className='mx-4 my-4 w-full'>
							Loading ...
						</div>
					)}
				</>
			)}
		</div>
	)
}
