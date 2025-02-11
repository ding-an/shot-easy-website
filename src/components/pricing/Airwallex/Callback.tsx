import { useCallback, useEffect, useState } from 'react'
import { useInterval } from 'ahooks'

import { get } from '@utils/request'
import { ORDER_STATUS, PAYMENT_TYPE } from './enums'
import Loading from './Loading'

const Callback = () => {
  // 订单详情
  const [orderInfo, setOrderInfo] = useState(null)
  // 查询订单结果中
  const [polling, setPolling] = useState(false)
  const urlSearchParams = new URLSearchParams(window.location.search);
  const { payload, from = '/' } = Object.fromEntries(urlSearchParams.entries());
  let clean
  // 定时刷新订单
  const getOrderStatus = useCallback(async () => {
    try {
      const { id } = orderInfo
      setPolling(true)
      const res = await get(`/users/me/orders/${id}`)
      const { status, errorDes } = res.data
      if (status === ORDER_STATUS.PAID) {
        clean()
        alert('payment successful')
        setTimeout(() => window.location.href = from, 3000)
        // 订单失败了
      } else if (status === ORDER_STATUS.FAILED) {
        setPolling(false)
        alert(errorDes)
        clean()
      }

      setOrderInfo(res.data)
    } catch (err) {
      setPolling(false)
      clean()
      alert(err.message)
    }
  }, [clean, from, orderInfo])


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
        const { orderId, channel, status } = JSON.parse(window.atob(payload)) || {}
        if (!orderId || channel !== PAYMENT_TYPE.AIRWALLEX) return

        if (status === 'fail') {
          alert('THE PAYMENT YOU SUBMITTED IS NOT VALID. PLEASE RE-ENTER PAYMENT INFORMATION.')
          window.location.href = '/pricing'
          return
        }

        setOrderInfo({
          id: orderId,
          status: ORDER_STATUS.PENDING
        })
      } catch (err) { }
    }
  }, [payload])

  useEffect(() => {
    return clean
  }, [clean])

  return polling ? <Loading /> : null
}

export default Callback