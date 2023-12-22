import { client } from '../index'
import qs from 'qs'

const urls = {
  inventory: '/inventory-ledger',
}

export async function getInventoryLedger(data) {
  const response = await client.get(`${urls.inventory}`, {
    params: data,
    paramsSerializer: (param) => {
      return qs.stringify(param)
    },
  })

  return response
}
