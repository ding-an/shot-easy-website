/** @format */

import { useEffect, useState } from 'react'
import { get } from '@utils/request'
import PayssionSelect from '@components/payssion/PayssionSelect'
import useHandlers from './payssion/hooks/useHandlers'
import PaymentNet from '@components/paymentNet'
import Airwallex from './pricing/Airwallex'
import AirwallexCallback from './pricing/Airwallex/Callback'
import Asiapay from '@components/Asiapay'

const features = [
	['Individual configuration', 'No setup, or hidden fees', 'Credits'],
	['Supports Up to 2 Devices/Users', 'No setup, or hidden fees', 'Credits'],
	[
		'Supports Up to 10 Devices/Users',
		'No setup, or hidden fees',
		'Credits',
		'API Batch Processing',
		'24/7 Dedicated Customer Support',
	],
]
const features2 = [
	['Individual configuration', 'No setup, or hidden fees', 'Credits'],
	[
		'Supports Up to 10 Devices/Users',
		'No setup, or hidden fees',
		'Credits',
		'API Batch Processing',
		'24/7 Dedicated Customer Support',
	],
]

function FeatureItems({ product, index }) {
	return (
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
				<span>{features[index][0]}</span>
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
				<span>{features[index][1]}</span>
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
			{features[index][3] && (
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
					<span>{features[index][3]}</span>
				</li>
			)}
			{features[index][4] && (
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
					<span>{features[index][4]}</span>
				</li>
			)}
		</ul>
	)
}
function FeatureItems2({ product, index }) {
	return (
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
				<span>{features2[index][0]}</span>
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
				<span>{features2[index][1]}</span>
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
				<span>{product.credits} Credits /month</span>
			</li>
			{features2[index][3] && (
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
					<span>{features2[index][3]}</span>
				</li>
			)}
			{features2[index][4] && (
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
					<span>{features2[index][4]}</span>
				</li>
			)}
		</ul>
	)
}

export default function PricingCard() {
	const [products, setProducts] = useState([])
	const [preminumProducts, setPremiumProducts] = useState([])
	const [product, setProduct] = useState(null)
	const [activedKey, setActivedKey] = useState(1)
	const handlers = useHandlers()
	const { setVisible } = handlers

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
					title: 'Business Package',
					desc: 'Best for large scale uses and extended redistribution rights.',
				},
			]
			setProducts(
				data.map((product, index) => ({
					...product,
					...(extraInfo[index] || {}),
				}))
			)
		})
		get(`/products`, { type: 0 }).then(({ data }) => {
			const extraInfo = [
				{
					title: '1 month',
					desc: 'Best option for personal use & for your next project.',
				},
				{
					title: '12 months',
					desc: 'Relevant for multiple users, extended & premium support.',
				},
			]
			setPremiumProducts(
				data.map((product, index) => ({
					...product,
					...(extraInfo[index] || {}),
				}))
			)
		})
	}, [])

	return (
		<>
			<Tabs
				activedKey={activedKey}
				onClick={value => {
					setActivedKey(value)
				}}
			/>
			<div className='space-y-8 lg:flex sm:gap-3 xl:gap-5 lg:space-y-0 min-h-[500px] justify-center'>
				{(activedKey === 1 ? products : preminumProducts).map((product, index) => (
					<div
						key={product.id}
						className='flex flex-col p-3 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white'
					>
						<h3 className='mb-4 text-2xl font-semibold'>{product.title}</h3>
						<p className='font-light text-gray-500 sm:text-lg dark:text-gray-400'>{product.desc}</p>
						<div className='flex justify-center items-baseline my-8'>
							<span className='mr-2 text-5xl font-extrabold'>
								${product?.discount?.price || product.price}
							</span>
						</div>
						{product?.discount?.description && (
							<div className='font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-2 -mt-6'>
								{product?.discount?.description}
							</div>
						)}
						{activedKey === 1 ? (
							<FeatureItems product={product} index={index} />
						) : (
							<FeatureItems2 product={product} index={index} />
						)}

						<div className='flex flex-col gap-2 mt-auto'>
							<Asiapay product={product} />
							<PaymentNet product={product} />
							<Airwallex product={product}/>
							{/* <a
								href={`/pricing/onerway?id=${product.id}&type=${PAY_TYPE.applepay}&name=${
									product.name
								}&price=${product?.discount?.price || product.price}`}
								className='text-white flex gap-2 justify-center items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
								onClick={() => {
									const user = localStorage.getItem('user')
									if (!user) {
										const login = document.getElementById('login')
										login.click()
									}
								}}
							>
								Pay with <Apple />
							</a>
							<a
								href={`/pricing/onerway?id=${product.id}&type=${PAY_TYPE.googlepay}&name=${
									product.name
								}&price=${product?.discount?.price || product.price}`}
								className='text-white flex gap-2 justify-center items-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
								onClick={() => {
									const user = localStorage.getItem('user')
									if (!user) {
										const login = document.getElementById('login')
										login.click()
									}
								}}
							>
								Pay with <Google />
							</a> */}
							<a
								href='#'
								className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900'
								onClick={() => {
									const user = localStorage.getItem('user')
									if (!user) {
										const login = document.getElementById('login')
										login.click()
									} else {
										setVisible(true)
										setProduct(product)
									}
								}}
							>
								Pay with wallet
							</a>
						</div>
					</div>
				))}
			</div>
			<PayssionSelect {...handlers} product={product} />
			<AirwallexCallback />
		</>
	)
}

const Google = () => (
	<svg width='72' height='24' viewBox='0 0 72 24' xmlns='http://www.w3.org/2000/svg'>
		<g fillRule='nonzero' fill='none'>
			<path
				d='M38.557 1.933c-2.043-.165-4.094-.036-6.142-.065-.08 0-.165-.002-.185.055v16.56h2.032v-6.73c.225 0 .386.004.546 0 1.26-.032 2.52.054 3.78-.054 2.137-.182 4.543-2.157 4.45-5.067-.084-2.564-2.326-4.524-4.48-4.699zm-.077 7.784a3.777 3.777 0 0 1-.654.057h-3.544V3.941c.111-.117.246-.088.369-.086 1.144.01 2.289.013 3.433.04 1.412.032 2.712 1.258 2.808 2.626.111 1.58-.914 2.932-2.412 3.195zm12.662-2.132c-1.135-.721-2.403-.863-3.702-.783-1.018.064-1.977.353-2.814.969-.447.33-.838.712-1.15 1.203l1.803 1.127c1.326-1.76 3.296-1.708 4.376-1.112 1.087.599 1.669 1.716 1.435 2.801-.037.002-.05.006-.059.003-.043-.015-.086-.029-.129-.047-1.719-.748-3.486-.813-5.244-.222-2.659.895-3.108 3.506-2.148 5.26 1.3 2.375 5.348 2.996 7.214.485.09-.122.153-.284.385-.337v1.535h1.963c.012-.078.023-.123.023-.169-.003-2.454.039-4.91-.028-7.362-.04-1.416-.698-2.572-1.925-3.351zm-2.664 9.343c-.894.221-1.743.145-2.506-.42-.917-.68-1.027-1.9-.244-2.732.443-.471 1.001-.733 1.628-.857a5.238 5.238 0 0 1 3.055.293c.246.1.477.23.684.428.074 1.422-1.124 2.92-2.617 3.288zM62.6 7.2l-3.305 8.163-.11-.016-3.378-8.154h-2.255c1.577 3.581 3.13 7.11 4.687 10.64l-2.64 5.718h2.136l7.137-16.406c-.81.012-1.534-.02-2.272.055z'
				fill='#FFF'
			/>
			<path
				d='M10.72 10.038c0-.622.09-1.223.26-1.788L7.773 5.718a9.498 9.498 0 0 0-1.013 4.285c0 1.54.363 3.012 1.007 4.32l3.21-2.521a6.12 6.12 0 0 1-.256-1.764z'
				fill='#FFB900'
			/>
			<path
				d='M16.487 4.27a5.26 5.26 0 0 1 3.54 1.446l2.645-2.758c-1.6-1.56-3.777-2.508-6.29-2.508a9.61 9.61 0 0 0-8.61 5.268L10.98 8.25c.702-2.33 2.767-4.042 5.507-3.98z'
				fill='#FE2727'
			/>
			<path
				d='M16.487 15.804c-2.747 0-4.814-1.68-5.51-4.002l-3.21 2.522c1.577 3.207 4.843 5.437 8.616 5.302 2.655-.095 4.794-.919 6.333-2.333l-3.105-2.355c-.852.583-1.917.866-3.124.866z'
				fill='#00AC47'
			/>
			<path
				d='M16.279 8.3v3.683h5.25c-.334 1.35-1.003 2.327-1.918 2.954l3.105 2.355c1.822-1.676 2.804-4.181 2.804-7.29 0-.58-.046-1.15-.134-1.702'
				fill='#2485FC'
			/>
		</g>
	</svg>
)

const Apple = () => (
	<svg
		width='72'
		height='24'
		x='0'
		y='3.85'
		viewBox='0 0 105 43'
		version='1.1'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
	>
		<title>Apple Logo</title>
		<g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
			<g fill='#FFF'>
				<path d='M19.4028,5.5674 C20.6008,4.0684 21.4138,2.0564 21.1998,0.0004 C19.4458,0.0874 17.3058,1.1574 16.0668,2.6564 C14.9538,3.9414 13.9688,6.0374 14.2258,8.0074 C16.1948,8.1784 18.1618,7.0244 19.4028,5.5674'></path>
				<path d='M21.1772,8.3926 C18.3182,8.2226 15.8872,10.0156 14.5212,10.0156 C13.1552,10.0156 11.0642,8.4786 8.8022,8.5196 C5.8592,8.5626 3.1282,10.2276 1.6342,12.8746 C-1.4378,18.1696 0.8232,26.0246 3.8112,30.3376 C5.2622,32.4716 7.0102,34.8206 9.3142,34.7366 C11.4912,34.6506 12.3442,33.3266 14.9902,33.3266 C17.6352,33.3266 18.4042,34.7366 20.7082,34.6936 C23.0972,34.6506 24.5922,32.5586 26.0422,30.4226 C27.7072,27.9906 28.3882,25.6426 28.4312,25.5126 C28.3882,25.4706 23.8232,23.7186 23.7812,18.4676 C23.7382,14.0706 27.3652,11.9786 27.5362,11.8496 C25.4882,8.8196 22.2872,8.4786 21.1772,8.3926'></path>
				<path d='M85.5508,43.0381 L85.5508,39.1991 C85.8628,39.2421 86.6158,39.2871 87.0158,39.2871 C89.2138,39.2871 90.4558,38.3551 91.2108,35.9581 L91.6548,34.5371 L83.2428,11.2321 L88.4368,11.2321 L94.2958,30.1421 L94.4068,30.1421 L100.2668,11.2321 L105.3278,11.2321 L96.6048,35.7141 C94.6078,41.3291 92.3208,43.1721 87.4828,43.1721 C87.1048,43.1721 85.8838,43.1271 85.5508,43.0381'></path>
				<path d='M42.6499,19.3555 L48.3549,19.3555 C52.6829,19.3555 55.1469,17.0255 55.1469,12.9855 C55.1469,8.9455 52.6829,6.6375 48.3769,6.6375 L42.6499,6.6375 L42.6499,19.3555 Z M49.6869,2.4425 C55.9009,2.4425 60.2289,6.7265 60.2289,12.9625 C60.2289,19.2225 55.8129,23.5285 49.5309,23.5285 L42.6499,23.5285 L42.6499,34.4705 L37.6779,34.4705 L37.6779,2.4425 L49.6869,2.4425 Z'></path>
				<path d='M76.5547,25.7705 L76.5547,23.9715 L71.0287,24.3275 C67.9207,24.5275 66.3007,25.6815 66.3007,27.7015 C66.3007,29.6545 67.9887,30.9195 70.6287,30.9195 C74.0027,30.9195 76.5547,28.7665 76.5547,25.7705 M61.4617,27.8345 C61.4617,23.7285 64.5917,21.3755 70.3627,21.0205 L76.5547,20.6425 L76.5547,18.8675 C76.5547,16.2705 74.8457,14.8495 71.8057,14.8495 C69.2967,14.8495 67.4777,16.1375 67.0997,18.1125 L62.6167,18.1125 C62.7497,13.9615 66.6567,10.9435 71.9387,10.9435 C77.6207,10.9435 81.3267,13.9175 81.3267,18.5345 L81.3267,34.4705 L76.7327,34.4705 L76.7327,30.6305 L76.6217,30.6305 C75.3127,33.1395 72.4267,34.7145 69.2967,34.7145 C64.6807,34.7145 61.4617,31.9625 61.4617,27.8345'></path>
			</g>
		</g>
	</svg>
)

const Tabs = ({ activedKey, onClick }) => {
	// 菜单
	const tabs = [
		{ label: 'Credits Package', value: 1 },
		{ label: 'Premium Plan', value: 0 },
	]
	return (
		<ul className='flex h-20 w-full space-x-6 font-bold text-3xl justify-center mb-4'>
			{tabs.map(({ label, value }) => (
				<li
					key={value}
					className={`relative flex h-full cursor-pointer items-center font-bold text-gray-900`}
					onClick={() => {
						onClick(value)
					}}
				>
					{label}
					{activedKey === value && (
						<div className='absolute bottom-[10px] left-1/2 h-[6px] w-20 -translate-x-1/2 bg-primary-600'></div>
					)}
				</li>
			))}
		</ul>
	)
}
