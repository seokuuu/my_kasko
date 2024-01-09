import { useQuery } from '@tanstack/react-query'
import { client } from '../index'

const SHIPMENT_URL = '/shipment'
const SHIPMENT_OUT_URL = `${SHIPMENT_URL}/out`
const SHIPMENT_MERGE_URL = `${SHIPMENT_URL}/merge`
const SHIPMENT_DRIVER_URL = `${SHIPMENT_URL}/driver`
const SHIPMENT_ORDER_RECEIPT_URL = `${SHIPMENT_URL}/order-receipt`
const SHIPMENT_ORDER_STATEMENT_URL = `${SHIPMENT_URL}/order-statement`
const SHIPMENT_EXTRA_COST_URL = `${SHIPMENT_URL}/extra-cost`

export const QUERY_KEY = {
  list: ['shipment', 'list'],
}

// 출하지시 목록
export function useShipmentListQuery(params) {
  return useQuery({
    queryKey: QUERY_KEY.list,
    queryFn: async function () {
      console.log('params : ', params)
      const response = await client.get(SHIPMENT_URL, { params })
      return response.data.data
    },
  })
}
