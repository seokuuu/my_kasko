import useAlert from '../../store/Alert/useAlert'
import { client } from '../index'
import qs from 'qs'


const urls = {
  stocks:'admin/stock',
  stocksWeight:'admin/stock/weight',
  stockCategory:'/admin/stock',
  createWeightStocks:'/admin/stock/weight',
  cancel:'admin/stock/'
}

export const getInventoryStocks = async (data) => {
  const res = await client.get(`${urls.stocks}`,{params:data,
    paramsSerializer: (param) => {
      return qs.stringify(param)
    },})
    
    return res.data
  }
  export const getDetailStocks = async (data) => {
    const res = await client.get(`${urls.stocksWeight}/${data}`)
    
    return res.data
  }
  
  
  
  export async function patchStockCategory(data) {
  try{
    return await client.patch(`${urls.stockCategory}`,data)
  }catch(e){
    return e
  }
}

export async function postStocks(data){
  try{
    return await client.post(`${urls.createWeightStocks}`,data)
  }catch(e){
    alert(e.data?.message)
  }
}

export async function postCancelInStock(data){
  try{
    const result = client.post(`${urls.cancel}${data}`)
    return result.data
  }catch(e){
    alert(e.data?.message)
  }
}
