/** @format */
import { useState, useEffect } from 'react'
import alert from '@components/Toast'

import { post, get } from '@utils/request'

// checkout 订单状态
export const ORDER_STATUS = {
	PENDING: 2,
	DETECTED: 10,
	WAIT_AUTH: 11,
	PAID: 3,
	FAILED: 8,
}

function removeQueryParams() {
	const url = new URL(window.location.href)
	url.search = ''
	// 替换当前历史记录
	history.replaceState({}, '', url)
}

const useHandlers = () => {
	const [ordering, setOrdering] = useState(false)
	const params = new URLSearchParams(window.location.search)
	const id = params.get('Ref')

	const getOrderStatus = async id => {
		if (!id) return
		try {
			setOrdering(true)
			const res = await get(`/users/me/orders/${id}`)
			const data = res.data ?? {}
			const { status, statusDes } = data
			if (status === ORDER_STATUS.PAID) {
				alert.success('payment successful')
				removeQueryParams()
				setOrdering(false)
				// 订单失败了
			} else if (status === ORDER_STATUS.FAILED) {
				removeQueryParams()
				setOrdering(false)
				alert.error(statusDes)
			} else {
				getOrderStatus(id)
			}
		} catch (err) {
			setOrdering(false)
			alert.error(err.message)
		}
	}

	// 创建订单
	const createOrder = async product => {
		try {
			setOrdering(true)
			const url = window.location.origin
			const { id, quantity } = product
			const params = {
				productId: id,
				channel: 23,
				quantity,
				region: 'USA',
				currency: 'USD',
				returnUrl: `${url}/payment?status=success`,
				cancelUrl: `${url}/payment?status=cancel`,
			}
			// 创建订单
			const { data, success, errorMsg } = await post('/users/me/orders', params)
			if (!success) {
				alert.error(errorMsg)
			}
			if (data?.payUrl) {
				location.href = data.payUrl
			}
		} catch (err) {
			alert.error(err.message)
		} finally {
			setOrdering(false)
		}
	}

	useEffect(() => {
		try {
			if (id) {
				getOrderStatus(id)
			}
		} catch (err) {}
	}, [id])

	return {
		ordering,
		createOrder,
	}
}

export default useHandlers
