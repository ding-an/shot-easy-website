// airwallex 订单状态
export enum ORDER_STATUS {
  PENDING = 2,
  PAID = 3,
  FAILED = 8
}

export enum PRODUCT_TYPE {
  SUBSCRIPTION = 0,
  PRODUCT = 1
}

// 付款类型
export enum PAYMENT_TYPE {
  COMMON = -1,
  APPLE_IAP,
  GOOGLE_PLAY,
  WECHAT_PAY,
  PAYPAL,
  STRIPE,
  COINBASE,
  AIRWALLEX = 8,
  PAYSSION = 9,
  PAYERMAX = 14,
  FASTSPRING = 15,
  PAYMENT_WALL = 17,
  APG = 20
}