import { useEffect, useState } from 'react'
import {
  Alert,
  HalfWrap,
  Left,
  MainTitle,
  OnePageContainer,
  OnePageSubContainer,
  Part,
  Right,
  Title,
} from '../../../common/OnePage/OnePage.Styled'

import { CustomInput } from '../../../common/Input/Input'

import { styled } from 'styled-components'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import { CheckBox } from '../../../common/Check/Checkbox'

import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { getDetailDestination, patchDestination } from '../../../api/myPage'
import { BlackBtn, BtnWrap, WhiteBtn } from '../../../common/Button/Button'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { isEmptyObj } from '../../../lib'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import useReactQuery from '../../../hooks/useReactQuery'

const DestinationEdit = ({ setChoiceComponent, setSwtichDestiEdit, uidAtom }) => {
  const navigate = useNavigate()
  const radioDummy = ['지정', '미지정'] // 더미 데이터
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const [savedRadioValue, setSavedRadioValue] = useState('')
  const mutation = useMutationQuery('', patchDestination)

  const backComponent = () => {
    setSwtichDestiEdit(false)
  }

  const init = {
    uid: '',
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

  const { isLoading, isError, data, isSuccess } = useReactQuery(uidAtom, 'getDetailDestination', getDetailDestination)

  const detailData = data?.data?.data
  console.log('detailData', detailData)

  const [input, setInput] = useState(init)

  // 라디오 useEffect
  useEffect(() => {
    const checkedIndex = detailData?.represent === 0 ? 1 : 0
    const newCheckRadio = Array.from({ length: radioDummy.length }, (_, index) => index === checkedIndex)

    setCheckRadio(newCheckRadio)
    setInput({
      ...input,
      ...detailData,
      represent: checkedIndex,
    })
  }, [detailData])

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
      if (selectedValue === '지정') setInput({ ...input, represent: 1 })
      if (selectedValue === '미지정') setInput({ ...input, represent: 0 })
    }
  }, [checkRadio])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
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
              <CustomInput
                placeholder="전체 주소 입력"
                width={340}
                name="address"
                onChange={handleChange}
                defaultValue={detailData?.address}
              />
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>하차지 명</h4>
                <p></p>
              </Title>
              <CustomInput defaultValue={detailData?.name} width={340} name="name" onChange={handleChange} />
            </Part>
            <Part>
              <Title>
                <h4>하차지 담당자 정보</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="직함 입력"
                width={135}
                name="managerTitle"
                defaultValue={detailData?.managerTitle}
                onChange={handleChange}
              />
              <CustomInput
                defaultValue={detailData?.managerName}
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
                defaultValue={detailData?.managerPhone}
              />

              <Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
              <CustomInput
                placeholder="하차지 연락처 입력 ('-' 제외)"
                width={340}
                name="phone"
                onChange={handleChange}
                defaultValue={detailData?.phone}
              />
            </Part>

            <Part>
              <Title>
                <h4>비고</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="비고 작성"
                width={340}
                name="memo"
                onChange={handleChange}
                defaultValue={detailData?.memo}
              />
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
