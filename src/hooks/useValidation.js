import { useState, useEffect } from 'react'
import {
  koreanEnglishRegex,
  phoneRegex,
  faxRegex,
  addressRegex,
  nameRegex,
  mixedStringRegex,
  numberEnglishRegex,
  koreanAccountNumberRegex,
} from '../common/Regex/Regex'

const validateMsg = {
  name: '내용을 확인해주세요.',
  ceoName: '내용을 확인해주세요.',
  phone: '올바른 번호가 아닙니다.',
  fax: '올바른 번호가 아닙니다.',
  addressDetail: '주소를 정확히 입력해 주세요.', // 주소
  depositManagerName: '내용을 확인해 주세요.',
  depositManagerPhone: '올바른 번호가 아닙니다.',
  memberName: '내용을 확인해 주세요',
  memberEmail: '내용을 입력해 주세요.',
  actionPhoneNum: '올바른 번호가 아닙니다.',
  businessChoice: '버튼을 선택해 주세요.',
  businessNumber: '올바른 번호가 아닙니다.',
  businessfile: '파일을 첨부해 주세요.', // 사업자 등록증
  businessBankAddress: '파일을 첨부해 주세요.', // 통장사본
  accountNumber: '올바른 번호가 아닙니다.',
  releaseManagerName: '내용을 확인해 주세요.',
  releaseManagerPhone: '올바른 번호가 아닙니다',
}

// 비활성 useState로 추가!?
export const useValidation = (inputObj) => {
  const { name, text } = inputObj
  const check = Object.keys(validateMsg).find((value) => value === name) //name or undefined

  if (!koreanEnglishRegex.test(text) && ['name', 'ceoName', 'releaseManagerName', 'memberName'].includes(check))
    return validateMsg[check]

  if (!phoneRegex.test(text) && ['phone'].includes(check)) return validateMsg[check]

  if (!faxRegex.test(text) && ['fax'].includes(check)) return validateMsg[check]

  if (!addressRegex.test(text) && ['addressDetail'].includes(check)) return validateMsg[check]

  if (!nameRegex.test(text) && ['depositManagerName', 'depositManagerName'].includes(check)) return validateMsg[check]

  if (!numberEnglishRegex.test(text) && ['memberEmail'].includes(check)) return validateMsg[check]

  if (!text && ['businessfile', 'businessBankAddress'].includes(check)) return validateMsg[check]

  if (!koreanAccountNumberRegex.test(text) && ['accountNumber'].includes(check)) return validateMsg[check]

  return
}
