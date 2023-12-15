import { client } from ".";


const urls = {
  storage:'/search/storage',
  spart:'/search/spart',
  destination:'/search/destination',
  destinationDiv:'/search/destination-div'
}

// 창고 리스트
export async function getStorageList() {
  const response =  await client.get(`${urls.storage}`)

 return response.data.data.map((item) =>{
    return ({
      label:item.storage,
      value:item.uid,
      address:item.address
      })
  } 
  )
}

// 제품군 리스트
export async function getSPartList() {
  const response =  await client.get(`${urls.spart}`)

 return response.data.data.map((item) =>{
    return ({
      label:item.spart,
      value:item.uid,
      })
  } 
  )
}

export function getDestinationFind(){
  const response = client.get(`${urls.destination}`)

  return response
}