import { client } from '../index'



const urls = {
  stocks:'admin/stock',
  stocksWeight:'admin/stock/weight',
  stockCategory:'/admin/stock',
  createWeightStocks:'/admin/stock/weight'
}


export const getInventoryStocks = async (data) => {
  const res = await client.get(`${urls.stocks}`,{params:data})

  return res.data
}
export const getDetailStocks = async (data) => {
  const res = await client.get(`${urls.stocksWeight}/${data}`)

  return res.data
}



export async function patchStockCategory(data) {
  return await client.patch(`${urls.stockCategory}`,data)
}

export async function postStocks(data){
  try{
    return await client.post(`${urls.createWeightStocks}`,data)
  }catch(e){
    alert(e.data?.message)
  }
}