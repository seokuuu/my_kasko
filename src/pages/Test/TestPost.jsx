import React from 'react'
import axios from 'axios'

const apiUrl = 'https://dapi.kakao.com/v2/local/search/address.json'
const apiKey = 'YOUR_KAKAO_API_KEY' // 개인 키를 여기에 넣어야 해

const inputAddress = '서울특별시 강남구 역삼동 123번지' // 입력한 주소

axios
  .get(apiUrl, {
    params: {
      q: inputAddress,
    },
    headers: {
      Authorization: `KakaoAK ${apiKey}`,
    },
  })
  .then((response) => {
    const result = response.data.documents[0]

    // 시군구명
    const region = result.address.region_2depth_name
    console.log('시군구명:', region)

    // 도로명번호
    const roadNumber = result.address.road_address.zone_no
    console.log('도로명번호:', roadNumber)
  })
  .catch((error) => {
    console.error(error)
  })

const TestPost = () => {
  return <div>TestPost</div>
}

export default TestPost
