import qs from 'qs'
import { Filtering } from '../../utils/filtering'
import { client } from '../index'
const urls = {
	inventory: '/inventory-ledger',
}

export async function getInventoryLedger(data) {
	const response = await client.get(`${urls.inventory}`, {
		params: Filtering(data),
		paramsSerializer: (params) => qs.stringify(params),
	})

	return response
}
