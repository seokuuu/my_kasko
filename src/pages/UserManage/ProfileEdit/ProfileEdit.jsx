import React, { useEffect, useState } from 'react'
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

import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { getProfile, patchProfile } from '../../../api/userManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMsg } from '../../User/SignUp/style'

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
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ mode: 'onBlur' })
  const [submitData, setSubmitData] = useState(init)

  const mutation = useMutationQuery('', patchProfile)
  const { isSuccess, isError, data } = useReactQuery('', 'getProfile', getProfile)
  const resData = data?.data?.data

  if (isSuccess) console.log('SUCCESS')
  if (isError) alert('ERROR')

  const eventHandle = (e) => {
    const { name, value } = e.target
    setSubmitData((prev) => ({ ...prev, [name]: value }))
  }

  const submit = () => {
    if (window.confirm('변경된 사항을 저장하시겠습니까?')) {
      mutation.mutate(submitData, {
        onError: (error) => {
          alert('에러가 발생했습니다' + error.message)
        },
        onSuccess: () => {
          // TODO 성공 후 처리
        },
      })
    }
  }

  const password = watch('password')

  useEffect(() => {
    if (resData) {
      setSubmitData({
        ...resData,
        password: '',
      })
    }
  }, [])

  return (
    <OnePageContainer>
      <form onSubmit={handleSubmit(submit)}>
        <MainTitle>개인정보 수정 </MainTitle>
        <OnePageSubContainer>
          <HalfWrap>
            <Left>
              <Part>
                <Title>
                  <h4>아이디</h4>
                  <p></p>
                </Title>
                <CustomInput disabled width={340} name="id" value={submitData && submitData.id} />
              </Part>
              <Part>
                <Title>
                  <h4>사용자 정보</h4>
                  <p></p>
                </Title>
                <CustomInput
                  placeholder="직함 입력"
                  width={135}
                  name="title"
                  onChange={eventHandle}
                  value={submitData && submitData.title}
                />
                <CustomInput
                  placeholder=" 성함 입력"
                  width={200}
                  style={{ marginLeft: '5px' }}
                  name="name"
                  onChange={eventHandle}
                  value={submitData && submitData.name}
                />
              </Part>
              <Part>
                <Title>
                  <h4>새 비밀번호</h4>
                  {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
                </Title>
                <div>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: '비밀번호를 입력해주세요.',
                      minLength: {
                        value: 8,
                        message: '비밀번호는 최소 8자 이상이어야 합니다.',
                      },
                      maxLength: {
                        value: 12,
                        message: '비밀번호는 최대 12자까지 가능합니다.',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/,
                        message: '영문과 숫자를 조합해주세요.',
                      },
                    }}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        placeholder="영문, 숫자 조합 8 ~ 12자리"
                        width={340}
                        type="password"
                        onChange={(e) => {
                          field.onChange(e)
                          eventHandle(e)
                        }}
                      />
                    )}
                  />
                </div>
              </Part>
              <Part>
                <Title>
                  <h4>새 비밀번호 확인</h4>
                  {errors.passwordCheck && <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>}
                </Title>
                <div>
                  <Controller
                    name="passwordCheck"
                    control={control}
                    rules={{
                      required: '비밀번호를 확인해주세요.',
                      validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
                    }}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        placeholder="새 비밀번호 재입력"
                        width={340}
                        type="password"
                        onChange={(e) => {
                          field.onChange(e)
                          eventHandle(e)
                        }}
                      />
                    )}
                  />
                </div>
              </Part>
            </Left>
            <Right>
              <Part>
                <Title>
                  <h4>연락처</h4>
                  <p></p>
                </Title>
                <CustomInput
                  placeholder="연락처 입력"
                  value={submitData && submitData.phone}
                  width={340}
                  name="phone"
                  onChange={eventHandle}
                />
              </Part>
              <Part>
                <Title>
                  <h4>이메일</h4>
                  <p></p>
                </Title>
                <CustomInput
                  placeholder="example@email.com"
                  value={submitData && submitData.email}
                  width={340}
                  name="email"
                  onChange={eventHandle}
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
                  name="businessNumber"
                  onChange={eventHandle}
                  value={submitData && submitData.businessNumber}
                />
              </Part>
            </Right>
          </HalfWrap>
        </OnePageSubContainer>

        <BtnWrap bottom={-200}>
          <BlackBtn width={40} height={40} type="submit">
            저장
          </BlackBtn>
        </BtnWrap>
      </form>
    </OnePageContainer>
  )
}

export default ProfileEdit
