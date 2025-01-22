/** @format */

import { useCallback, useEffect, useState } from 'react'

import { useInterval, useMemoizedFn } from 'ahooks'
import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements'

import { localCache } from '@utils/storage'
import cookie from '@utils/cookie'
import { get, post } from '@utils/request'

import { ORDER_STATUS, PAYMENT_TYPE } from './enums'

const isDev = import.meta.env.PUBLIC_FIREBASE_ENV === 'staging'

const useHandlers = () => {
	// 下单中
	const [ordering, setOrdering] = useState(false)
	// 订单详情
	const [orderInfo, setOrderInfo] = useState(null)
	// 查询订单结果中
	const [polling, setPolling] = useState(false)
	const [success, setSuccess] = useState(false)
	const [code, setCode] = useState('')

  const urlSearchParams = new URLSearchParams(window.location.search);
  const { payload, ext = null } = Object.fromEntries(urlSearchParams.entries());
  let clean

	const toABurl = useMemoizedFn(() => {
		const url = localCache.getCache('url')
		if (url) {
			localCache.removeCache('url')
			location.href = url
		}
	})

	// 定时刷新订单
	const getOrderStatus = useCallback(async () => {
		try {
			const { id, ext } = orderInfo
			setPolling(true)
			const res = await get(`/users/me/promo-orders/${id}`, { ext })
			const { status, errorDes, promoCode } = res.data
			if (status === ORDER_STATUS.PAID) {
				setPolling(false)
				setSuccess(true)
				setCode(promoCode)
				clean()
				toABurl()
				// 订单失败了
			} else if (status === ORDER_STATUS.FAILED) {
				setPolling(false)
				alert(errorDes)
				clean()
				toABurl()
			}

			setOrderInfo(res.data)
		} catch (err) {
			setPolling(false)
			clean()
			alert(err.message)
		}
	}, [clean, orderInfo, toABurl])

  // 创建airwallex订单
  const createAirwallexOrder = async ({ id, platform }, user) => {
    try {
      setOrdering(true)
      // 如果不是ds报错
      if (platform !== 0) {
        setTimeout(() => {
          setOrdering(false)
          alert('There is an error in the order parameters. Please re-initiate the order later.')
        }, 2000)
        return
      }
      const res = await post('/v1/users/me/promo-orders', {
        channel: PAYMENT_TYPE.AIRWALLEX,
        productId: id,
        quantity: 1,
        region: cookie.get('vercel_country_code') || 'US',
        cancelUrl: location.href,
        exchangeUserId: user,
        ext,
        method: 7,
        onerwayExtra: {
          province: cookie.get('vercel_province_code'),
          javaEnabled: navigator.javaEnabled(),
          colorDepth: window.screen.colorDepth,
          screenHeight: window.screen.height,
          screenWidth: window.screen.width,
          timeZoneOffset: new Date().getTimezoneOffset(),
          contentLength: 256
        }
      })
      const { clientSecret, spOrderId } = res.data
      // 法币固定为USD
      const currency = 'USD'
      const env = isDev ? 'demo' : 'prod'
      await loadAirwallex({
        env
      })

			const successUrl = `${
				window.location.origin + window.location.pathname
			}?payload=${window.btoa(
				JSON.stringify({
					orderId: res.data.id,
					channel: PAYMENT_TYPE.AIRWALLEX,
					status: 'success',
					ext,
				})
			)}${ext ? `&user=${user}` : ''}`

			const failUrl = `${window.location.origin + window.location.pathname}?payload=${window.btoa(
				JSON.stringify({
					orderId: res.data.id,
					channel: PAYMENT_TYPE.AIRWALLEX,
					status: 'fail',
				})
			)}${ext ? `&user=${user}` : ''}`

			const params = {
				env,
				currency,
				intent_id: spOrderId,
				client_secret: clientSecret,
				withBilling: true,
				requiredBillingContactFields: ['name', 'email'],
				mode: 'payment',
				successUrl,
				failUrl,
				country_code: cookie.get('vercel_country_code'),
			}

			// apple pay专用
			if (cookie.get('vercel_country_code')) {
				params.applePayRequestOptions = {
					countryCode: cookie.get('vercel_country_code'),
				}
			}
			localCache.setCache('url', location.href)
			redirectToCheckout(params)
			setOrdering(false)
		} catch (err) {
			setOrdering(false)
			alert(err.message)
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

	useEffect(() => {
		if (payload) {
			// 解析payload
			try {
				const { orderId, channel, status, ext } = JSON.parse(window.atob(payload)) || {}
				if (!orderId || channel !== PAYMENT_TYPE.AIRWALLEX) return

				if (status === 'fail') {
					alert('THE PAYMENT YOU SUBMITTED IS NOT VALID. PLEASE RE-ENTER PAYMENT INFORMATION.')
					toABurl()
					return
				}
				setOrderInfo({
					id: orderId,
					status: ORDER_STATUS.PENDING,
					ext,
				})
			} catch (err) {}
		}
	}, [payload, toABurl])

	useEffect(() => {
		return clean
	}, [clean])

	return {
		createAirwallexOrder,
		ordering,
		polling,
		success,
		setSuccess,
		code,
	}
}

export default useHandlers
