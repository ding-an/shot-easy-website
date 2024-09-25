/** @format */

import { useEffect, useRef, useState } from 'react'
import { post } from '@utils/request'

// 获取验证码（非登录态）
export async function getEmailCode(params: { bizType: number; email: string }) {
	const json = await post('/verification-codes/email', params)
	return json
}
// 获取验证码（登录态）
export async function getEmailCodeLogin(params: { bizType: number }) {
	const json = await post('/users/me/verification-codes/email', params)
	return json
}

function validateEmail(email: string) {
	// 邮箱验证正则 - 有@就行
	const reg = /@+/
	return reg.test(email)
}

export default function VerificationCode({
	disabled,
	email,
	authTips,
	setAuthTips,
	authTipsType,
	setAuthTipsType,
	handleChange,
}) {
	const timerRef = useRef(null)
	const inputRef = useRef(null)
	const [isSendCode, setIsSendCode] = useState(false)
	const [timerNumber, setTimerNumber] = useState(0)

	// 发送验证码
	const handleSendCode = async () => {
		if (!email) {
			return
		}
		if (!validateEmail(email)) {
			setAuthTips('Wrong email format.')
			setAuthTipsType('verification')
			return
		}
		if (disabled || timerRef.current || isSendCode) return

		try {
			setTimerNumber(60)
			setIsSendCode(true)
			const { success, errorMsg } = await getEmailCode({ bizType: 0, email })
			if (!success) {
				setIsSendCode(false)
				setTimerNumber(0)
				alert(errorMsg)
			}
		} catch (error) {
			setIsSendCode(false)
			setTimerNumber(0)
			clearInterval(timerRef.current)
			timerRef.current = null
			if (error.code === 147) {
				setAuthTips(error.message)
				setAuthTipsType('verification')
			} else {
				alert(error.message)
			}
		}
	}
	// 倒计时
	useEffect(() => {
		if (isSendCode) {
			timerRef.current = setTimeout(() => {
				setTimerNumber(timerNumber - 1)
				if (timerNumber <= 0) {
					setTimerNumber(0)
					setIsSendCode(false)
					clearInterval(timerRef.current)
					timerRef.current = null
				}
			}, 1000)
		}
	}, [isSendCode, timerNumber])

	const setValue = e => {
		const value = e.target.value + ''
		inputRef.current.value = value.length > 6 ? value.slice(0, 6) : value
	}

	return (
		<div className='relative mb-4 flex h-full'>
			<input
				ref={inputRef}
				type='number'
				autoComplete='new-password'
				maxLength={6}
				placeholder='Verification code'
				onInput={setValue}
				onChange={handleChange}
				required
				disabled={disabled}
				className={`h-12 w-0 flex-1 rounded-l-full border-blue-600 bg-blue-100 px-4 text-base text-black outline-none placeholder:text-black/40 focus-visible:border ${
					disabled ? 'pointer-events-none' : ''
				} ${authTipsType === 'verification' ? 'border-2 border-red' : ''}`}
				style={authTips?.text ? { border: '1px solid red' } : null}
			/>
			<div
				className={`h-12 w-[109px] cursor-pointer select-none whitespace-nowrap rounded-r-full px-4 text-center leading-[48px] ${
					email && !isSendCode && !disabled
						? 'border-blue-600 bg-blue-600'
						: ' pointer-events-none bg-[#6a6b70]'
				}`}
				onClick={handleSendCode}
			>
				<span
					className={`text-sm font-medium text-white ${
						email && !isSendCode ? 'opacity-95' : 'opacity-[.48]'
					}`}
				>
					{isSendCode ? `${timerNumber}s resend` : 'Send Code'}
				</span>
			</div>
		</div>
	)
}
