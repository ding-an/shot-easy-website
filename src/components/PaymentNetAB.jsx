/** @format */

import alert from '@components/Toast'
import { useEffect } from 'react'
export default function PaymentNetAB() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const status = params.get('status')
		const ext = params.get('ext')
		if (status === 'success') {
			alert.success(
				'Thank you for your payment! Credits have been added to your account. You can check your credit balance in the credit history.',
				undefined,
				100000
			)
		} else if (status === 'cancel') {
			alert.error('Payment failed. Please try again later.', undefined, 100000)
		} else {
			// A站 payment.net重定向，由于不能重定向，所以要在客户端跳转
			if (ext) {
				window.location.href = ext
			}
		}
	}, [])
	return null
}
