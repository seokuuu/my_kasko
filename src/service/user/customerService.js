import { client } from '../../api'

const faqEndpoint = '/faq'

export const getFaqList = async (data) => {
  return client.get(faqEndpoint, { params: data })
}