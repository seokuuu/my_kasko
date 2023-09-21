import { client } from '.'

const urls = {
  Destination: '/member/destination',
  privacy: '/member/privacy',
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

/* ==============================
    마이페이지 - 개인정보수정
============================== */
export function updateCustomer(input, fileForms) {
  const form = new FormData()
  form.append(
    'request',
    new Blob([JSON.stringify(input)], {
      type: 'application/json',
    }),
  )
  // fileForms에 있는 파일 정보 추가
  if (fileForms.deleteBusinessNumberFile instanceof File) {
    form.append('deleteBusinessNumberFile', fileForms.deleteBusinessNumberFile)
  }
  if (fileForms.deleteBankbookFile instanceof File) {
    form.append('deleteBankbookFile', fileForms.deleteBankbookFile)
  }
  return client.patch(urls.updateCustomer, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 상세
export function getCustomerPrivacy() {
  return client.get(urls.privacy)
}
// 중복확인
export function checkBusinessNumber(data) {
  return client.post(`${urls.privacy}/business-number?businessNumber=${data}`)
}

// {{dev}}/api/member/privacy/business-number?businessNumber=123455
