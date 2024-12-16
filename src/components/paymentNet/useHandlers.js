/** @format */

import alert from '@components/Toast'
import { get, post } from '@utils/request'

import { ORDER_STATUS } from './enums'
import { useDispatch } from './store'
import { useEffect } from 'react'

const useHandlers = () => {
	const dispatch = useDispatch()
	const params = new URLSearchParams(window.location.search)
	const id = params.get('20_order_id')
	const status = params.get('status')

	function removeQueryParams() {
		const url = new URL(window.location.href)
		url.search = ''
		// 替换当前历史记录
		history.replaceState({}, '', url)
	}

	const getOrderStatus = async id => {
		if (!id) return
		try {
			dispatch({
				type: 'ORDERING',
				payload: true,
			})
			const res = await get(`/users/me/orders/${id}`)
			const data = res.data ?? {}
			const { status, statusDes } = data
			if (status === ORDER_STATUS.PAID) {
				alert.success('payment successful')
				removeQueryParams()
				dispatch({
					type: 'ORDERING',
					payload: false,
				})
				// 订单失败了
			} else if (status === ORDER_STATUS.FAILED) {
				removeQueryParams()
				dispatch({
					type: 'ORDERING',
					payload: false,
				})
				alert.error(statusDes)
			} else {
				getOrderStatus(id)
			}
		} catch (err) {
			dispatch({
				type: 'ORDERING',
				payload: false,
			})
			alert.error(err.message)
		}
	}

	// 创建订单
	const createOrder = async (form, product) => {
		try {
			dispatch({
				type: 'ORDERING',
				payload: true,
			})
      const url = window.location.origin
			const payInfo = {
				firstName: form.first_name,
				lastName: form.last_name,
				country: form.country_code,
				province: form.state_code,
				postalCode: form.postal_code,
				city: form.city,
				address: form.address_line1,
				email: form.email,
			}
			const { id, quantity } = product
			const params = {
				productId: id,
				channel: 21,
				quantity,
				region: 'USA',
				currency: 'USD',
				returnUrl: `${url}/payment`,
				pnetExtra: payInfo,
			}

			// 创建订单
			const { data, success, errorMsg } = await post('/users/me/orders', params)
			if (!success) {
				alert.error(errorMsg)
			}
			const successUrl = `${url}/payment?status=success`
			const cancelUrl = `${url}/payment?status=cancel`
			if (data?.payUrl) {
				location.href =
					data.payUrl +
					`?success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`
			}
			dispatch({
				type: 'CLOSE_MODAL',
			})
		} catch (err) {
			alert(err.message)
		} finally {
			dispatch({
				type: 'ORDERING',
				payload: false,
			})
		}
	}

	const openModal = () => {
		dispatch({ type: 'OPEN_MODAL' })
	}

	useEffect(() => {
		try {
			if (status === 'failed') {
				alert.error('Payment failed')
				removeQueryParams()
			} else if (status === 'success' && id) {
				getOrderStatus(id)
			}
		} catch (err) {}
	}, [id, status])

	return {
		openModal,
		createOrder,
	}
}

export default useHandlers
