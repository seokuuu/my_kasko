import { client } from ".";


const urls = {
  single:'/single-product'
}


export async function getSingleProducts(data) {
  const response =  await client.get(`${urls.single}`,{ params: data}) 
  // console.log(response)
  return response.data
}
