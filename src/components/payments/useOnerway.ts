/** @format */

import { useEffect, useState } from "react";

import { useInterval } from "ahooks";

import alert from "@components/Toast";
import { get, post } from "@utils/request";

const ORDER_STATUS = {
  PENDING: 2,
  PAID: 3,
  FAILED: 8,
};

const useOnerway = () => {
  // 输入邮箱的弹窗是否可见
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  // 订单创建中
  const [creating, setCreating] = useState(false);
  // 订单详情
  const [orderInfo, setOrderInfo] = useState(null);
  // 轮询中
  const [polling, setPolling] = useState(false);
  const [productId, setProductId] = useState("");
  const order_id = new URLSearchParams(window.location.search)?.get("order_id");
  let clean;

  const getBillingInfo = async () => {
    try {
      const res = await get("/users/me/channels/18/billing-address");
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getOrderStatus = async () => {
    try {
      const { id } = orderInfo;
      setPolling(true);
      const res = await get(`/users/me/orders/${id}`);
      const data = res.data ?? {};
      const { status, statusDes } = data;

      if (status === ORDER_STATUS.PAID) {
        alert.success("payment successful");
        clean();
        location.href = "/pricing";
        // 订单失败了
      } else if (status === ORDER_STATUS.FAILED) {
        setPolling(false);
        alert.error(statusDes);
        clean();
      }

      setOrderInfo(res.data);
    } catch (err) {
      setPolling(false);
      clean();
      alert.error(err.message);
    }
  };

  // 创建订单
  const createOrder = async () => {
    try {
      if (!productId) {
        alert.error("Please select a product");
        return;
      }
      setCreating(true);
      const res = await post("/v1/users/me/orders", {
        productId: productId,
        channel: 18,
        // @ts-ignore
        region: window.cf_country_code || "US",
        quantity: 1,
        returnUrl: `${window.location.origin}/pricing`,
        onerwayExtra: {
          colorDepth: window.screen.colorDepth,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          javaEnabled: navigator.javaEnabled(),
          timeZoneOffset: new Date().getTimezoneOffset(),
          contentLength: 256,
          email: email,
          // @ts-ignore
          province: window.cf_region_code || "CA",
        },
      });
      const data = res.data;
      setCreating(false);
      location.href = data.payUrl;
    } catch (err) {
      setCreating(false);
      alert.error(err.message);
      /**
       * "402"状态码主要是为了解决多端重复订阅状态不刷新的问题
       *
       * "2"状态码主要是为了解决
       * ①多端情况下，已经是vip的问题，还是点击订阅(报参数错误)
       * ②订阅已下架,还是点击订阅(报参数错误)
       */
      if ([402, 2].includes(err.code)) {
        location.reload();
      }
    }
  };

  clean = useInterval(
    getOrderStatus,
    // 没有明确结果就定刷订单状态
    orderInfo &&
      ![ORDER_STATUS.PAID, ORDER_STATUS.FAILED].includes(orderInfo?.status)
      ? 1000
      : undefined
  );

  useEffect(() => {
    if (order_id) {
      setOrderInfo({
        id: order_id,
        status: ORDER_STATUS.PENDING,
      });
    }
  }, [order_id]);

  return {
    visible,
    setVisible,
    setProductId,
    email,
    setEmail,
    creating,
    createOrder,
    getBillingInfo,
    polling,
  };
};

export default useOnerway;
