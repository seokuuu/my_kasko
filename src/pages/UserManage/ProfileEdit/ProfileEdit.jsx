import React, { useEffect, useState } from 'react'
import {
	HalfWrap,
	Left,
	MainTitle,
	OnePageSubContainer,
	Part,
	Right,
	Title,
} from '../../../common/OnePage/OnePage.Styled'

import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { getProfile, patchProfile } from '../../../api/userManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMsg } from '../../User/SignUp/style'
import { styled } from 'styled-components'
import useAlert from '../../../store/Alert/useAlert'

const ProfileEdit = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const {
		handleSubmit,
		register,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm({ mode: 'onSubmit' })

	const mutation = useMutationQuery('', patchProfile)
	const { data } = useReactQuery('', 'getProfile', getProfile)

	const submit = (data) => {
		simpleConfirm('변경된 사항을 저장하시겠습니까?', () => {
			mutation.mutate(data, {
				onError: (error) => {
					simpleAlert('에러가 발생했습니다' + error.message)
				},
				onSuccess: () => {
					simpleAlert('성공하였습니다.')
				},
			})
		})
	}

	useEffect(() => {
		const resData = data?.data?.data
		if (resData) {
			setValue('uid', resData.uid)
			setValue('id', resData.id)
			setValue('title', resData.title)
			setValue('name', resData.name)
			setValue('phone', resData.phone)
			setValue('email', resData.email)
			setValue('businessNumber', resData.businessNumber)
		}
	}, [data])

	return (
		<OnePageContainer>
			<form onSubmit={handleSubmit(submit)}>
				<MainTitle>개인정보 수정</MainTitle>
				<OnePageSubContainer>
					<HalfWrap>
						<Left>
							<Part>
								<Title>
									<h4>아이디</h4>
								</Title>
								<CustomInput disabled name="id" value={watch('id')} />
							</Part>
							<Part>
								<Title>
									<h4>사용자 정보</h4>
									{errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}
									{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
								</Title>
								<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<CustomInput
										placeholder="직함 입력"
										name="title"
										value={watch('title')}
										{...register('title', { required: '직함을 입력해 주세요.' })}
									/>
									<CustomInput
										placeholder=" 성함 입력"
										style={{ marginLeft: '5px' }}
										value={watch('name')}
										{...register('name', { required: '성함을 입력해 주세요.' })}
									/>
								</div>
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
											// required: '비밀번호를 입력해주세요.',
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
												type="password"
												onChange={(e) => field.onChange(e)}
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
											// required: '비밀번호를 확인해주세요.',
											validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
										}}
										render={({ field }) => (
											<CustomInput
												{...field}
												placeholder="새 비밀번호 재입력"
												type="password"
												onChange={(e) => field.onChange(e)}
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
									{errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
								</Title>
								<CustomInput
									placeholder="연락처 입력"
									value={watch('phone')}
									maxLength="11"
									{...register('phone', {
										required: '연락처를 입력해주세요.',
										pattern: {
											value: /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/,
											message: '올바른 번호가 아닙니다.',
										},
									})}
								/>
							</Part>
							<Part>
								<Title>
									<h4>이메일</h4>
									{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
								</Title>
								<CustomInput
									placeholder="example@email.com"
									value={watch('email')}
									{...register('email', {
										required: '이메일을 입력해 주세요.',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: '올바른 이메일 형식이 아닙니다.',
										},
									})}
								/>
							</Part>
							<Part>
								<Title>
									<h4>사업자 번호</h4>
									{errors.businessNumber && <ErrorMsg>{errors.businessNumber.message}</ErrorMsg>}
								</Title>
								<CustomInput
									placeholder="'-'제외한 숫자 입력"
									name="businessNumber"
									value={watch('businessNumber')}
									{...register('businessNumber', {
										required: '사업자 번호를 입력해 주세요.',
										pattern: {
											value: /^[0-9]{3}[0-9]{2}[0-9]{5}$/,
											message: '올바른 사업자 등록 번호가 아닙니다.',
										},
									})}
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

export const OnePageContainer = styled.div`
	width: 800px;
	height: 100vh;
	margin: 0 auto;
	background-color: white;
`

export const CustomInput = styled.input`
	font-size: 16px;
	width: 100%;
	height: 40px;
	border: 1px solid #c1c1c1c5;
`
export default ProfileEdit
