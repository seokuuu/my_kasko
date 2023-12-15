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

import { post_clientDestination } from '../../../api/userManage'
import { BlackBtn, BtnWrap, WhiteBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { isEmptyObj } from '../../../lib'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { useQueryClient } from '@tanstack/react-query'
import { UsermanageFindModal } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { find } from 'lodash'
import ClientDestiCustomerFind from './ClientDestiCustomerFind'

const init = {
  represent: '', // (0: 미지정 / 1: 지정)
  customerUid: 965, //고객 고유번호 (고객사 조회 API 필요, 고객사 찾기 모달)
  destinationUid: '', //목적지 고유번호
  address: '', //상세주소
  name: '', //하차지명
  managerTitle: '', //담당자 직함
  managerName: '', //담당자 이름
  managerPhone: '', //담당자 연락처
  phone: '', //하차지담당자번호
  memo: '', //메모
}
const DestinationPost = ({ setChoiceComponent }) => {
  const [findModal, setFindModal] = useAtom(UsermanageFindModal)
  const queryClient = useQueryClient()
  const radioDummy = ['지정', '미지정']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)
  const [savedRadioValue, setSavedRadioValue] = useState('')
  const [submitData, setSubmitData] = useState(init)
  const mutation = useMutationQuery('', post_clientDestination)
  const [customerFindResult, setCustomerFindResult] = useState()

  console.log('customerFindResult', customerFindResult)

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
    if (checkedIndex === 0) {
      setSubmitData({ ...submitData, represent: 1 })
    }
    if (checkedIndex === 1) {
      setSubmitData({ ...submitData, represent: 0 })
    }
    if (checkedIndex !== -1) {
      const selectedValue = radioDummy[checkedIndex]
      setSavedRadioValue(selectedValue)
    }
  }, [checkRadio])

  const eventHandle = (e) => {
    const { name, value } = e.target
    setSubmitData({ ...submitData, [name]: value, customerUid: customerFindResult?.uid })
  }

  const submitHandle = (e) => {
    if (isEmptyObj(submitData)) {
      setChoiceComponent('리스트')
      mutation.mutate(submitData)
    } else {
      alert('내용을 모두 기입해주세요.')
    }
  }

  const goBack = () => {
    setChoiceComponent('리스트')
  }
  return (
    <OnePageContainer style={{ minHeight: '88vh' }}>
      <MainTitle>고객사 목적지 등록</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left style={{ width: '50%' }}>
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
                <h4>고객사 명</h4>
                <p></p>
              </Title>
              <CustomInput width={120} defaultValue={customerFindResult?.name} />
              <span style={{ margin: 'auto 5px' }}>-</span>
              <CustomInput width={120} defaultValue={customerFindResult?.ceoName} />
              <BlackBtn
                width={20}
                height={40}
                style={{ marginLeft: '10px' }}
                onClick={() => {
                  setFindModal(true)
                }}
              >
                조회
              </BlackBtn>
            </Part>
            <Part>
              <Title>
                <h4>목적지</h4>
                <p></p>
              </Title>
              <CustomInput width={120} name="destinationUid" onChange={eventHandle} />
              <span style={{ margin: 'auto 5px' }}>-</span>
              <CustomInput width={120} />
              <BlackBtn width={20} height={40} style={{ marginLeft: '10px' }}>
                조회
              </BlackBtn>
              <CustomInput
                placeholder="상세 주소 입력"
                width={340}
                name="address"
                onChange={eventHandle}
                style={{ marginTop: '5px' }}
              />
            </Part>
            <Part>
              <Title>
                <h4>목적지 코드</h4>
                <p></p>
              </Title>
              <div
                style={{
                  display: 'flex',
                  width: '345px',
                }}
              >
                <WhiteSkyBtn
                  width={20}
                  height={40}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}
                >
                  조회
                </WhiteSkyBtn>

                <div>
                  <CustomInput width={120} />
                  <span style={{ margin: 'auto 5px' }}>-</span>
                  <CustomInput width={120} />
                </div>
              </div>
            </Part>
          </Left>
          <Right style={{ width: '50%' }}>
            <Part>
              <Title>
                <h4>하차지 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="상세 주소 입력" width={340} name="name" onChange={eventHandle} />
            </Part>
            <Part>
              <Title>
                <h4>하차지 담당자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={135} name="managerTitle" onChange={eventHandle} />
              <CustomInput
                placeholder="담당자 성함 입력"
                width={200}
                style={{ marginLeft: '5px' }}
                name="managerName"
                onChange={eventHandle}
              />
              <CustomInput
                placeholder="담당자 휴대폰 번호 입력 ('-' 제외)"
                width={340}
                style={{ marginTop: '5px' }}
                name="managerPhone"
                onChange={eventHandle}
              />

              <Alert style={{ margin: '5px auto' }}>*하차지 연락처 미입력 시 토요일 하차 불가</Alert>
              <CustomInput
                placeholder="하차지 연락처 입력 ('-' 제외)"
                width={340}
                name="phone"
                onChange={eventHandle}
              />
            </Part>

            <Part>
              <Title>
                <h4>비고</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="비고 작성" width={340} name="memo" onChange={eventHandle} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-250}>
        <WhiteBtn width={40} height={40} onClick={goBack}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40} onClick={submitHandle}>
          저장
        </BlackBtn>
      </BtnWrap>
      {findModal && (
        <ClientDestiCustomerFind setFindModal={setFindModal} setCustomerFindResult={setCustomerFindResult} />
      )}
    </OnePageContainer>
  )
}

export default DestinationPost

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
