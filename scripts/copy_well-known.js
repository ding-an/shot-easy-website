/** @format */

import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()
const name = 'apple-developer-merchantid-domain-association'

const environment = process.env.PUBLIC_FIREBASE_ENV
const source = `${
	environment === 'staging' ? '.well-known/' + name + '_dev.txt' : '.well-known/' + name + '_prod.txt'
}`
const destination = `.well-known/${name}.txt`

fs.copyFile(source, destination, err => {
	if (err) throw err
	console.log('File was copied to destination')
})
