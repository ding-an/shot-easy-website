import { useState } from 'react'

import { loadAirwallex, redirectToCheckout } from 'airwallex-payment-elements'

import { post } from '@utils/request'

import { PRODUCT_TYPE, PAYMENT_TYPE } from './enums'

const isDev = import.meta.env.PUBLIC_FIREBASE_ENV === 'staging'

const useHandlers = () => {
  // 下单中
  const [ordering, setOrdering] = useState(false)

  // 创建airwallex订单
  const createAirwallexOrder = async ({ product, productType }) => {
    try {
      setOrdering(true)
      const { id, quantity } = product
      const res = await post('/users/me/orders', {
        productId: id,
        channel: PAYMENT_TYPE.AIRWALLEX,
        quantity,
        region: 'USA',
        currency: 'USD'
      })
      const { clientSecret, spOrderId } = res.data
      // 法币固定为USD
      const currency = 'USD'
      const env = isDev ? 'demo' : 'prod'
      await loadAirwallex({
        env
      })

      const successUrl = `${window.location.origin}/pricing?payload=${window.btoa(
        JSON.stringify({
          orderId: res.data.id,
          channel: PAYMENT_TYPE.AIRWALLEX,
          status: 'success'
        })
      )
        }`

      const failUrl = `${window.location.origin}/pricing?payload=${window.btoa(
        JSON.stringify({
          orderId: res.data.id,
          channel: PAYMENT_TYPE.AIRWALLEX,
          status: 'fail'
        })
      )
        }`

      const params = {
        env,
        currency,
        intent_id: spOrderId,
        client_secret: clientSecret,
        withBilling: true,
        requiredBillingContactFields: ['name', 'email'],
        mode: 'payment',
        successUrl,
        failUrl
      }

      if (productType === PRODUCT_TYPE.SUBSCRIPTION) {
        params.mode = 'recurring'
        params.recurringOptions = {
          card: {
            next_triggered_by: 'merchant',
            merchant_trigger_reason: 'scheduled',
            currency
          }
        }
      }

      // apple pay专用
      if (window.cf_country_code) {
        params.applePayRequestOptions = {
          countryCode: window.cf_country_code
        }
      }
      setOrdering(false)
      redirectToCheckout(params)
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

  return {
    createAirwallexOrder,
    ordering,
  }
}

export default useHandlers

