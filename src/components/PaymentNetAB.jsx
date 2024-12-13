/** @format */

import alert from '@components/Toast'
import { useEffect } from 'react'
export default function PaymentNetAB() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const status = params.get('status')
		if (status === 'success') {
			alert.success(
				'Thank you for your payment! Credits have been added to your account. You can check your credit balance in the credit history.'
			)
		} else if (status === 'cancel') {
			alert.error('Payment failed. Please try again later.')
		}
	}, [])
	return null
}
