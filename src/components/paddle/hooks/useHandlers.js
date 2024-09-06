/** @format */

import { useState } from 'react'
import { initializePaddle } from '@paddle/paddle-js'

import alert from '../../Toast'
import { post } from '@utils/request'

const useHandlers = () => {
	// 选择支付方式的弹窗是否可见
	const [visible, setVisible] = useState(false)
	// 订单创建中
	const [creating, setCreating] = useState(false)

	// 创建订单
	const createOrder = async product => {
		try {
			const { id: productId, quantity } = product
			setCreating(true)
			const res = await post('/users/me/orders', {
				productId: productId,
				channel: 16,
				region: 'USA',
				quantity,
				returnUrl: `${window.location.origin}/pricing`,
			})
			const data = res.data
			const { clientSecret, spOrderId } = data
			setCreating(false)
			let paddle
			initializePaddle({
				environment: 'sandbox',
				token: clientSecret,
				eventCallback: data => {
					if (data.data.status === 'completed' || data.name == 'checkout.completed') {
						alert.success('payment successful')
						paddle.Checkout.close()
						setTimeout(() => {
							location.href = '/pricing'
						}, 2000)
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
			setCreating(false)
			alert.error(err.message)
			/**
			 * "402"状态码主要是为了解决多端重复订阅状态不刷新的问题
			 *
			 * "2"状态码主要是为了解决
			 * ①多端情况下，已经是vip的问题，还是点击订阅(报参数错误)
			 * ②订阅已下架,还是点击订阅(报参数错误)
			 */
			if ([402, 2].includes(err.code)) {
				location.reload()
			}
		}
	}

	return {
		visible,
		setVisible,
		creating,
		createOrder,
	}
}

export default useHandlers
