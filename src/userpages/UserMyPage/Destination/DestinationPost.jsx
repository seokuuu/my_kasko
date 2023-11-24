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
import { postDestination } from '../../../api/myPage'
import { isEmptyObj } from '../../../lib'
import { async } from 'q'
import { usePostUserDestinationQuery } from '../../../hooks/queries/user/Mypage'
import AlertModal from '../../../modal/Alert/AlertModal'
import { useAtom } from 'jotai'
import { alertAtom, alertAtom2 } from '../../../store/Layout/Layout'

const init = {
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

// TODO: 목적지 조회 기능

const DestinationPost = ({ setChoiceComponent }) => {
  const [input, setInput] = useState(init) //summit input 데이터
  const radioDummy = ['지정', '미지정'] // 더미 데이터
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0)) // 더미 데이터에 맞는 check 생성 (해당 false / true값 반환)
  const [savedRadioValue, setSavedRadioValue] = useState('')
  const [modalAtom, setModalAtom] = useAtom(alertAtom)
  const [modalAtom2, setModalAtom2] = useAtom(alertAtom2)

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    if (checkedIndex !== -1) {
      let newSavedRadioValue = ''
      const selectedValue = radioDummy[checkedIndex]
      if (selectedValue === '지정') newSavedRadioValue = 1
      if (selectedValue === '미지정') newSavedRadioValue = 0

      setSavedRadioValue(newSavedRadioValue)
      setInput({ ...input, represent: newSavedRadioValue })
    }
  }, [checkRadio])

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const submit = async (check) => {
    if (!isEmptyObj(input)) return alert('빈값을 채워주세요!')
    setModalAtom2(true)
    try {
      const { data: res } = await postDestination(input)
      console.log('업데이트 : ', res)
      if (check === true) {
        // 이 부분을 API 호출 성공 후로 옮깁니다.
        setModalAtom2(false)
        setChoiceComponent('리스트')
      }
    } catch (err) {
      console.log(err)
      setModalAtom2(false) // 에러 발생시 모달 닫기
    }
  }

  const backComponent = (check) => {
    setModalAtom(true)
    if (check === true) {
      setModalAtom(false)
      setChoiceComponent('리스트')
    }
    if (check === false) {
      setModalAtom(false)
    }
  }

  const handleModal = (value) => {
    setModalAtom(false)
    console.log(value)
  }

  const { mutate: regi, status, error } = usePostUserDestinationQuery()

  // ✅destinationUid : 2로 일단 설정해줘야 등록됩니다.
  return (
    <OnePageContainer>
      <MainTitle>목적지 등록</MainTitle>
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
              {/* TODO : 일단 왼쪽 input 입력 추후에 수정예정 */}
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

      {modalAtom2 && <AlertModal type={1} title={'저장 되었습니다'} onClick={submit} />}
      {modalAtom && (
        <AlertModal
          type={2}
          title={'현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?'}
          onClick={backComponent}
        />
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
