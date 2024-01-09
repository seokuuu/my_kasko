import { client } from ".";
import qs from "qs";

const urls = {
  single: '/single-product',
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
