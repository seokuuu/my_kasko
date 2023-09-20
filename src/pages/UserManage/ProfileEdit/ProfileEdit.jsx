import React, { useState } from 'react'
import {
  OnePageContainer,
  OnePageSubContainer,
  MainTitle,
  HalfWrap,
  Left,
  Right,
  Title,
  Part,
  At,
} from '../../../common/OnePage/OnePage.Styled'

import { CustomInput } from '../../../common/Input/Input'
import { CustomSelect } from '../../../common/Option/Main'
import { emailOptions } from '../../../common/Option/SignUp'

import { BtnWrap, BlackBtn, WhiteBtn } from '../../../common/Button/Button'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { patchProfile } from '../../../api/userManage'

const init = {
  title: '',
  password: '',
  passwordCheck: '',
  name: '',
  phone: '',
  email: '',
  businessNumber: '',
}

const ProfileEdit = () => {
  const [submitData, setSubmitData] = useState(init)
  const [emailPrefix, setEmailPrefix] = useState('')
  const mutation = useMutationQuery('', patchProfile)

  const eventHandle = (e) => {
    const { name, value } = e.target
    setSubmitData((prev) => ({ ...prev, [name]: value }))

    if (name === 'email') setEmailPrefix(e.target.value)
    setSubmitData({ ...submitData, [name]: value })
  }

  const handleDomainChange = (option) => {
    const label = option.label
    const emailForm = `${emailPrefix}@${label}`
    setSubmitData({ ...submitData, email: emailForm })
  }

  const submit = () => {
    const isNotSame = submitData.password !== submitData.passwordCheck
    if (isNotSame) return alert('비밀번호가 일치하지 않습니다')
    if (window.confirm('변경된 사항을 저장하시겠습니까?')) {
      mutation.mutate(submitData)
    }
  }
  return (
    <OnePageContainer>
      <MainTitle>개인정보 수정</MainTitle>
      <OnePageSubContainer>
        <HalfWrap>
          <Left>
            <Part>
              <Title>
                <h4>아이디</h4>
                <p></p>
              </Title>
              <CustomInput disabled width={340} name="id" />
            </Part>
            <Part>
              <Title>
                <h4>사용자 정보</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="직함 입력" width={135} name="title" onChange={eventHandle} />
              <CustomInput
                placeholder=" 성함 입력"
                width={200}
                style={{ marginLeft: '5px' }}
                name="name"
                onChange={eventHandle}
              />
            </Part>
            <Part>
              <Title>
                <h4>새 비밀번호</h4>
                <p></p>
              </Title>
              <CustomInput
                placeholder="영문, 숫자 조합 8 ~ 12자리"
                width={340}
                name="password"
                onChange={eventHandle}
              />
            </Part>
            <Part>
              <Title>
                <h4>새 비밀번호 확인</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="새 비밀번호 재입력" width={340} name="passwordCheck" onChange={eventHandle} />
            </Part>
          </Left>
          <Right>
            <Part>
              <Title>
                <h4>연락처</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="01012341234" width={340} name="phone" onChange={eventHandle} />
            </Part>
            <Part>
              <Title>
                <h4>이메일</h4>
                <p></p>
              </Title>
              <div style={{ display: 'flex' }}>
                <CustomInput placeholder="아이디 입력" width={120} name="email" onChange={eventHandle} /> <At>@</At>
                <CustomSelect
                  width={200}
                  options={emailOptions}
                  defaultValue={emailOptions[0]}
                  onChange={handleDomainChange}
                />
              </div>
            </Part>
            <Part>
              <Title>
                <h4>사업자 번호</h4>
                <p></p>
              </Title>
              <CustomInput placeholder="'-'제외한 숫자 입력" width={340} name="businessNumber" onChange={eventHandle} />
            </Part>
          </Right>
        </HalfWrap>
      </OnePageSubContainer>
      <BtnWrap bottom={-200}>
        {/* <WhiteBtn width={40} height={40}>
          돌아가기
        </WhiteBtn> */}
        <BlackBtn width={40} height={40} onClick={submit}>
          저장
        </BlackBtn>
      </BtnWrap>
    </OnePageContainer>
  )
}

export default ProfileEdit
