import React, { useEffect, useState } from 'react'
import {
  At,
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
import { CustomSelect } from '../../../common/Option/Main'
import { emailOptions } from '../../../common/Option/SignUp'

import { useFooterMutation, useFooterQuery } from '../../../api/operate'
import { BlackBtn, BtnWrap, WhiteBtn } from '../../../common/Button/Button'
import './type.d'
const FooterManage = () => {
  /**
   * @description
   * API
   * ----------------------------------------------------------------------------------------------------------------------------------------------------------
   */
  // 푸터 조회
  const { data } = useFooterQuery()

  // 푸터 변경
  const { mutate } = useFooterMutation()
  /**
   * ----------------------------------------------------------------------------------------------------------------------------------------------------------
   */
  /**
   * @type {useState<formState>} state
   */
  const [form, setForm] = useState({ address: '', email: '', fax: '', name: '', number: '', phone: '' })

  // 이메일 도메인(셀렉트 옵션)
  const [emailDomain, setEmailDomain] = useState(emailOptions[0])

  const [emailText, setEmailText] = useState('')

  console.log('이메일 도메인 :', emailDomain)

  /**
   * @description
   * 인풋 핸들러
   */
  function commonChangeHandler(e) {
    const { name, value } = e.target

    setForm((p) => ({ ...p, [name]: value }))
  }

  /**
   * @description
   * 저장 핸들러
   */

  function submitHandler() {
    // uid 값이 없으면 null 값으로 전송
    mutate({ ...form, email: form.email + '@' + emailDomain.label, uid: data?.uid ?? null })
  }

  /**
   * @description
   * @param {string} email
   * @returns {Email}
   * 이메일 도메인 분리함수
   * email에서 @ 기준으로 prefix와 domain을 구분하여 반환해준다
   *
   */
  function separateDomain(email) {
    const sepArr = email.split('@')

    if (sepArr.length === 2) {
      const prefix = sepArr[0]
      const domain = emailOptions.find((e) => e.label === sepArr[1]) ?? emailOptions[0]
      return {
        prefix,
        domain,
      }
    } else {
      return {
        prefix: email,
        domain: emailOptions[0],
      }
    }
  }

  useEffect(() => {
    if (data) {
      const defaultEmailValue = {
        prefix: '',
        domain: emailOptions[0],
      }

      // data.email 값이 nullish 하다면 defaultEmailValue 값 할당
      const { prefix, domain } = separateDomain(data?.email ?? defaultEmailValue)

      console.log('domain :', domain)

      setForm({
        name: data?.name ?? '',
        address: data?.address ?? '',
        email: prefix,
        phone: data?.phone ?? '',
        fax: data?.fax ?? '',
        number: data?.number ?? '',
      })
      setEmailDomain(domain)
    }
  }, [data])

  console.log('emailText :', emailText)
  return (
    <OnePageContainer>
      <MainTitle>푸터 관리</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            {/* <Part>
              <Title>
                <h4>상호명</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="상호명을 입력해주세요."
                width={340}
                name={'name'}
                value={form.name}
                onChange={commonChangeHandler}
              />
            </Part> */}
            <Part>
              <Title>
                <h4>주소</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="주소를 입력해주세요."
                width={340}
                name="address"
                value={form.address}
                onChange={commonChangeHandler}
              />
            </Part>
            <Part>
              <Title>
                <h4>이메일</h4>
                <p></p>
              </Title>
              <div style={{ display: 'flex' }}>
                <CustomInput
                  placeholder="아이디 입력"
                  width={120}
                  name="email"
                  value={form.email}
                  onChange={commonChangeHandler}
                />
                <At>@</At>
                <CustomSelect
                  width={200}
                  options={emailOptions}
                  defaultValue={emailDomain[0]}
                  value={emailDomain}
                  onChange={setEmailDomain}
                  inputValue={emailText}
                  onInputChange={setEmailText}
                />
              </div>
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>대표명</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="대표명을 입력해주세요."
                width={340}
                name="name"
                value={form.name}
                onChange={commonChangeHandler}
              />
            </Part>

            <Part>
              <Title>
                <h4>대표 번호</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="'-'제외한 숫자 입력"
                width={340}
                name="phone"
                value={form.phone}
                onChange={commonChangeHandler}
              />
            </Part>
            <Part>
              <Title>
                <h4>팩스 번호</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="'-'제외한 숫자 입력"
                width={340}
                name="fax"
                value={form.fax}
                onChange={commonChangeHandler}
              />
            </Part>
            <Part>
              <Title>
                <h4>사업자 번호</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="'-'제외한 숫자 입력"
                width={340}
                name="number"
                value={form.number}
                onChange={commonChangeHandler}
              />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        <WhiteBtn width={40} height={40}>
          돌아가기
        </WhiteBtn>
        <BlackBtn width={40} height={40} onClick={submitHandler}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default FooterManage
