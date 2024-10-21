import { useMemoizedFn } from 'ahooks'

import Button from './Button'
import { useStore } from './store'
import useHandlers from './useHandlers'

export default function OrderButton({ product, payment }) {
  const { getBillingAddress } = useHandlers()
  const { ordering } = useStore()

  const open = useMemoizedFn(() => {
    getBillingAddress(product, payment)
  })

  return <Button loading={ordering} onClick={open} />
}
