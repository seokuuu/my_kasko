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
  // const jsonData = { request: data }
  // console.log(jsonData)
  console.log(data)
  const form = new FormData()
  form.append(
    // request라는 키에 value를 두번째인자로
    'request',
    //이미지가 포함된 파일에서 바이너리로 서버로 보낼때 사용
    new Blob([JSON.stringify(data)], {
      type: 'application/json',
    }),
  ) //request: 바이너리형태
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
