// checkout 订单状态
export const ORDER_STATUS = {
  PENDING: 2,
  DETECTED: 10,
  WAIT_AUTH: 11,
  PAID: 3,
  FAILED: 8
}

export const FORM_FIELDS =
  'first_name,last_name,country_name,postal_code,state_name,city,address_line1,address_line2,email,phone,prefix'.split(
    ','
  )

export const PRODUCT_TYPE = {
  SUBSCRIPTION: 0,
  PRODUCT: 1
}

export const supportedCurrencies = [
  'de',
  'at',
  'ch',
  'no',
  'se',
  'fi',
  'be',
  'dk',
  'nl',
  'gb',
  'fr',
  'it',
  'pl',
  'pt',
  'es'
]
