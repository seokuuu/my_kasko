import { client } from '.'

const urls = {
  Destination: '/member/destination',
}

/* ==============================
    마이페이지 - 목적지 관리 - 목적지 등록
============================== */
export function postDestination(data) {
  return client.post(urls.Destination, data)
}

export function getDestination(data) {
  return client.get(
    `${urls.Destination}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&category=${data.category}&keyword=${data.keyword}`,
  )
}


export function patchDestination(data) {
  return client.patch(urls.Destination, data)
}

// return client.post(`${urls.businessNumberDuplication}?businessNumber=${data}`)
// /api/member/destination?pageNum=1&pageSize=20&category=목적지명&keyword=인천
