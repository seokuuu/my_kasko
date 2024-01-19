import { client } from '.'
import qs from 'qs'

const urls = {
  incoming: '/admin/store',
  incomeDelete: '/admin/store',
}

export async function getInComingList(data) {
  const response = await client.get(`${urls.incoming}`, {
    params: data,
    paramsSerializer: (param) => {
      return qs.stringify(param)
    },
  })
  return response.data
}

export async function deleteIncomeProduct(data) {
  try{
    return await client.delete(`${urls.incomeDelete}/${data}`)
  }catch(e){
    alert(e?.data?.message)
  }
}

export async function postExcelSubmitProduct(data) {
  try{
    return await client.post(`${urls.incoming}`,data,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
  }catch(e){
    alert(e?.data?.message)
  }
}