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
  // 订单创建中
  const [creating, setCreating] = useState(false);
  // 订单详情
  const [orderInfo, setOrderInfo] = useState(null);
  // 轮询中
  const [polling, setPolling] = useState(false);
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
  const createOrder = async (productId: string) => {
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
          email: localStorage.getItem("fb_email"),
          // @ts-ignore
          province: window.cf_region_code || "CA",
        },
      });
      import("@lib/onerway").then(() => {
        setCreating(false);
        // @ts-ignore
        const pacypay = new window.Pacypay(res.data.spOrderId, {
          locale: "en", // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
          environment: "sandbox", // sandbox、production
          mode: "CARD",
          config: {
            subProductType: "TOKEN", // DIRECT - 直接支付/订阅支付/预授权支付，TOKEN - 绑卡支付
            checkoutTheme: "light", // light、dark
            customCssURL: "", // 自定义样式链接地址，配置该值后，checkoutTheme 则无效
            styles: {
              ".pacypay-checkout__button--pay": {
                "background-color": "rgb(37, 99, 235)",
              },
            },
          },
          onPaymentCompleted: function (res) {
            console.log(res);
            //成功支付后回调方法
            const txtInfo = res.data; // 返回交易结果详情
            const respCode = res.respCode; // 响应码
            const respMsg = res.respMsg; // 响应信息
            if (respCode === "20000") {
              // respCode 为 20000 表示交易正常
              switch (
                txtInfo.status // 交易状态判断
              ) {
                case "S": // status 为 'S' 表示成功
                  // 支付最终状态以异步通知结果为准
                  alert.success("Payment successful");
                  setTimeout(() => {
                    location.href = "/pricing";
                  }, 3000);
                  break;
                case "R": // status 为 'R' 表示需要3ds验证
                  // 当交易状态为 R 时，商户需要重定向到该URL完成部分交易，包括3ds验证
                  window.location.href = txtInfo.redirectUrl;
                  break;
              }
            } else {
              // 交易失败
              alert.error(respMsg || "Payment failed");
            }
          },
          onError: function (err) {
            //支付异常回调方法
            console.log(err);
          },
        });
      });
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
    creating,
    createOrder,
    getBillingInfo,
    polling,
  };
};

export default useOnerway;
