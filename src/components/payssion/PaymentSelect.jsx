/** @format */

const PaymentSelect = ({ options, value, onChange }) => {
	if (!options.length) {
		return <div className='flex h-full w-full items-center justify-center loading'></div>
	}

	return (
		<ul className='flex flex-wrap gap-x-4 gap-y-3'>
			{options.map(({ icon, name, pmId }) => (
				<li key={pmId} className='w-[calc(50%-8px)] xl:w-[calc(33%-11px)]'>
					<Item
						icon={icon}
						name={name}
						actived={value?.pmId === pmId}
						onClick={() => onChange({ icon, pmId, name })}
					/>
				</li>
			))}
		</ul>
	)
}

const Item = ({ icon, name, actived, onClick }) => {
	return (
		<div className={`relative h-[44px] cursor-pointer rounded-xl p-px xl:h-12`} onClick={onClick}>
			<div
				className={`h-full w-full rounded-xl p-px ${actived ? 'bg-primary-600' : 'bg-[#3b3c54]'}`}
			>
				<div className='h-full rounded-xl bg-white px-4 py-[10px]'>
					<img src={icon} alt={name} className='h-full w-full object-contain object-center' />
				</div>
			</div>
			{actived && (
				<div className='absolute right-[3px] top-[3px]'>
					<svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
						<defs>
							<linearGradient x1='0%' y1='0%' x2='100%' y2='100%' id='mkfb0yfisa'>
								<stop stopColor='#FF2A87' offset='0%' />
								<stop stopColor='#FF9D2E' offset='100%' />
							</linearGradient>
						</defs>
						<g fill='none' fillRule='evenodd'>
							<circle fill='url(#mkfb0yfisa)' cx='10' cy='10' r='8' />
							<path
								d='M12.293 7.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.585l3.293-3.292z'
								fill='#FFF'
								fillRule='nonzero'
							/>
						</g>
					</svg>
				</div>
			)}
		</div>
	)
}

export default PaymentSelect
