import { ORDER_STATUS } from './enums'

export interface IOrderDetail {
  status: ORDER_STATUS
  errorDes: string
}


export interface IOrder {
  clientSecret: string
  spOrderId: string
  id: string
}
