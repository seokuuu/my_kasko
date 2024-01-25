import { createQueryParams, log, removeEmptyFields } from '../../lib'
import isIterable from '../../lib/fxjs'
import { client } from '../index'

const urls = {
  customer: 'admin/customer',
  clientDestination: 'admin/customer-destination',
  userManage: 'admin/member',
  profileEdit: 'admin/privacy',
  addressFind: 'search/code',
}
/* ==============================
    사용자관리 - 고객사 관리
============================== */

//목록
export async function getCustomer(data) {
  const filteredData = removeEmptyFields(data)
  const params = createQueryParams(filteredData)
  try {
    const response = await client.get(`${urls.customer}?${params}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

//상세 목록
export function getCustomerDetail(data) {
  return client.get(`${urls.customer}/${data}`)
}

//삭제
export function deleteCustomer(id) {
  return client.delete(`${urls.customer}/${id}`)
}

//경매 상태 제한
export function postChangeAuction(data) {
  return client.post(`${urls.customer}/status`, data)
}

//비밀번호 초기화
export function resetCustomer(data) {
  return client.post(`${urls.customer}/reset`, data)
}

// 사업자 번호 중복 체크
export function checkBusinessNumber(data) {
  return client.post(`${urls.customer}/business-number?businessNumber=${data}`)
}

//상세 get

// 회원 생성(formData)
export function postClient(input, fileForms) {
  const form = new FormData()

  form.append(
    'request',
    new Blob([JSON.stringify(input)], {
      type: 'application/json',
    }),
  )
  // fileForms에 있는 파일 정보 추가

  if (fileForms.bankBook instanceof File) {
    form.append('bankBook', fileForms.bankBook)
  }

  if (fileForms.registration instanceof File) {
    form.append('registration', fileForms.registration)
  }
  for (const pair of form.entries()) {
    console.log('폼 데이터 =>', pair[0], pair[1])
  }

  return client.post(urls.customer, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/* ==============================
    사용자관리 - 고객사 목적지 관리
============================== */
export function get_clientDestination(data) {
  return client.get(`${urls.clientDestination}`,{params:data})
}

export async function get_detailClientDestination(data) {
  return await client.get(`${urls.clientDestination}/${data}`)
}

export function delete_clientDestination(id) {
  return client.delete(`${urls.clientDestination}/${id}`)
}

export function post_clientDestination(data) {
  return client.post(urls.clientDestination, data)
}

export function patch_clientDestination(data) {
  return client.patch(urls.clientDestination, data)
}

export function get_addressFind(data) {
  return client.get(`${urls.addressFind}?name=${data}`)
}

/* ==============================
    사용자관리 - 사용자 관리
============================== */
// {{dev}}/api/admin/member?pageNum=1&pageSize=50
export function get_userManage(data) {
  console.log('data', data)
  return client.get(`${urls.userManage}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}

export function delete_userManage(id) {
  return client.delete(`${urls.userManage}/${id}`)
}

export function post_userManage(data) {
  return client.post(urls.userManage, data)
}

export function patch_userManage(data) {
  return client.patch(urls.userManage, data)
}

export function get_userDetail(data) {
  return client.get(`${urls.userManage}/${data}`)
}

// 사용자 등록 (formData)
export function postUserManage(input, fileForms) {
  const form = new FormData()

  form.append(
    'request',
    new Blob([JSON.stringify(input)], {
      type: 'application/json',
    }),
  )
  // fileForms에 있는 파일 정보 추가

  if (fileForms.bankBook instanceof File) {
    form.append('bankBook', fileForms.bankBook)
  }

  if (fileForms.registration instanceof File) {
    form.append('registration', fileForms.registration)
  }
  for (const pair of form.entries()) {
    console.log('폼 데이터 =>', pair[0], pair[1])
  }

  return client.post(urls.userManage, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/* ==============================
    사용자관리 - 개인정보 수정
============================== */
export function patchProfile(data) {
  return client.patch(urls.profileEdit, data)
}

export function getProfile() {
  return client.get(urls.profileEdit)
}
