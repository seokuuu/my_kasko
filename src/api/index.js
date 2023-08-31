import axios from 'axios'

const API_PATH = process.env.REACT_APP_API_URL

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
      // if (response.status === 401) {
      //   return refreshAccessToken().then(() => client(config));
      // }
      return Promise.reject(response)
    } catch {
      console.log('error', '네트워크 오류가 발생했습니다.')
      return Promise.reject()
    }
  },
)

client.defaults.withCredentials = true
