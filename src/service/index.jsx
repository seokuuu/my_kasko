import axios from 'axios'

export const client = axios.create({
  // baseURL: "https://kasko.co.kr",
  baseURL: 'https://dev.kasko.co.kr',
  timeout: 10000,
  headers: {
    'x-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Credentials': true,
    // 'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json', // 옵션: 'qrraybuffer', 'document' ...
  responseEncoding: 'utf8', // 클라이언트 사이드 요청
  decompress: true,
  withCredentials: true, // cors
})

client.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem('auth')
    if (data) {
      config.headers['Authorization'] = 'Bearer ' + JSON.parse(data).accessToken
    }
    return config
  },
  (request) => {
    return request
  },
)

client.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // if (axios.isCancel(error)) {
    //   return new Promise(() => {});
    // }

    if (error.response) {
      return error.response
    }
  },
)

// axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVf7J2867CY7ZqM7JuQIiwiZXhwIjoxNjgyOTMyMTY4fQ.1A_rX3qHra4NXj4UEuaxSUcM7Z5-pGnabbb_W1e_NH8Q-Bv9zp8EYEzl4yBLdou8iqfiATMzBLMYc5kOCXrUcg';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
