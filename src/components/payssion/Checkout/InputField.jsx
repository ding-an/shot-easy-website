/** @format */

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { useDispatch, useStore } from './store'

const InputField = (
	{
		placeholder,
		name,
		alwayShowPlaceholder = true,
		type = 'text',
		validator = null,
		list = '',
		datalist = [],
		...rest
	},
	ref
) => {
	const { form } = useStore()
	const [paddingLeft, setPaddingLeft] = useState(68)
	const prefixRef = useRef(null)
	const { value, errorMsg } = form[name] || {}

	useEffect(() => {
		prefixRef.current?.clientWidth && setPaddingLeft(prefixRef.current?.clientWidth + 68)
	}, [prefixRef.current?.clientWidth])

	const dispatch = useDispatch()
	const onInput = useCallback(
		e => {
			dispatch({
				type: 'UPDATE_FORM',
				payload: {
					name,
					value: {
						value: e.target.value.trim(),
						errorMsg: validator?.(e.target.value) || '',
					},
				},
			})
		},
		[dispatch, name, validator]
	)
	const inputStyle = alwayShowPlaceholder && (value || name === 'phone_number') ? 'pt-[19px]' : ''
	const borderColor = errorMsg
		? 'border-[#fc4041] focus:border-[#fc4041]'
		: 'border-black/40 focus:border-[#2679ff]'

	return (
		<div className='relative w-full text-black-95'>
			<div className='relative'>
				<input
					type={type}
					name={name}
					placeholder={name !== 'phone_number' && placeholder}
					style={
						name === 'phone_number'
							? {
									paddingLeft,
							  }
							: {}
					}
					className={`h-12 w-full rounded-2xl border pl-3 text-[14px] leading-4 placeholder-gray-400 outline-0 focus:outline-0 xl:pl-4 ${inputStyle} ${borderColor}`}
					list={list}
					{...rest}
					onInput={onInput}
					ref={ref}
				/>
				<datalist id={list} className='bg-[#3c3d40]'>
					{datalist.map((item, index) => (
						<option key={index} value={item} className='bg-[#3c3d40]'>
							{item}
						</option>
					))}
				</datalist>
			</div>

			{alwayShowPlaceholder && (value || name === 'phone_number') && (
				<span
					className={`${
						name === 'phone_number' ? 'left-16' : 'left-4'
					} absolute top-2 text-xs leading-[14px] text-black-48`}
				>
					{placeholder}
				</span>
			)}
			{errorMsg && (
				<div className='ml-[1px] mt-1 text-xs leading-[14px] text-[#fc4041]'>{errorMsg}</div>
			)}
		</div>
	)
}

export default forwardRef(InputField)
