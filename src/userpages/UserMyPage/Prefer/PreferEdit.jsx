import { useEffect, useState } from 'react'
import {
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

import { useAtom } from 'jotai'
import { patchCustomerfavorite } from '../../../api/myPage'
import { BlackBtn, BtnWrap, WhiteBtn } from '../../../common/Button/Button'
import { CustomSelect } from '../../../common/Option/Main'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { isEmptyObj } from '../../../lib'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import useReactQuery from '../../../hooks/useReactQuery'
import { getDetailCustomerfavorite } from '../../../api/myPage'

const init = {
  uid: '',
  name: '',
  specUid: null, //DB 필요
  thicknessMin: '',
  thicknessMax: '',
  widthMin: '',
  widthMax: '',
  lengthMin: '',
  lengthMax: '',
  tsMin: '',
  tsMax: '',
  ypMin: '',
  ypMax: '',
  cMin: '',
  cMax: '',
  elMin: '',
  elMax: '',
}

const PreferEdit = ({ setChoiceComponent, setSwtichEdit, uidAtom }) => {
  const radioDummy = ['지정', '미지정'] // 더미 데이터

  const [submitData, setSubmitData] = useState(init)
  const [selectedData, setSelectedData] = useAtom(doubleClickedRowAtom)
  const mutation = useMutationQuery('', patchCustomerfavorite)

  const { isLoading, isError, data, isSuccess } = useReactQuery(
    uidAtom,
    'getDetailCustomerfavorite',
    getDetailCustomerfavorite,
  )

  const detailData = data?.data?.data

  useEffect(() => {
    const uid = selectedData?.uid
    setSubmitData((prevState) => ({ ...prevState, uid: uid }))

    // detailData가 정상적으로 가져와진 후에 submitData를 초기화합니다.
    if (detailData) {
      setSubmitData(detailData)
    }
  }, [selectedData, isSuccess, detailData])

  console.log('submitData', submitData)

  const eventHandle = (e) => {
    const { name, value } = e.target
    setSubmitData({ ...submitData, detailData, [name]: value })
    console.log(submitData)
  }

  const submitHandle = (e) => {
    if (isEmptyObj(submitData)) {
      mutation.mutate(submitData)
    } else {
      alert('내용을 모두 기입해주세요.')
    }
  }

  const goBack = () => {
    setSwtichEdit(false)
  }
  return (
    <OnePageContainer>
      <MainTitle>선호제품 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>선호제품 명</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="선호제품 명 입력"
                width={340}
                name="name"
                onChange={eventHandle}
                defaultValue={detailData?.name}
              />
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
              <CustomInput
                width={160}
                name="thicknessMin"
                onChange={eventHandle}
                defaultValue={detailData?.thicknessMin}
              />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput
                width={160}
                name="thicknessMax"
                onChange={eventHandle}
                defaultValue={detailData?.thicknessMax}
              />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>폭</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="widthMin" onChange={eventHandle} defaultValue={detailData?.widthMin} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="widthMax" onChange={eventHandle} defaultValue={detailData?.widthMax} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>길이</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="lengthMin" onChange={eventHandle} defaultValue={detailData?.lengthMin} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="lengthMax" onChange={eventHandle} defaultValue={detailData?.lengthMax} />
            </Part>
          </Left>
          <Right>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>TS</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="tsMin" onChange={eventHandle} defaultValue={detailData?.lengthMax} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="tsMax" onChange={eventHandle} defaultValue={detailData?.lengthMax} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>YP</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="ypMin" onChange={eventHandle} defaultValue={detailData?.ypMin} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="ypMax" onChange={eventHandle} defaultValue={detailData?.ypMax} />
            </Part>
            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>C%</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="cMin" onChange={eventHandle} defaultValue={detailData?.cmin} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="cMax" onChange={eventHandle} defaultValue={detailData?.cmax} />
            </Part>

            <Part style={{ marginTop: '35px' }}>
              <Title>
                <h4>EL</h4>
                <p></p>
              </Title>
              <CustomInput width={160} name="elMin" onChange={eventHandle} defaultValue={detailData?.elMin} />
              <span style={{ padding: '0px 5px' }}>~</span>
              <CustomInput width={160} name="elMax" onChange={eventHandle} defaultValue={detailData?.elMax} />
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

export default PreferEdit

const RadioContainer = styled.div`
  display: flex;
  width: 250px;
  justify-content: space-between;
`
