import { client } from ".";
import qs from "qs";

const urls = {
  single: '/single-product',
  saleCategory :'/single-product/sale-category',
  original:'/single-product/original',
  package:'package-product/'
}

export async function getSingleProducts(data) {
  const response =  await client.get(`${urls.single}`,
  { params: data , 
    paramsSerializer:(param)=>{ 
      return qs.stringify(param)
    }}
    ) 
  const pagination = response.data?.data?.pagination
  const r =response.data?.data.list.map((i,idx)=>{
    return {index:idx+1 , ...i}
  })
  return {pagination,r}
}



export async function patchSaleCategory(data) {
  return client.patch(`${urls.saleCategory}`,data)
}

export async function gethyunDaiOriginal(data){
 const response = await client.get(`${urls.original}`,{params:data}) 
 
 return response.data
}



export async function getPackageList(params) {
  const response = await client.get(`${urls.package}`,{
    params:params,
    paramsSerializer:(param)=>{
      return qs.stringify(param)
    }
    
  })
  const pagination = response.data?.data?.pagination
  const r =response.data?.data.list.map((i,idx)=>{
    return {index:idx+1 , ...i}
  })
  return {pagination,r}
}