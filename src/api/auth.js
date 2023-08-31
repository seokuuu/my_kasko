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
export async function signup(data) {
  const dataObj = { request: data }
  console.log(dataObj)
  const form = new FormData()

  // form.append('request', JSON.stringify(data))
  form.append(
    // request라는 키에 value를 두번째인자로
    'request',
    data,
    new Blob([JSON.stringify(data)], {
      //이미지가 포함된 파일에서 바이너리로 서버로 보낼때 사용
      type: 'application/json',
    }),
  )
  return await client.post(urls.signup, JSON.stringify(dataObj), { headers })
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
