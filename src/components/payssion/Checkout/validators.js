/**
 * 函数是根据Luhn算法来校验信用卡号是否有效的一个JavaScript实现。
 * Luhn算法是一个简单的校验和公式，主要用于验证各类身份识别码，如信用卡号码、IMEI号等。
 * 它能够帮助检测错误输入，比如一个数字被误输或两个连续的数字被颠倒
 *
 * https://en.wikipedia.org/wiki/Payment_card_number
 */
function validateCreditCardNumber(cardNumberString) {
  if (cardNumberString.length < 12 || cardNumberString.length > 19) {
    return false
  }

  let sum = 0
  let alternate = false

  // 从卡号的最后一位开始向前遍历
  for (let i = cardNumberString.length - 1; i >= 0; i--) {
    let n = parseInt(cardNumberString[i], 10)

    if (alternate) {
      // 如果是交替位，乘以2
      n *= 2
      // 如果乘以2后的数字大于9，则减去9
      if (n > 9) {
        n -= 9
      }
    }

    // 累加数字
    sum += n
    alternate = !alternate
  }

  // 如果总和能被10整除，则卡号有效
  return sum % 10 === 0
}

// // 检测卡的类型
// function getCardType(cardNumber) {
//   // 完整匹配
//   // Visa: /^[45][0-9]{12}(?:[0-9]{3})?$/, // Visa: 以4开头，长度为13或16位
//   // MasterCard: /^5[1-5][0-9]{14}$/, // MasterCard: 以51至55开头，长度为16位
//   // AmericanExpress: /^3[47][0-9]{13}$/, // American Express: 以34或37开头，长度为15位
//   // Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/, // Discover: 以6011或65开头，长度为16位
//   // JCB: /^(?:2131|1800|35\d{3})\d{11}$/ // JCB: 以2131或1800开头，长度为15位；或以35开头，长度为16位
//   const regexPatterns = {
//     Visa: /^[45]/, // Visa: 以4/5开头
//     MasterCard: /^5[1-5]/, // MasterCard: 以51至55开头
//     AmericanExpress: /^3[47]/, // American Express: 以34或37开头
//     Discover: /^6(?:011|5)/, // Discover: 以6011或65开头
//     JCB: /^(?:2131|1800|35)/ // JCB: 以2131、1800或35开头
//   }

//   for (const cardType in regexPatterns) {
//     if (regexPatterns[cardType].test(cardNumber)) {
//       return cardType
//     }
//   }
//   return ''
// }

export const validators = {
  notEmpty: (str) => (str && str.length > 0 ? '' : 'Required field'),
  // next.js 有毒 invalid_input 找不到...
  reg: (str, reg) => (reg.test(str) ? '' : 'Invalid input'),
  email: (str) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str)
      ? ''
      : 'Invalid input',
  option: (str, options) => {
    if (!options.length && !str) {
      return 'v'
    }

    return options.includes(str) ? '' : 'Invalid option'
  },
  cardNumber: (str) => {
    str = str.replace(/\s+/g, '') // 去除空格

    if (validateCreditCardNumber(str)) {
      return ''
    } else {
      return 'Invalid card number'
    }
  }
}
