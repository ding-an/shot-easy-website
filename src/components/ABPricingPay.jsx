/** @format */

import { useEffect } from 'react'
import { initializePaddle } from '@paddle/paddle-js'
import alert from './Toast'

const channelMap = {
	paddle: 16,
	payssion: 9,
}

export default function ABPricingPay() {
	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search)
		const returnUrl = urlSearchParams.get('returnUrl')
		const channel = urlSearchParams.get('channel')
		const token = urlSearchParams.get('token')
		// 地址栏没有token时
		if (Number(channel) === channelMap.paddle && !token) {
			const clientSecret = urlSearchParams.get('clientSecret')
			const spOrderId = urlSearchParams.get('spOrderId')
			try {
				let paddle
				initializePaddle({
					environment: 'sandbox',
					token: clientSecret,
					eventCallback: data => {
						if (data.data.status === 'completed' || data.name == 'checkout.completed') {
							alert.success('payment successful')
							paddle.Checkout.close()
							setTimeout(() => {
								location.href = returnUrl
							}, 2000)
						} else if (data.name === 'checkout.closed') {
							location.href = returnUrl
						}
					},
				}).then(paddleInstance => {
					if (paddleInstance) {
						paddle = paddleInstance
						paddleInstance.Checkout.open({
							transactionId: spOrderId,
						})
					}
				})
			} catch (err) {
				alert.error(err.message)
			}
		} else if (Number(channel) === channelMap.payssion) {
			const payUrl = urlSearchParams.get('payUrl')
			location.href = payUrl
		}
	}, [])
	return null
}
