import { client } from '../index'

const urls = {
  policy: 'policy',
}

// {{dev}}/api/policy?type=개인정보 수집 동의

/* ==============================
    운영 관리 - 이용 약관
============================== */
export function getPolicy(data) {
  return client.get(`${urls.policy}?type=${data}`)
}

export function postPolicy(data) {
  return client.post(urls.policy, data)
}
