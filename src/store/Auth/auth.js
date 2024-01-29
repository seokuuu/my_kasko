import { atomWithStorage } from 'jotai/utils'

/**
 * auth 정보
 * @type {{isAuth: boolean, role: string, name: string, authorities: string[]}}
 * @param isAuth 로그인여부
 * @param name: 사용자 이름
 * @param role 사용자 구분 ( 카스코철강, 현대제철 고객사, 창고, 운송사 )
 * @param authorities 페이지 접근 권한
 */
export const initAuth = {
	isAuth: false,
	name: '',
	role: '',
	authorities: [],
}

export const authAtom = atomWithStorage('auth', initAuth)
