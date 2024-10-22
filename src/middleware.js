/** @format */

import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
	const url = new URL(context.request.url)
	const geo = context.request.geo || {}
	const countryCode = geo.country || 'GB'
	// 设置 Cookie
	context.cookies.set('countryCode', countryCode)
	if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
		url.pathname += '/'
		return context.redirect(url.toString(), 301)
	}
	return next()
})
