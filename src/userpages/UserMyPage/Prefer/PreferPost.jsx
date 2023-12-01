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
import { Tilde } from '../../../modal/External/ExternalFilter'
import { CustomSelect } from '../../../common/Option/Main'
import { isEmptyObj } from '../../../lib'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { postCustomerfavorite } from '../../../api/myPage'

import PreferEdit from './PreferEdit'

const init = {
  name: '',
  specUid: 1, //DB 필요
  thicknessMin: null,
  thicknessMax: null,
  widthMin: null,
  widthMax: null,
  lengthMin: null,
  lengthMax: null,
  tsMin: null,
  tsMax: null,
  ypMin: null,
  ypMax: null,
  cMin: null,
  cMax: null,
  elMin: null,
  elMax: null,
}

// TODO : 규격약호 DB 셋팅 안되있음
const PreferPost = ({ setChoiceComponent }) => {
  const [submitData, setSubmitData] = useState(init)
  const mutation = useMutationQuery('', postCustomerfavorite)



  const eventHandle = (e) => {
    const { name, value } = e.target
    const fieldValue = name === 'name' ? value : parseInt(value, 10)

    setSubmitData({ ...submitData, [name]: fieldValue || null })
    console.log(submitData)
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
    <OnePageContainer>
      <MainTitle></MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>선호제품 명</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="선호제품 명 입력" width={340} name="name" onChange={eventHandle} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>규격 약호</h4>
                <p></p>
              </Title>
              <CustomSelect width={340} name="specUid" />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>두께</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="thicknessMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="thicknessMax" onChange={eventHandle} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>폭</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="widthMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="widthMax" onChange={eventHandle} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>길이</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="lengthMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="lengthMax" onChange={eventHandle} />
            </Part>
          </Left>
          <Right>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>TS</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="tsMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="tsMax" onChange={eventHandle} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>YP</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="ypMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="ypMax" onChange={eventHandle} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>C%</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="cMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="cMax" onChange={eventHandle} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>EL</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="elMin" onChange={eventHandle} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="elMax" onChange={eventHandle} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-130}>
        <WhiteBtn width={40} height={40} onClick={goBack}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40} onClick={submitHandle}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default PreferPost

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
