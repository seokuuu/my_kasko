import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  Destination: '/admin/destination', // 목적지 관리
  DestiSearch: '/search/destination', // 목적지 권역 목록 (등록 - 목적지 코드 Dropdown)
  Surcharge: '/admin/extracharge', //할증 관리
  Consolidation: '/admin/mergecost', //합짐비 관리
  Transportation: '/admin/freight',
}

/* ==============================
    기준 관리 - 목적지 관리 (Destination)
============================== */

// 목적지 관리 - 목록 "GET"
export const getAdminDestination = (data) => {
  return client.get(URL.Destination, { params: data })
}

// 목적지 관리 - 목적지 권역 목록 (목적지 코드 Dropdown) "Get"
export const getAdminDestinationSearch = async () => {
  console.log('!!!!', client.get(URL.DestiSearch))
  return client.get(URL.DestiSearch)
}

// 목적지 관리 - 등록 "POST"
export const postAdminDestination = (params) => client.post(URL.Destination, params)

// 목적지 관리 - 수정 'PATCH"
export const editAdminDestination = (params) => client.patch(URL.Destination, params)

// 목적지 관리 - 삭제 "DELETE"
export function deleteAdminDestination(id) {
  return client.delete(`${URL.Destination}/${id}`)
}

/* ==============================
    기준 관리 - 운반비 관리 (Transportation)
============================== */

// 운반비 관리 - 목록 "GET"
export const getAdminTransportation = (data) => {
  return client.get(URL.Transportation, { params: data })
}

// 운반비 관리 - 등록 "POST"
export const postAdminTransportation = (params) => client.post(URL.Transportation, params)

// 운반비 관리 - 수정 'PATCH"
export const editAdminTransportation = (params) => client.patch(URL.Transportation, params)

// 운반비 관리 - 삭제 "DELETE"
export function deleteAdminTransportation(id) {
  return client.delete(`${URL.Transportation}/${id}`)
}

/* ==============================
    기준 관리 - 할증 관리 (Surcharge)
============================== */

// 할증 관리 - 목록 "GET"
export const getAdminSurcharge = (data) => {
  return client.get(URL.Surcharge, { params: data })
}

// 할증 관리 - 등록 "POST"
export const postAdminSurcharge = (params) => client.post(URL.Surcharge, params)

// 할증 관리 - 삭제 "DELETE"
export function deleteAdminSurcharge(id) {
  return client.delete(`${URL.Surcharge}/${id}`)
}

/* ==============================
    기준 관리 - 합짐비 관리 (Consolidation)
============================== */

// 합짐비 관리 - 목록 "GET"
export const getAdminConsolidation = (data) => {
  return client.get(URL.Consolidation, { params: data })
}

// 합짐비 관리 - 등록 "POST"
export const postAdminConsolidation = (params) => client.post(URL.Consolidation, params)

// 합짐비 관리 - 삭제 "DELETE"
export function deleteAdminConsolidation(id) {
  return client.delete(`${URL.Consolidation}/${id}`)
}
