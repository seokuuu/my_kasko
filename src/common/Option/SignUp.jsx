import Select from 'react-select'
import { styled } from 'styled-components'

export const depositOptions = [
	{ value: 'ask0', label: '직함 선택 ' },
	{ value: 'ask1', label: '1' },
	{ value: 'ask2', label: '2' },
	{ value: 'ask3', label: '3' },
	{ value: 'ask4', label: '4' },
]

export const accountOptions = [
	{ value: 'ask0', label: '은행 선택' },
	{ value: 'ask1', label: '1' },
	{ value: 'ask2', label: '2' },
	{ value: 'ask3', label: '3' },
	{ value: 'ask4', label: '4' },
]
export const emailOptions = [
	{ value: 'ask0', label: '도메인 선택' },
	{ value: 'ask1', label: 'naver.com' },
	{ value: 'ask2', label: 'gmail.com' },
	{ value: 'ask3', label: 'kakao.com' },
	{ value: 'ask4', label: 'nate.com' },
]
// 직접 입력 값을 포함한 이메일 도메인 옵션값들
export const emailOptionsIncludingDirect = [
	...emailOptions,
	{
		value: 'directWrite',
		label: '직접 입력',
	},
]

// 창고 구분
export const storageOptions = [
	{ value: 'ask0', label: '창고' },
	{ value: 'ask1', label: '1' },
	{ value: 'ask2', label: '2' },
	{ value: 'ask3', label: '3' },
	{ value: 'ask4', label: '4' },
]

// FAQ
export const faqOptions = [
	{ value: 'ask0', label: '경매' },
	{ value: 'ask1', label: '상시판매' },
	{ value: 'ask2', label: '입금' },
	{ value: 'ask3', label: '출고' },
	{ value: 'ask4', label: '기타' },
]

export const DefaultSelect = styled(Select)`
	width: 120px;
	text-align: center;
	line-height: 26px;
	margin-right: 5px;
`

export const EmailSelect = styled(Select)`
	width: 200px;
	text-align: center;
	line-height: 26.5px;
`

export const AccountSelect = styled(Select)`
	width: 320px;
	text-align: center;
	line-height: 26.5px;
`

export const EditSelect = styled(Select)`
	width: 140px;
	text-align: center;
	line-height: 26px;
	margin-right: 5px;
	font-size: 16px;
`
