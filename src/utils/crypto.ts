/**
 * NOTE
 * jsencrypt 不支持 SSR
 * 需要动态加载本模块，参考 signup.js
 *
 * @format
 */

import JSEncrypt from 'jsencrypt'
import cjsha256 from 'crypto-js/sha256'

export const sha256 = cjsha256

let encryptor

/**
 * RSA 设置公钥
 * @param val 公钥
 */
export function setPublicKey(val) {
	if (!encryptor) {
		encryptor = new JSEncrypt()
	}
	encryptor.setPublicKey(val)
}

/**
 * RSA 加密
 * @param data 待加密数据
 * @returns {PromiseLike<ArrayBuffer>} 返回加密字符串
 */
export function rsaEncrypt(data) {
	if (!encryptor) {
		encryptor = new JSEncrypt()
	}
	return encryptor.encrypt(data)
}
