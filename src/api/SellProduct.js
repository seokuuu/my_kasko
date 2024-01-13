import { client } from ".";
import qs from "qs";

const urls = {
  single: '/single-product',
  saleCategory :'/single-product/sale-category',
  original:'/single-product/original',
  package:'package-product',
  packageProducts:"/package-product/products"
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
  return await client.patch(`${urls.saleCategory}`,data)
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
export async function getPackageProductsList(params) {
  const response = await client.get(`${urls.packageProducts}`,{
    params:params,
    paramsSerializer:(param)=>{
      return qs.stringify(param)
    }})
    const pagination = response.data?.data?.pagination
    const r =response.data?.data.list.map((i,idx)=>{
      return {index:idx+1 , ...i}
    })
    console.log('RES',r)
    return {pagination,r}
}


export async function postCreatePackage(data){
  try{
    const response = await client.post(`${urls.package}`,data)    
    return response.data
  } catch(e){
    console.log(e)
  }

}

export async function postUpdatePackage(data){
  try{
    const response = await client.patch(`${urls.package}`,data)
    return response.data
  } catch(e){
    console.log(e)
  }

}

