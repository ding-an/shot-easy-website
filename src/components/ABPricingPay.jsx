/** @format */

import { useEffect } from 'react'
import usePaddlesHandlers from './paddle/hooks/useHandlers'

export default function ABPricingPay() {
	const { createOrder } = usePaddlesHandlers()
	useEffect(() => {
		const returnUrl = localStorage.getItem('returnUrl')
		const productId = localStorage.getItem('productId')
		const quantity = localStorage.getItem('quantity')
		const channel = localStorage.getItem('channel')
		if (Number(channel) === 16) {
			localStorage.removeItem('channel')
			localStorage.removeItem('productId')
			localStorage.removeItem('quantity')
			localStorage.removeItem('returnUrl')
			createOrder(
				{
					id: productId,
					quantity: quantity,
					returnUrl: returnUrl,
				},
				() => {
					location.href = returnUrl
				}
			)
		}
	}, [])
	return null
}
