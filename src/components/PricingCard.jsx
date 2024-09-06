/** @format */

import { useEffect, useState, useRef } from 'react'
import { get } from '@utils/request'
import PayssionSelect from '@components/payssion/PayssionSelect'
import usePaddlesHandlers from './paddle/hooks/useHandlers'
import useHandlers from './payssion/hooks/useHandlers'
import { Spin } from 'antd'

export default function PricingCard() {
	const [products, setProducts] = useState([])
	const [product, setProduct] = useState(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const loginRef = useRef(null)
	const handlers = useHandlers()
	const { setVisible } = handlers
	const { createOrder, creating } = usePaddlesHandlers()

	useEffect(() => {
		get(`/products`, { type: 1 }).then(({ data }) => {
			const extraInfo = [
				{
					title: 'Starter Package',
					desc: 'Best option for personal use & for your next project.',
				},
				{
					title: 'Basic Package',
					desc: 'Relevant for multiple users, extended & premium support.',
				},
				{
					title: 'Premium Package',
					desc: 'Best for large scale uses and extended redistribution rights.',
				},
			]
			setProducts(data.map((product, index) => ({ ...product, ...(extraInfo[index] || {}) })))
		})
	}, [])

	return (
		<>
			<div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-3 xl:gap-5 lg:space-y-0'>
				{products.map((product, index) => (
					<div
						key={product.id}
						className='flex flex-col p-3 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white'
					>
						<h3 className='mb-4 text-2xl font-semibold'>{product.title}</h3>
						<p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>{product.desc}</p>
						<div className='flex justify-center items-baseline my-8'>
							<span className='mr-2 text-5xl font-extrabold'>
								${product?.discount?.price || product.price}
							</span>
						</div>
						<ul role='list' className='mb-8 space-y-4 text-left text-sm'>
							<li className='flex items-center space-x-3'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
								<span>Individual configuration</span>
							</li>
							<li className='flex items-center space-x-3'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
								<span>No setup, or hidden fees</span>
							</li>
							<li className='flex items-center space-x-3'>
								<svg
									className='flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
										clipRule='evenodd'
									></path>
								</svg>
								<span>{product.credits} Credits</span>
							</li>
						</ul>
						<div className='flex flex-col gap-2'>
							<a
								href='#'
								className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
								onClick={() => {
									const user = localStorage.getItem('user')
									if (!user) {
										loginRef.current.click()
									} else {
										setVisible(true)
										setProduct(product)
									}
								}}
							>
								Get started by Payssion
							</a>
							<a
								href='#'
								className={`text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900 ${
									creating && index === currentIndex && 'cursor-not-allowed'
								}`}
								onClick={() => {
									const user = localStorage.getItem('user')
									if (!user) {
										loginRef.current.click()
									} else {
										createOrder(product)
										setCurrentIndex(index)
									}
								}}
							>
								{creating && index === currentIndex ? <Spin /> : 'Get started by Paddle'}
							</a>
						</div>
					</div>
				))}
			</div>
			<a ref={loginRef} href='/continue-with-google/' title=''></a>
			<PayssionSelect {...handlers} product={product} />
		</>
	)
}
