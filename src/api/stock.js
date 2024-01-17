import { client } from '.'
import qs from 'qs'

const urls = {
  incoming: '/admin/store',
}

export async function getInComingList(data) {
  const response = await client.get(`${urls.incoming}`, {
    params: data,
    paramsSerializer: (param) => {
      return qs.stringify(param)
    },
  })
  return response.data
}
