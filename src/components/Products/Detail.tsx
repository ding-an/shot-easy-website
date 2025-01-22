/** @format */

import { useState } from 'react'
import { btn, tag2 } from './style'
import Loading from './Loading'
import ResultModal from './ResultModal'
import useHandlers from './useHandlers'
import ConfirmModal from './ConfirmModal'

const Detail = ({ products }) => {
	const [visible, setVisible] = useState(false)
	const [currentProduct, setProduct] = useState(null)
	const [userId, setUserId] = useState(null)
	const { createAirwallexOrder, ordering, polling, success, setSuccess, code, toABurl } = useHandlers()
	const urlSearchParams = new URLSearchParams(window.location.search)
	const { user = null } = Object.fromEntries(urlSearchParams.entries())

	return (
		<>
			<div className='mt-6 flex flex-nowrap gap-3 overflow-x-auto xl:mt-0 xl:flex-1 xl:gap-5'>
				{products.map(i => (
					<div className='w-[152px] flex-shrink-0 rounded-2xl border border-solid border-white/10 bg-[#222b38] p-3 text-white/94 xl:h-[240px] xl:w-[200px] xl:max-w-[33%] xl:flex-1 xl:rounded-2.5xl xl:p-4'>
						{i.discount && <div className={`inline-block ${tag2}`}>{i.discount} off</div>}
						<div className='font-semibold xl:my-3 xl:text-base'>{i.short_name}</div>
						<div className='font-semibold xl:text-2xl'>{i.price}</div>
						<div className='text-white/60 line-through xl:mt-1 xl:text-sm'>{i.originalPrice}</div>
						<div
							className={`${btn} mt-4 flex items-center justify-center xl:mt-[30px] gap-x-2`}
							onClick={() => {
								if (ordering) return
								if (user) {
									createAirwallexOrder(i, user)
								} else {
									const user = localStorage.getItem('user')
									if (!user) {
										const login = document.getElementById('login')
										login.click()
									} else {
										setVisible(true)
										setProduct(i)
									}
								}
							}}
						>
							BUY
						</div>
					</div>
				))}
			</div>
			{visible && (
				<ConfirmModal
					product={currentProduct}
					ordering={ordering}
					onChange={value => {
						setUserId(value)
					}}
					onClose={() => {
						setVisible(false)
					}}
					onConfirm={() => {
						createAirwallexOrder(currentProduct, userId)
					}}
				/>
			)}
			{ordering && <Loading content='Waiting...' />}
			{polling && <Loading />}
			{success && <ResultModal code={user ? '' : code} onClose={() => {
				setSuccess(false)
				toABurl()
			}} />}
		</>
	)
}

export default Detail
