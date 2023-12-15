import { client } from './index'

const urls = {
  idDuplication: '/main/id',
  businessNumberDuplication: '/main/business-number',
  signup: '/main/join',
  login: '/main/login',
  findId: '/main/find-id',
  resetPw: '/main/reset-pw',
  refresh: '/refresh',
  updateCustomer: '/member/privacy',
  postDestination: '/member/destination',
}
const headers = { 'Content-Type': 'multipart/form-data' }
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
export async function signup(data, bankBookFile, registrationFile) {
  // const jsonData = { request: data }
  // console.log(jsonData)
  console.log(data)
  const form = new FormData()
  form.append(
    'request',
    new Blob([JSON.stringify(data)], {
      type: 'application/json',
    }),
  )

  registrationFile.forEach((file) => {
    form.append('registrationFile', file)
  })
  bankBookFile.forEach((file) => {
    form.append('bankBookFile', file)
  })

  return await client.post(urls.signup, form, { headers }) //파싱형태 백엔드랑 상의필요
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
