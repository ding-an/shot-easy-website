/** @format */

import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url)
	// 以reference = 一串数字结尾的正则
	const regex = /reference=\d+$/
	// payment.net失败会带上这一串，重定向
	if (regex.test(url.search)) {
		return context.redirect(`/pricing?status=failed`, 308)
	}
	if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
		url.pathname += '/'
		return context.redirect(url.toString(), 301)
	}
	return next()
})
