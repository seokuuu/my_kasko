import { client } from '.'

const faqEndpoint = '/faq'
const policyEndpoint = '/policy'

export const getFaqList = async (data) => {
  return client.get(faqEndpoint, { params: data })
}

export const getFaqDetail = async (uid) => {
  return client.get(`${faqEndpoint}/${uid}`)
}

export const getPolicy = async (type) => {
  return client.get(policyEndpoint, { params: type })
}
