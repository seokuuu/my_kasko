import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

import { BlackBtn, WhiteBtn } from '../../../../common/Button/Button'
import { CenterRectangleWrap } from '../../../../common/OnePage/OnePage.Styled'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import TextEditor from '../../../../components/Editor/TextEditor'

import { StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'

import { CheckBox } from '../../../../common/Check/Checkbox'

import { CheckImg2 } from '../../../../common/Check/CheckImg'

import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { usePopupDetailsQuery, usePopupRegisterMutation, usePopupUpdateMutation } from '../../../../api/operate/popup'
import { InputA, PropsInput } from '../../../../common/Input/Input'
import { CustomSelect } from '../../../../common/Option/Main'
import AlertPopup from '../../../../modal/Alert/AlertPopup'
import { ExCheckWrap } from '../../../../modal/External/ExternalFilter'
import { mainPopupSelectOptions } from '../../constants'
import useConfirmMoal from '../../hook/useConfirmMoal'
// 팝업 등록
const PopupPost = ({ isRegister }) => {
  const { id } = useParams()

  const navigate = useNavigate()

  // 등록/수정 폼
  const [form, setForm] = useState({
    title: '',
    content: '',
    link: '',
    status: 1,
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    position: mainPopupSelectOptions[0],
  })

  // 확인 모달 관련 값들
  const { popupSwitch, setPopupSwitch, setNowPopupType, nowPopup, setNowPopup, initConfirmModal } = useConfirmMoal()

  //  팝업 상세 API
  const { data } = usePopupDetailsQuery(id)

  console.log('상세 데이터 :', data)

  // 팝업 등록 API
  const { mutate: register } = usePopupRegisterMutation()

  // 팝업 등록 API
  const { mutate: update } = usePopupUpdateMutation()

  console.log('form :', form)
  // 인풋 핸들러(제목,링크)
  function commonChangeHandler(e) {
    const { name, value } = e.target

    setForm((p) => ({ ...p, [name]: value }))
  }

  // 날짜 핸들러(시작일,종료일)

  function dateHandler(date, name) {
    console.log('date :', date)
    setForm((p) => ({ ...p, [name]: date }))
  }
  // 등록/수정 핸들러

  function submitHandler() {
    if (!form.title) {
      return alert('제목을 입력해주세요.')
    }
    if (!form.content) {
      return alert('게시글을 입력해주세요.')
    }
    if (!form.link) {
      return alert('링크를 입력해주세요.')
    }

    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '저장하시겠습니까?',
      next: '1-12',
      func() {},
    })
  }
  const checkDummy = ['노출 안함']

  const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
  const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))

  useEffect(() => {
    const updatedCheck = checkDummy.map((value, index) => {
      return check[index] ? value : ''
    })
    // 그냥 배열에 담을 때
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check])

  /**
   * @description
   * 등록 or 수정 API 요청
   * detailsId와 data가 있다면 수정 API 없다면 등록 API
   */
  useEffect(() => {
    if (nowPopup.num === '1-12') {
      if (id && data) {
        update({
          ...form,
          status: form.status,
          position: form.position.value,
          popupTitle: '',
          startDate: moment(form.startDate).format('YYYY-MM-DD hh:mm:ss'),
          endDate: moment(form.endDate).format('YYYY-MM-DD hh:mm:ss'),
          uid: data.uid,
        })
      } else {
        register({
          ...form,
          status: form.status,
          position: form.position.value,
          popupTitle: '',
          startDate: moment(form.startDate).format('YYYY-MM-DD hh:mm:ss'),
          endDate: moment(form.endDate).format('YYYY-MM-DD hh:mm:ss'),
        })
      }
      initConfirmModal()
    }
  }, [nowPopup])

  /**
   * @description
   * 상세 데이터 존재시 데이터 바인딩
   */

  useEffect(() => {
    if (data && id) {
      console.log('startDate :', data.startDate)
      setCheck([Boolean(data.status)])
      setForm((p) => ({
        ...p,
        title: data.title,
        content: data.content,
        link: data.link,
        status: data.status,
        // startDate: new Date(data.startDate).toLocaleDateString(),
        startDate: moment(data.startDate).toDate(),
        endDate: moment(data.endDate).toDate(),
      }))
    }
  }, [data, id])
  return (
    <>
      <CenterRectangleWrap>
        <CRWMain>
          <h5>팝업 {isRegister ? '등록' : '수정'}</h5>
          <div style={{ marginBottom: '10px' }}>
            <PropsInput
              placeholder="제목을 입력해 주세요."
              name="title"
              value={form.title}
              onChange={commonChangeHandler}
            />
          </div>

          <TextEditor name="content" setState={setForm} value={data && data.content} />
          <BottomWrap>
            <BottomOne style={{ marginTop: '20px' }}>
              <div>노출 기간</div>
              <div>
                <ExCheckWrap>
                  {checkDummy.map((x, index) => (
                    <StyledCheckMainDiv>
                      <StyledCheckSubSquDiv
                        onClick={() => {
                          setCheck(CheckBox(check, check.length, index, true))
                          setForm((p) => ({ ...p, status: Number(check[0]) }))
                        }}
                        isChecked={check[index]}
                      >
                        <CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
                      </StyledCheckSubSquDiv>
                      <p style={{ fontSize: '16px' }}>{x}</p>
                    </StyledCheckMainDiv>
                  ))}
                </ExCheckWrap>
              </div>
            </BottomOne>
            <BottomOne>
              <div style={{ width: '48%' }}>
                <DateGrid startDate={form.startDate} setStartDate={(date) => dateHandler(date, 'startDate')} />
              </div>
              <div style={{ width: '48%' }}>
                <DateGrid startDate={form.endDate} setStartDate={(date) => dateHandler(date, 'endDate')} />
              </div>
            </BottomOne>
            <BottomOne style={{ margin: '20px 0px' }}>
              <div style={{ width: '48%' }}>
                <p style={{ marginBottom: '5px' }}>메인 팝업</p>
                <div>
                  <CustomSelect
                    style={{ width: '100%' }}
                    options={mainPopupSelectOptions}
                    defaultValue={mainPopupSelectOptions[0]}
                    value={form.position}
                    onChange={(e) => setForm((p) => ({ ...p, position: e }))}
                  />
                </div>
              </div>
              <div style={{ width: '48%' }}>
                <p style={{ marginBottom: '5px' }}>팝업 링크</p>
                <div style={{ width: '48%' }}>
                  <InputA
                    style={{ width: '209%' }}
                    placeholder="http://kasco.co.kr"
                    name="link"
                    value={form.link}
                    onChange={commonChangeHandler}
                  />
                </div>
              </div>
            </BottomOne>
          </BottomWrap>

          <CRWSub>
            <BtnWrap>
              <WhiteBtn
                width={90}
                height={50}
                style={{ marginRight: '10px' }}
                onClick={() => navigate('/operate/exposure')}
              >
                돌아가기
              </WhiteBtn>
              <BlackBtn width={90} height={50} onClick={submitHandler}>
                {isRegister ? '등록' : '수정 완료'}
              </BlackBtn>
            </BtnWrap>
          </CRWSub>
        </CRWMain>
        {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
      </CenterRectangleWrap>
    </>
  )
}

export default PopupPost

export const CRWMain = styled.div`
  width: 100%;

  h4 {
    margin-top: 20px;
  }

  h5 {
    margin: 30px auto;
    text-align: center;
    font-size: 24px;
  }

  h6 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 16px;
  }
`

export const CRWMainBottom = styled.div`
  width: 100%;
  height: fit-content;
  margin: 10px 0px;
  display: flex;
  justify-content: space-around;
`

export const CMBLeft = styled.div`
  width: 50%;

  > div {
    width: 400px;
    display: flex;
    margin: 10px auto;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CMBRight = styled.div`
  max-width: 50%;

  > div {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }
  height: fit-content;
`

export const CRWSub = styled.div`
  display: flex;
`

const BottomWrap = styled.div`
  display: block;
  justify-content: left;
  font-size: 16px;
  height: 200px;
`

const BtnWrap = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-evenly;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`

const BottomOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  align-items: center;
`
