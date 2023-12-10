import {client} from '../index'


const urls ={ 
  inventory:'/inventory-ledger'
}



export function getInventoryLedger(data) {
  return client.get(`${urls.inventory}`,{ params:data })
}