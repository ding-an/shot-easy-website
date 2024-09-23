/** @format */

import { useEffect } from 'react'
import { initializePaddle } from '@paddle/paddle-js'
import alert from './Toast'
import CryptoJS from 'crypto-js'
import website from '../configs/website.json'

const channelMap = {
	paddle: 16,
	payssion: 9,
}
const key = website.paddle_public_key

export default function ABPricingPay() {
	useEffect(() => {
		const storedParamsString = sessionStorage.getItem('myParams')
		const urlSearchParams = new URLSearchParams(storedParamsString)
		const returnUrl = urlSearchParams.get('returnUrl')
		const channel = urlSearchParams.get('channel')
		const token = urlSearchParams.get('token')
		if (Number(channel) === channelMap.paddle) {
			const clientSecret = urlSearchParams.get('clientSecret')
			const spOrderId = urlSearchParams.get('spOrderId')
			try {
				let paddle
				const paddleConfig = {
					environment: 'production',
					token: clientSecret,
					eventCallback: data => {
						const decryptedBytes = CryptoJS.AES.decrypt(window.atob(returnUrl), key)
						const decryptedUrl = decryptedBytes.toString(CryptoJS.enc.Utf8)
						if (data.data.status === 'completed' || data.name == 'checkout.completed') {
							alert.success('payment successful')
							paddle.Checkout.close()
							setTimeout(() => {
								location.href = decryptedUrl
							}, 3000)
						} else if (data.name === 'checkout.closed') {
							// 关闭
							location.href = decryptedUrl
						}
					},
				}
				if (import.meta.env.PUBLIC_FIREBASE_ENV === 'staging') {
					paddleConfig.environment = 'sandbox'
				}
				initializePaddle(paddleConfig).then(paddleInstance => {
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
			const transaction_id = urlSearchParams.get('transaction_id')
			const order_id = urlSearchParams.get('order_id')
			if (transaction_id && order_id) {
				// 跳回去A站
				location.href = payUrl + '?transaction_id=' + transaction_id + '&order_id=' + order_id
			} else {
				// 跳支付站
				location.href = payUrl
			}
		}
	}, [])
	return null
}
