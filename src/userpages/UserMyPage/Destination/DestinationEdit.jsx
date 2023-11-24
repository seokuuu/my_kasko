import { useState, useEffect } from 'react'
import {
  OnePageContainer,
  MainTitle,
  OnePageSubContainer,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  Alert,
} from '../../../common/OnePage/OnePage.Styled'

import { TxtInput, CustomInput } from '../../../common/Input/Input'

import { styled } from 'styled-components'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import { isEmptyObj } from '../../../lib'
import { patchDestination } from '../../../api/myPage'
import useMutationQuery from '../../../hooks/useMutationQuery'

const DestinationEdit = ({ setChoiceComponent }) => {
  const navigate = useNavigate()
  const radioDummy = ['지정', '미지정'] // 더미 데이터
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)

  const [savedRadioValue, setSavedRadioValue] = useState('')
  const mutation = useMutationQuery('', patchDestination)
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      if (selectedValue === '지정') setInput({ ...input, represent: 1 })
      if (selectedValue === '미지정') setInput({ ...input, represent: 0 })
    }
  }, [checkRadio])

  const backComponent = () => {
    navigate('/userpage/userdestination')
    // setChoiceComponent('리스트')
  }
  const uid = useAtom(doubleClickedRowAtom)[0]['고객 코드']

  const init = {
    uid: uid,
    represent: '',
    destinationUid: '',
    address: '',
    name: '',
    phone: '',
    managerTitle: '',
    managerName: '',
    managerPhone: '',
    memo: '',
  }

  const [input, setInput] = useState(init)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
    console.log(input)
  }
  const submit = async () => {
    if (!isEmptyObj(input)) return alert('빈값을 채워주세요!')
    mutation.mutate(input)
  }
  return (
    <OnePageContainer>
      <MainTitle>목적지 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>대표 주소 지정</h4>
                <p></p>
              </Title>
              <RadioContainer>
                {radioDummy.map((text, index) => (
                  <RadioMainDiv key={index}>
                    <RadioCircleDiv
                      isChecked={checkRadio[index]}
                      onClick={() => {
                        setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                      }}
                    >
                      <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                    </RadioCircleDiv>
                    <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                  </RadioMainDiv>
                ))}
              </RadioContainer>
            </Part>

            <Part>
              <Title>
                <h4>목적지</h4>
                <p></p>
              </Title>
              <CustomInput width={120} name="destinationUid" onChange={handleChange} />
              <span style={{ margin: 'auto 5px' }}>-</span>
              <CustomInput width={120} />
              <BlackBtn width={20} height={40} style={{ marginLeft: '10px' }}>
                조회
              </BlackBtn>
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>전체 주소</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="전체 주소 입력" width={340} name="address" onChange={handleChange} />
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>하차지 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="전체 주소 입력" width={340} name="name" onChange={handleChange} />
            </Part>
            <Part>
              <Title>
                <h4>하차지 담당자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={135} name="managerTitle" onChange={handleChange} />
              <CustomInput
                placeholder="담당자 성함 입력"
                width={200}
                style={{ marginLeft: '5px' }}
                name="managerName"
                onChange={handleChange}
              />
              <CustomInput
                placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
                width={340}
                style={{ marginTop: '5px' }}
                name="managerPhone"
                onChange={handleChange}
              />

              <Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
              <CustomInput
                placeholder="하차지 연락처 입력 ('-' 제외)"
                width={340}
                name="phone"
                onChange={handleChange}
              />
            </Part>

            <Part>
              <Title>
                <h4>비고</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="비고 작성" width={340} name="memo" onChange={handleChange} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40} onClick={backComponent}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40} onClick={submit}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default DestinationEdit

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
