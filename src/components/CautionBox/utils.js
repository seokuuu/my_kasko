import { jwtDecode } from 'jwt-decode'
import { CAUTION_EDIT_AUTH } from './constants'

/**
 * @constant 유저 토큰 키
 */
const TOKEN_STORAGE_KEY = 'accessToken'

/**
 * @constant 카스코철강
 */
const KASKO = '카스코철강'

/**
 * 편집권한 확인 함수
 * @param cateogry CAUTION_CATEGORY
 * @returns {boolean} 편집권한 소유 여부
 */
export function getHasEditAuth(cateogry) {
	const token = localStorage.getItem(TOKEN_STORAGE_KEY)
	const editAuthArr = CAUTION_EDIT_AUTH[cateogry]

	if (!token || !editAuthArr) {
		return false
	}
	const auth = jwtDecode(token)['auth']

	if (!auth) {
		return false
	} else {
		const authArr = auth.split(',')
		const role = authArr[0]
		const categoryAuth = authArr.slice(1)
		const hasAuth = role === KASKO && categoryAuth.filter((v) => editAuthArr.includes(v)).length > 0
		return hasAuth
	}
}
