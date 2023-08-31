import { client } from './index'

const urls = {
  idDuplication: '/main/id',
  businessNumberDuplication: '/main/business-number',
  signup: '/main/join',
  login: '/main/login',
  findId: '/main/find-id',
  resetPw: '/main/reset-pw',
  refresh: '/refresh',
}

/* ==============================
    아이디 중복체크
============================== */
export function idDuplication(data) {
  return client.post(`${urls.idDuplication}/${data}`)
}

/* ==============================
    사업자 중복체크
============================== */
export function businessNumberDuplication(data) {
  return client.post(`${urls.businessNumberDuplication}?businessNumber=${data}`)
}

/* ==============================
    회원가입
============================== */
export function signup(data) {
  return client.post(urls.signup, data)
}

/* ==============================
    로그인
============================== */
export function login(data) {
  return client.post(urls.login, data)
}

/* ==============================
    아이디 찾기
============================== */
export function findById(data) {
  return client.post(urls.findId, data)
}

/* ==============================
    비밀번호 재발급
============================== */
export function resetPw(data) {
  return client.post(urls.resetPw, data)
}

/* ==============================
    리플레쉬 토큰
============================== */
export function refresh(refreshToken) {
  return client.refresh(urls.login, {
    headers: { RefreshToken: `Bearer ${refreshToken}` },
  })
}
