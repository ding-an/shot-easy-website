/** @format */

import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
const name = 'apple-developer-merchantid-domain-association'

const environment = process.env.PUBLIC_FIREBASE_ENV
const source = `${
	environment === 'staging'
		? 'public/.well-known/' + name + '_dev.txt'
		: 'public/.well-known/' + name + '_prod.txt'
}`
const destination = `public/.well-known/${name}.txt`

// 读取文件内容
fs.readFile(source, 'utf8', (err, data) => {
	if (err) {
		console.error('读取文件时出错:', err)
		return
	}
	fs.writeFile(destination, data, err => {
		if (err) throw err
		console.log('File was copied to destination')
	})
})
