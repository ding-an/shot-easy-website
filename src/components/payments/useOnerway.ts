import { useEffect, useState } from "react";

import { useInterval } from "ahooks";

import alert, { ToastPosition } from "@components/Toast";
import { get, post } from "@utils/request";
import { getOrderParamsFromA, getParams, goToA } from "./ab-pay";

const ORDER_STATUS = {
  NOT_FOUND: 0,
  PENDING: 2,
  PAID: 3,
  FAILED: 8,
};

export enum PAY_TYPE  {
  card,
  applepay,
  googlepay,
}

const useOnerway = () => {
  // 订单创建中
  const [creating, setCreating] = useState(false);
  // 订单详情
  const [orderInfo, setOrderInfo] = useState(null);
  // 轮询中
  const [polling, setPolling] = useState(false);
  let clean;

  const getOrderStatus = async () => {
    try {
      const { id } = orderInfo;
      setPolling(true);
      const res = await get(`/users/me/orders/${id}`);
      const data = res.data ?? {};
      const { status, statusDes } = data;

      if (status === ORDER_STATUS.PAID) {
        alert.success("payment successful", ToastPosition.TOP_CENTER, 3000);
        clean();
        location.href = "/pricing";
        // 订单失败了
      } else if (
        status === ORDER_STATUS.FAILED ||
        status === ORDER_STATUS.NOT_FOUND
      ) {
        setPolling(false);
        alert.error(statusDes, ToastPosition.TOP_CENTER, 3000);
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
  const createOrder = async (productId: string, type: PAY_TYPE) => {
    // 如果从 A 站来则从 url 解密
    const email = localStorage.getItem("fb_email");
    // @ts-ignore
    const province = window.cf_region_code || "CA";
    // @ts-ignore
    const region = window.cf_country_code || "US";
    const returnUrl = `${window.location.origin}/pricing`;

    try {
      setCreating(true);
      const res = await post("/v1/users/me/orders", {
        productId: productId,
        channel: 18,
        // @ts-ignore
        region,
        quantity: 1,
        returnUrl,
        onerwayExtra: {
          colorDepth: window.screen.colorDepth,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          javaEnabled: navigator.javaEnabled(),
          timeZoneOffset: new Date().getTimezoneOffset(),
          contentLength: 256,
          email,
          province,
          subProductType: type === PAY_TYPE.card ? 'TOKEN' : 'DIRECT'
        },
      });
      return res.data;
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

  const checkout = async (data: any, type: PAY_TYPE) => {
		try {
			const mod = await import('@lib/onerway')
			const { spOrderId, id } = data
			setCreating(false)
			const config: any = {
				locale: 'en', // en zh-cn ar de es fi fr it ja ko nl no pl pt ru sv th zh-tw
				environment: import.meta.env.PUBLIC_FIREBASE_ENV === 'staging' ? 'sandbox' : 'production', // sandbox、production
				onPaymentCompleted: function (res) {
					console.log(res)
					//成功支付后回调方法
					const txtInfo = res.data // 返回交易结果详情
					const respCode = res.respCode // 响应码
					const respMsg = res.respMsg // 响应信息
					if (respCode === '20000') {
						// respCode 为 20000 表示交易正常
						switch (
							txtInfo.status // 交易状态判断
						) {
							case 'S': // status 为 'S' 表示成功
								// 支付最终状态以异步通知结果为准

								// A 站
								if (getParams('spOrderId')) {
									goToA()
								} else {
									setOrderInfo({
										id: id,
										status: ORDER_STATUS.PENDING,
									})
								}

								break
							case 'R': // status 为 'R' 表示需要3ds验证
								// 当交易状态为 R 时，商户需要重定向到该URL完成部分交易，包括3ds验证
								window.location.href = txtInfo.redirectUrl
								break
						}
					} else {
						// 交易失败
						alert.error(respMsg || 'Payment failed')
					}
				},
				onError: function (err) {
					//支付异常回调方法
					console.log(err)
          alert.error(err.respMsg)
				},
			}
      if (type === PAY_TYPE.card) {
        config.mode = 'CARD',
        config.config = {
				  subProductType: "TOKEN", // DIRECT - 直接支付/订阅支付/预授权支付，TOKEN - 绑卡支付
				  checkoutTheme: "light", // light、dark
				  customCssURL: "", // 自定义样式链接地址，配置该值后，checkoutTheme 则无效
				  styles: {
				    ".pacypay-checkout__button--pay": {
				      "background-color": "rgb(37, 99, 235)",
				    },
				  },
				}
      } else if (type === PAY_TYPE.applepay) {
        config.mode = 'ApplePay'
        config.config = {
          applePayButtonType: 'buy', // 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'plain' | 'reload' | 'rent' | 'subscribe' | 'support' | 'tip' | 'top-up' | 'pay'
          applePayButtonColor: 'black',  // 'black' | 'white' | 'white-outline'
          buttonWidth: '100px', // 按钮宽度
          buttonHeight: '40px', // 按钮高度
          buttonRadius: '4px', // 按钮圆角边框
        }
      } else if (type === PAY_TYPE.googlepay) {
        config.mode = 'GooglePay'
        config.config = {
					googlePayButtonType: 'buy', // 'book' | 'buy' | 'checkout' | 'donate' | 'order' | 'pay' | 'plain' | 'subscribe'
					googlePayButtonColor: 'black', // 'black' | 'white'
					googlePayEnvironment: 'TEST', // TEST PRODUCTION
					buttonWidth: '100px', // 按钮宽度
					buttonHeight: '40px', // 按钮高度
					buttonRadius: '4px', // 按钮圆角边框
				}
      }
			// @ts-ignore
			new mod.default(spOrderId, config)
		} catch (error) {
			console.error('Load pacypay failed', error)
		}
	}

  clean = useInterval(
    getOrderStatus,
    // 没有明确结果就定刷订单状态
    orderInfo &&
      ![ORDER_STATUS.PAID, ORDER_STATUS.FAILED].includes(orderInfo?.status)
      ? 1000
      : undefined
  );

  useEffect(() => {
    const orderParams = getOrderParamsFromA();
    if (orderParams) {
      sessionStorage.setItem("myParams", location.search.slice(1));
      history.replaceState(null, "", location.pathname);
      checkout(orderParams, orderParams.type);
      return;
    }

    if (!localStorage.getItem("fb_email") || !localStorage.getItem("user")) {
      localStorage.removeItem("user");
      location.href = "/login";
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = Number(params.get("type")) as unknown as PAY_TYPE;
    if (!id) {
      location.href = "/pricing";
      return;
    }

    createOrder(id, type).then(data => checkout(data, type));
  }, []);

  return {
    creating,
    createOrder,
    polling,
  };
};

export default useOnerway;
