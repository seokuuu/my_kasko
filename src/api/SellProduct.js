import { client } from ".";
import qs from "qs";

const urls = {
  single: '/single-product',
  saleCategory :'/single-product/sale-category',
  original:'/single-product/original',
  package:'package-product',
  changeSaleType:'single-product/sale-type',
  changeOutlet:'single-product/outlet',
  packageProducts:"/package-product/products",
  recommend:'/single-product/best-order',
  beRecommend:'/single-product/best',
  pkgrecommend:'/package-product/best-order',
  pkgbeRecommend:'/package-product/best',

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
export async function postExcelSubmitProduct(data) {

  try{
    return await client.post(`${urls.single}`,data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
  }catch(e){
    alert(e?.data?.message)
  }
} 


export async function deleteProduct(data) {

  try{
    return await client.delete(`${urls.single}/${data}`)
  }catch(e){
    alert(e?.data?.message)
  }
} 
export async function updateSingleProduct(data){
  try{
    const response = await client.patch(`${urls.single}`,data)
    return response
  } catch(e){
    console.log(e)
  }
  
}

export async function postingMemoAndNote(data){
  try{
    const response = await client.patch(`${urls.single}/memo`,data)
    return response
  } catch(e){
    console.log(e)
  }
  
}

export async function patchSaleCategory(data) {
  return await client.patch(`${urls.saleCategory}`,data)
}

export async function patchOutlet(data) {
  try{
    return await client.patch(`${urls.changeOutlet}`,data)
  }catch(e){
    alert(e?.data.message)
  }
}
export async function patchSaleType(data) {
  return await client.patch(`${urls.changeSaleType}`,data)
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

export async function patchChangeBestRecommend(data){
  try{
    const response = await client.patch(`${urls.recommend}`,data)
    return response.data
  } catch(e){
    console.log(e)
  }

}
export async function patchBeBestRecommend(data){
  try{
    const response = await client.patch(`${urls.beRecommend}`,data)
    return response.data
  } catch(e){
    alert(e.data?.message)
  }

}
export async function patchChangeBestPackageRecommend(data){
  try{
    const response = await client.patch(`${urls.pkgrecommend}`,data)
    return response.data
  } catch(e){
    console.log(e)
  }

}
export async function patchBeBestPackageRecommend(data){
  try{
    const response = await client.patch(`${urls.pkgbeRecommend}`,data)
    return response.data
  } catch(e){
    alert(e.data?.message)
  }

}
export async function deletePackage(data) {

  try{
    return await client.delete(`${urls.package}/${data}`)
  }catch(e){
    alert(e?.data?.message)
  }
} 