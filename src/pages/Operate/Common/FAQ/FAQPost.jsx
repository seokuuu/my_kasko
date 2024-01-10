import React, { useEffect, useState } from 'react'

import { FullWrap2, MainTitle, OnePageContainer, OnePageSubContainer } from '../../../../common/OnePage/OnePage.Styled'

import { CustomInput, CustomTextArea } from '../../../../common/Input/Input'
import { CustomSelect } from '../../../../common/Option/Main'
import { faqOptions } from '../../../../common/Option/SignUp'

import { useNavigate } from 'react-router-dom'
import { useFaqDetailsQuery, useFaqRegisterMutation, useFaqUpdateMutation } from '../../../../api/operate/faq'
import { BlackBtn, BtnWrap, WhiteBtn } from '../../../../common/Button/Button'
import AlertPopup from '../../../../modal/Alert/AlertPopup'
import { faqListSearchInitValue } from '../../constants'
import useConfirmMoal from '../../hook/useConfirmMoal'

/**
 * @description
 * FAQ 등록 및 수정(상세) 페이지
 */
const FAQPost = ({ detailsId }) => {
  const navigate = useNavigate()

  // 등록 폼
  const [form, setForm] = useState(faqListSearchInitValue)
  // 확인 모달 관련 값들
  const { popupSwitch, setPopupSwitch, setNowPopupType, nowPopup, setNowPopup, initConfirmModal } = useConfirmMoal()

  // FAQ 등록 API
  const { mutate: register } = useFaqRegisterMutation()
  // FAQ 수정 API
  const { mutate: update } = useFaqUpdateMutation()
  // FAQ 상세 API
  const { data } = useFaqDetailsQuery(detailsId)

  /**
   *
   * @description
   * 제목과 내용 인풋 이벤트 핸들러
   */
  function commonChangeHandler(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  /**
   *
   * @description
   * 셀렉트 이벤트 핸들러
   */
  function selectChangeHandler(e) {
    setForm((p) => ({ ...p, category: e }))
  }

  /**
   *@description
   등록 핸들러
   등록 폼 유효성 검사 및 모달 띄우기
   */
  function submitHandler() {
    if (form.category === '카테고리') {
      return alert('카테고리를 선택해주세요.')
    }

    if (!form.title) {
      return alert('제목을 입력해주세요.')
    }

    if (!form.content) {
      return alert('내용을 입력해주세요.')
    }
    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '저장하시겠습니까?',
      next: '1-12',
      func: () => submit()
    })
  }

  /**
   * @description
   * 등록 or 수정 API 요청
   * detailsId와 data가 있다면 수정 API 없다면 등록 API
   */
  const submit = () => {
    if (detailsId && data) {
      update({ ...form, category: form.category.label, uid: detailsId })
    } else {
      register({ ...form, category: form.category.label })
    }
  }

  // useEffect(() => {
  //   if (nowPopup.num === '1-12') {
  //     if (detailsId && data) {
  //       update({ ...form, category: form.category.label, uid: detailsId })
  //     } else {
  //       register({ ...form, category: form.category.label })
  //     }
  //     initConfirmModal()
  //   }
  // }, [nowPopup])

  /**
   * 상세 데이터값이 있다면 form 데이터 바인딩
   */

  useEffect(() => {
    if (detailsId && data) {
      setForm({
        title: data.title,
        content: data.content,
        category: faqOptions.find((f) => f.label === data.category) ?? faqOptions[0],
      })
    }
  }, [detailsId, data])

  return (
    <OnePageContainer>
      <MainTitle>FAQ {detailsId ? '저장' : '등록'}</MainTitle>
      <OnePageSubContainer>
        <FullWrap2>
          <div style={{ display: 'flex', margin: '10px auto' }}>
            <CustomSelect
              width={200}
              options={faqOptions}
              defaultValue={faqOptions[0]}
              value={form.category}
              onChange={selectChangeHandler}
            />
            <CustomInput
              placeholder="질문 내용을 입력해주세요."
              style={{ marginLeft: '10px' }}
              width={630}
              name="title"
              value={form.title}
              onChange={commonChangeHandler}
            />
          </div>
        </FullWrap2>
        <FullWrap2>
          <CustomTextArea
            placeholder="질문 상세 내용을 입력해주세요."
            name="content"
            value={form.content}
            onChange={commonChangeHandler}
          />
        </FullWrap2>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40} onClick={() => navigate('/operate/faq')}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40} onClick={submitHandler}>
          {detailsId ? '저장' : '등록'}
        </BlackBtn>
      </BtnWrap>
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </OnePageContainer>
  )
}

export default FAQPost
