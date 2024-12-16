import { FORM_FIELDS } from './enums'

export const initialState = {
  isModalOpen: false,
  countries: [],
  form: {},
  // 订单创建中
  ordering: false,
  // 基础订单数据：订单号和加密公钥
  basicOrderInfo: null,
  // 订单详情：status, errorDes, statusDes, authUrl
  orderInfo: null,
  // 表单报错信息
  errorDes: ''
}

FORM_FIELDS.forEach((field) => {
  initialState.form[field] = {
    value: '',
    errorMsg: ''
  }
})

export default function reducer(state, action) {
  const { type, payload } = action
  if (type === 'OPEN_MODAL') {
    return {
      ...state,
      isModalOpen: true
    }
  } else if (type === 'CLOSE_MODAL') {
    return {
      ...state,
      ...initialState,
      isModalOpen: false
    }
  } else if (type === 'SET_COUNTRIES') {
    console.assert(payload && Array.isArray(payload), 'payload.countries is required')
    return {
      ...state,
      countries: payload
    }
  } else if (type === 'UPDATE_FORM') {
    console.assert(payload && typeof payload === 'object', 'payload must be an object')
    const { name, value } = payload
    console.assert(name in state.form, `form field ${name} does not exist`)
    return {
      ...state,
      form: {
        ...state.form,
        [name]: {
          ...state.form[name],
          ...value
        }
      }
    }
  } else if (type === 'ORDERING') {
    return {
      ...state,
      ordering: payload
    }
  } else if (type === 'UPDATE_BASIC_ORDER_INFO') {
    return {
      ...state,
      basicOrderInfo: payload
    }
  } else if (type === 'UPDATE_ORDER_INFO') {
    return {
      ...state,
      orderInfo: payload
    }
  } else if (type === 'UPDATE_PAYINFO_ERROR') {
    return {
      ...state,
      errorDes: payload
    }
  }

  return state
}
