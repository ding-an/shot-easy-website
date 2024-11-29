/** @format */

import Button from './Button'
import { useStore } from './store'
import useHandlers from './useHandlers'

export default function OrderButton() {
	const { openModal } = useHandlers()
	const { ordering } = useStore()

	return (
		<Button
			loading={ordering}
			onClick={() => {
				const user = localStorage.getItem('user')
				if (!user) {
					const login = document.getElementById('login')
					login.click()
				} else {
					openModal()
				}
			}}
		/>
	)
}
