import axios from 'axios'

const API_PATH = process.env.REACT_APP_API_URL
// const API_PATH = 'http://localhost:8080/api'

// 폼 데이터 헤더
export const formHeaders = { 'Content-Type': 'multipart/form-data' }

export const client = axios.create({
  baseURL: API_PATH,
  timeout: 15000,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
})

client.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('accessToken')

  if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

client.interceptors.response.use(
  /** 성공시 */
  (response) => response,

  /** 실패시 */
  (error) => {
    try {
      const { response, config } = error
      /** 토큰으로 인한 오류일 시 리플레쉬 토큰 조회 후 리패치 */
      if (response.status === 401) {
        // return refreshAccessToken().then(() => client(config))
        sessionStorage.removeItem('accessToken')
        alert('로그인후 이용해 주세요.')
        window.location.href = '/'
      }
      return Promise.reject(response)
    } catch (e) {
      console.log('error', '네트워크 오류가 발생했습니다.')
      return Promise.reject(e)
    }
  },
)

client.defaults.withCredentials = true
