import { useCallback } from 'react'


import { PRODUCT_TYPE } from './enums'
import Button from './Button'
import useHandlers from './useHandlers'

const Airwallex = ({ product }) => {
  const { createAirwallexOrder, ordering } = useHandlers()
  const user = JSON.parse(localStorage.getItem('user'));
  const order = useCallback(() => {
    if (!user) {
      const login = document.getElementById('login')
      login.click()
      return
    }
    createAirwallexOrder({
      product,
      productType: user?.isVip ? PRODUCT_TYPE.PRODUCT : PRODUCT_TYPE.SUBSCRIPTION
    })
  }, [createAirwallexOrder, product, user?.isVip])

  return (
    <>
      <Button loading={ordering} onClick={order} />
    </>
  )
}

export default Airwallex
