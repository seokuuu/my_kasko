import { useState } from 'react'
import { CheckBoxDefault } from '.'

const FOOD = [
  { label: '피자', value: 'pizza', checked: true, disabled: false },
  { label: '치킨', value: 'chicken', checked: false, disabled: false },
  { label: '햄버거', value: 'hamburger', checked: false, disabled: false },
]

const AGREE = [{ label: '14세 이상', value: 'agree', checked: false, disabled: false }]

const CheckBoxPage = () => {
  const [data, setData] = useState({ food: FOOD, agree: AGREE })

  return (
    <div>
      <div>
        <h1>여러개 사용시</h1>
        <CheckBoxDefault data={data} setData={setData} groupName="food" />
      </div>
      <div>
        <h1>단일 사용시</h1>
        <CheckBoxDefault data={data} setData={setData} groupName="agree" />
      </div>
    </div>
  )
}

export default CheckBoxPage
