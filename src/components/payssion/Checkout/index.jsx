/** @format */

import Modal from './Modal'
import OrderButton from './OrderButton'
import { StoreProvider } from './store'
import LoadingMask from './LoadingMask'

export default function Checkout({ product, payment }) {
	return (
		<StoreProvider>
			<OrderButton product={product} payment={payment} />
			<Modal product={product} payment={payment} />
			<LoadingMask />
		</StoreProvider>
	)
}
