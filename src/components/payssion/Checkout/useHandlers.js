/** @format */

import { useMemoizedFn } from 'ahooks'

import { get, post } from '@utils/request'

import { useDispatch } from './store'
import { message } from 'antd'

const useHandlers = () => {
	const dispatch = useDispatch()

	// 创建订单
	const createOrder = async (product, extra) => {
		try {
			const { id, quantity } = product
			const params = {
				productId: id,
				channel: 9,
				quantity,
				region: 'USA',
				currency: 'USD',
				returnUrl: `${window.location.origin}/pricing`,
				payssionExtra: extra,
			}

			// 创建订单
			const res = await post('/users/me/orders', params)
			location.href = res.data.payUrl
		} catch (err) {
			message.error(err.message)
		}
	}

	const getBillingAddress = useMemoizedFn(async (product, payment) => {
		try {
			if (!payment) {
				message.error('Please select a payment method.')
				return
			}
			dispatch({
				type: 'ORDERING',
				payload: true,
			})
			const { data, success, errorMsg } = await get(`/users/me/channels/9/billing-address`)
			if (success) {
				if (data.hasBillingAddress) {
					createOrder(product, {
						pmId: payment.pmId,
					})
				} else {
					// 打开弹窗
					dispatch({ type: 'OPEN_MODAL' })
				}
				dispatch({
					type: 'ORDERING',
					payload: false,
				})
			} else {
				message.error(errorMsg)
			}
		} catch (err) {
			dispatch({
				type: 'ORDERING',
				payload: false,
			})
			message.error(err.message)
		}
	})

	const createOrderWithAddress = useMemoizedFn(async (params, product, payment) => {
		try {
			dispatch({
				type: 'UPDATE_PAYINFO_ERROR',
				payload: '',
			})
			dispatch({
				type: 'ORDERING',
				payload: true,
			})

			const payInfo = {
				pmId: payment.pmId,
				country: params.country_code,
				firstName: params.first_name,
				lastName: params.last_name,
				postalCode: params.postal_code,
				province: params.state_code,
				city: params.city,
				addressLine1: params.address_line1,
				addressLine2: params.address_line2,
				email: params.email,
				phone: params.phone,
			}
			await createOrder(product, payInfo)
		} catch (err) {
			message.error(err.message)
		} finally {
			dispatch({
				type: 'ORDERING',
				payload: false,
			})
		}
	})

	return {
		getBillingAddress,
		createOrderWithAddress,
	}
}

export default useHandlers
