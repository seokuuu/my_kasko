import { client } from ".";
import qs from "qs";

const urls = {
  single: '/single-product',
  saleCategory :'/single-product/sale-category',
  original:'/single-product/original'
}

export async function getSingleProducts(data) {
  const response =  await client.get(`${urls.single}`,
  { params: data , 
    paramsSerializer:(param)=>{ 
      return qs.stringify(param)
    }}
    ) 
  // console.log(response)
  return response.data
}



export async function patchSaleCategory(data) {
  return client.patch(`${urls.saleCategory}`,data)
}

export async function gethyunDaiOriginal(){
 const response = await client.get(`${urls.original}`) 
 
 return response.data
}