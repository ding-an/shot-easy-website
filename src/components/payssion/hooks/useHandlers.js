/** @format */

import { useEffect, useState } from 'react'

import { useInterval } from 'ahooks'

import alert from '../Toast'
import { get, post } from '@utils/request'

const ORDER_STATUS = {
	PENDING: 2,
	PAID: 3,
	FAILED: 8,
}

const useHandlers = () => {
	// 支付方式列表
	const [paymentList, setPaymentList] = useState([])
	// 用户当前选择的支付方式
	const [selectedPayment, setSelectedPayment] = useState()
	// 选择支付方式的弹窗是否可见
	const [visible, setVisible] = useState(false)
	// 订单创建中
	const [creating, setCreating] = useState(false)
	// 订单详情
	const [orderInfo, setOrderInfo] = useState(null)
	// 轮询中
	const [polling, setPolling] = useState(false)
	const order_id = new URLSearchParams(window.location.search)?.get('order_id')
	let clean

	const getOrderStatus = async () => {
		try {
			const { id } = orderInfo
			setPolling(true)
			const res = await get(`/users/me/orders/${id}`)
			const data = res.data ?? {}
			const { status, statusDes } = data

			if (status === ORDER_STATUS.PAID) {
				clean()
				alert.success('payment successful')
				const user = JSON.parse(localStorage.getItem('user'))
				if (user) {
					const json = await get(`/v2/users/me/equities`)
					document.getElementById('current-credits').innerText = json.data.credits
				}
				// 订单失败了
			} else if (status === ORDER_STATUS.FAILED) {
				setPolling(false)
				alert.error(statusDes)
				clean()
			}

			setOrderInfo(res.data)
		} catch (err) {
			setPolling(false)
			clean()
			alert.error(err.message)
		}
	}

	// 创建订单
	const createOrder = async (payment, product) => {
		try {
			if (!payment) {
				alert.error('Please select a payment method.')
				return
			}

			const { id: productId, quantity } = product
			setCreating(true)
			const res = await post('/users/me/orders', {
				productId: productId,
				channel: 9,
				pmId: payment.pmId,
				region: 'USA',
				quantity,
				returnUrl: `${window.location.origin}/pricing`,
			})
			const data = res.data
			setCreating(false)
			location.href = data.payUrl
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

	clean = useInterval(
		getOrderStatus,
		// 没有明确结果就定刷订单状态
		orderInfo && ![ORDER_STATUS.PAID, ORDER_STATUS.FAILED].includes(orderInfo?.status)
			? 1000
			: undefined
	)
	const user = localStorage.getItem('user')

	useEffect(() => {
		// 初始化获取支付方式列表
		const _init = async () => {
			try {
				const res = await get(`/channels/9/methods`)
				setPaymentList(res.data)
			} catch (err) {
				console.log(err.message)
			}
		}

		user && _init()
	}, [user])

	useEffect(() => {
		if (order_id) {
			setOrderInfo({
				id: order_id,
				status: ORDER_STATUS.PENDING,
			})
		}
	}, [order_id])

	return {
		paymentList,
		selectedPayment,
		setSelectedPayment,
		visible,
		setVisible,
		creating,
		createOrder,
		polling,
	}
}

export default useHandlers
