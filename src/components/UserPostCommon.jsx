import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { styled } from 'styled-components'
import { checkBusinessId, checkDuplicateId } from '../api/auth'
import { queryClient } from '../api/query'
import { getStorageList } from '../api/search'
import { getCustomerDetail, postClient, resetCustomer, updateClient } from '../api/userManage'
import { BlackBtn, WhiteBtn } from '../common/Button/Button'
import { FlexInput } from '../common/Input/Input'
import { Bar, FlexContent, FlexPart, FlexTitle, Left, Right } from '../common/OnePage/OnePage.Styled'
import { MainSelect } from '../common/Option/Main'
import { AccountSelect } from '../common/Option/SignUp'
import { getBankNames } from '../constants/banks'
import useReactQuery from '../hooks/useReactQuery'
import useAlert from '../store/Alert/useAlert'
import DownloadButton from '../utils/DownloadButton'
import AddressFinder from './DaumPost/Address'

export default function UserPostCommon({ id, isCustomer = false, closeModal = null }) {
	const bankList = getBankNames()
	const { simpleAlert, simpleConfirm } = useAlert()
	const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)

	const {
		register,
		handleSubmit,
		setError,
		getValues,
		setValue,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onSubmit',
		defaultValues: {
			type: '개인',
			businessType: '유통',
			approvalStatus: '승인',
			auctionStatus: '제한 없음',
			status: '일반',
			memberType: '고객사',
		},
	})

	// 창고
	const [storage, setStorage] = useState('')

	// 은행
	const [bank, setBank] = useState('')

	// ID 중복체크 여부
	const [idDupleCheck, setIdDupleCheck] = useState(false)

	const [originalBusinessNumber, setOriginalBusinessNumber] = useState()

	// 사업자 번호 중복체크 여부
	const [busIdDupleCheck, setBusIdDupleCheck] = useState(!!id)

	// 비밀번호 변경 여부
	const [isPasswordChange, setIsPasswordChange] = useState(false)

	// 고객사 상세
	const getCustomer = async () => {
		const response = await getCustomerDetail(id)
		const customerData = response?.data?.data
		for (const [key, value] of Object.entries(customerData)) {
			if (key === 'businessNumberOriginalName') {
				setValue('businessNumberFile', value)
				continue
			}
			if (key === 'bankbookOriginalName') {
				setValue('bankbookFile', value)
				continue
			}
			setValue(key, value)
		}
		setBusIdDupleCheck(true)
		setOriginalBusinessNumber(customerData?.businessNumber)
		setBank(customerData.bank)
	}

	// 아이디 중복체크
	const onDuplicateCheckClick = async () => {
		const userId = getValues('id')
		const idFormatRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/
		if (userId?.length < 4 || !idFormatRegex.test(userId)) {
			setError('id', {
				type: 'format',
				message: '아이디는 영문, 숫자 조합 4-12자리를 사용해 주세요.',
			})
			return simpleAlert('아이디는 영문, 숫자 조합 4-12자리를 사용해 주세요.')
		}
		try {
			await checkDuplicateId(userId)
			setIdDupleCheck(true)
			simpleAlert('사용 가능한 아이디 입니다.')
		} catch (error) {
			setIdDupleCheck(false)
			simpleAlert('이미 사용 중인 아이디 입니다.')
		}
	}

	/**  사업자 번호 중복 체크 */
	const handleBusIdDupleCheck = async () => {
		const businessNumber = watch('businessNumber')
		const idRegex = /^[0-9]{3}[0-9]{2}[0-9]{5}$/
		if (!businessNumber || !idRegex.test(businessNumber)) {
			return simpleAlert('올바른 사업자 등록 번호가 아닙니다.')
		}
		try {
			await checkBusinessId(businessNumber)
			simpleAlert('사용 가능한 사업자 번호입니다.')
			setBusIdDupleCheck(true)
		} catch (e) {
			simpleAlert('이미 등록된 사업자 번호입니다.')
			setBusIdDupleCheck(false)
		}
	}

	const onSubmit = async (data) => {
		const requestData = {
			...data,
			bank,
			businessType: Array.isArray(data.businessType) ? data.businessType : [data.businessType],
			storage: storage.label,
			address: data.address.address,
			addressDetail: data.address.addressDetail,
		}
		const fileData = {
			registration: data.businessNumberFile[0],
			bankBook: data.bankbookFile[0],
		}
		try {
			await postClient(requestData, fileData)
			simpleAlert('회원 생성이 완료되었습니다.', () => {
				queryClient.invalidateQueries('getClient')
				if (closeModal) {
					closeModal()
				}
			})
		} catch (err) {
			simpleAlert(`${err.data.message || '등록 실패하였습니다.'}`)
		}
	}

	const onUpdate = async (data) => {
		const requestData = {
			...data,
			bank,
			businessType: Array.isArray(data.businessType) ? data.businessType : [data.businessType],
			storage: storage.label,
			address: data.address.address ?? data.address,
			addressDetail: data.address.addressDetail ?? data.addressDetail,
		}
		try {
			await updateClient(requestData)
			simpleAlert('수정이 완료되었습니다.', () => {
				queryClient.invalidateQueries('getClient')
				if (closeModal) {
					closeModal()
				}
			})
		} catch (err) {
			simpleAlert(`${err.data.message || '수정 실패하였습니다.'}`)
		}
	}

	// -------------------------------------------------------------------------------

	// 비밀번호 초기화 버튼
	const resetPw = async () => {
		const req = {
			id: getValues('id'),
		}
		simpleConfirm('비밀번호를 초기화하시겠습니까?', async () => {
			try {
				await resetCustomer(req)
				simpleAlert(`비밀번호가 초기화되었습니다.`)
			} catch (err) {
				console.error('resetPw API error : ', err)
				simpleAlert(`Error : ${err.data.message}`)
			}
		})
	}

	useEffect(() => {
		if (id) getCustomer()
	}, [id])

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (name === 'id') {
				setIdDupleCheck(false)
			}
			if (name === 'memberType') {
				const isKasko =
					value['memberType'] === '카스코철강' ||
					(originalBusinessNumber && value['memberType'] === originalBusinessNumber)
				setBusIdDupleCheck(isKasko)
			}
		})
		return () => subscription.unsubscribe()
	}, [watch])

	return (
		<>
			<Container width={1200} onSubmit={handleSubmit(id ? onUpdate : onSubmit)}>
				<MainContainer>
					<Left style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
						<h1>회원정보</h1>
						<Bar />
						{id ? (
							<FlexPart>
								<FlexTitle>
									아이디<span>*</span>
								</FlexTitle>
								<FlexContent>
									<FlexInput disabled={true} {...register('id')} />
								</FlexContent>
							</FlexPart>
						) : (
							<FlexPart>
								<FlexTitle>
									아이디<span>*</span>
									{errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}
								</FlexTitle>
								<FlexContent>
									<Controller
										name="id"
										control={control}
										rules={{
											required: '아이디를 입력해주세요.',
											validate: () => idDupleCheck || '중복 확인을 해주세요.',
										}}
										render={({ field }) => <FlexInput {...field} type="text" />}
									/>
									<CheckBtn
										onClick={onDuplicateCheckClick}
										type="button"
										disabled={idDupleCheck}
										style={{ fontSize: 14 }}
									>
										중복 확인
									</CheckBtn>
								</FlexContent>
							</FlexPart>
						)}
						{isCustomer ? (
							isPasswordChange ? (
								<>
									<FlexPart>
										<FlexTitle>
											비밀번호<span>*</span>
											{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
										</FlexTitle>
										<FlexContent style={{ position: 'relative' }}>
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
													<FlexInput
														{...field}
														placeholder="영문, 숫자 조합 8~12자리"
														type="password"
														isError={!!errors.password}
													/>
												)}
											/>
										</FlexContent>
									</FlexPart>

									<FlexPart>
										<FlexTitle name="">
											비밀번호 확인<span>*</span>
											{errors.passwordCheck && <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>}
										</FlexTitle>
										<FlexContent>
											<Controller
												name="passwordCheck"
												control={control}
												rules={{
													required: '비밀번호를 확인해주세요.',
													validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
												}}
												render={({ field }) => (
													<FlexInput
														{...field}
														isError={!!errors.passwordCheck}
														placeholder="비밀번호 재입력"
														type="password"
													/>
												)}
											/>
										</FlexContent>
									</FlexPart>
								</>
							) : (
								<FlexPart>
									<FlexTitle>비밀번호 변경</FlexTitle>
									<FlexContent>
										<FlexInputBtn onClick={() => setIsPasswordChange(true)}>비밀번호 변경</FlexInputBtn>
									</FlexContent>
								</FlexPart>
							)
						) : !!id ? (
							<FlexPart>
								<FlexTitle>비밀번호 초기화</FlexTitle>
								<FlexContent>
									<FlexInputBtn onClick={resetPw}>비밀번호 초기화</FlexInputBtn>
								</FlexContent>
							</FlexPart>
						) : (
							<>
								<FlexPart>
									<FlexTitle>
										비밀번호<span>*</span>
										{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
									</FlexTitle>
									<FlexContent style={{ position: 'relative' }}>
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
												<FlexInput
													{...field}
													placeholder="영문, 숫자 조합 8~12자리"
													type="password"
													isError={!!errors.password}
												/>
											)}
										/>
									</FlexContent>
								</FlexPart>

								<FlexPart>
									<FlexTitle name="">
										비밀번호 확인<span>*</span>
										{errors.passwordCheck && <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>}
									</FlexTitle>
									<FlexContent>
										<Controller
											name="passwordCheck"
											control={control}
											rules={{
												required: '비밀번호를 확인해주세요.',
												validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
											}}
											render={({ field }) => (
												<FlexInput
													{...field}
													isError={!!errors.passwordCheck}
													placeholder="비밀번호 재입력"
													type="password"
												/>
											)}
										/>
									</FlexContent>
								</FlexPart>
							</>
						)}

						<FlexPart>
							<FlexTitle>
								경매 담당자 정보<span>*</span>
								{errors.memberName && <ErrorMsg>{errors.memberName.message}</ErrorMsg>}
								{errors.memberTitle && <ErrorMsg>{errors.memberTitle.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent style={{ gap: '8px' }}>
								<FlexInput
									type="text"
									name="memberName"
									isError={!!errors.memberName}
									placeholder="담당자 성함 입력"
									{...register('memberName', { required: '내용을 확인해 주세요.' })}
								/>
								<FlexInput
									type="text"
									name="memberTitle"
									isError={!!errors.memberTitle}
									placeholder="직함 입력"
									{...register('memberTitle', { required: '내용을 확인해 주세요.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								이메일<span>*</span>
								{errors.memberEmail && <ErrorMsg>{errors.memberEmail.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									placeholder="example@email.com"
									// value={getValues('memberEmail')}
									{...register('memberEmail', {
										required: '이메일을 입력해 주세요.',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: '올바른 이메일 형식이 아닙니다.',
										},
									})}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								휴대폰 번호<span>*</span>
								{errors.memberPhone && <ErrorMsg>{errors.memberPhone.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									placeholder="연락처 입력('-' 제외)"
									name="memberPhone"
									isError={!!errors.memberPhone}
									maxLength="11"
									{...register('memberPhone', {
										required: '필수 입력 항목입니다.',
										pattern: {
											value: /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/,
											message: '올바른 번호가 아닙니다.',
										},
									})}
								/>
							</FlexContent>
						</FlexPart>
						{!isCustomer && (
							<>
								<FlexPart style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
									<FlexTitle>
										승인 여부<span>*</span>
									</FlexTitle>
									<FlexContent style={{ width: '100%' }}>
										<div
											style={{
												display: 'flex',
												gap: '12px',
											}}
										>
											<RadioLabel>
												<input
													type="radio"
													value="승인"
													{...register('approvalStatus', { required: true })}
													checked={watch('approvalStatus') === '승인'}
												/>
												승인
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="대기"
													{...register('approvalStatus', { required: true })}
													checked={watch('approvalStatus') === '대기'}
												/>
												대기
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="미승인"
													{...register('approvalStatus', { required: true })}
													checked={watch('approvalStatus') === '미승인'}
												/>
												미승인
											</RadioLabel>
										</div>
									</FlexContent>
								</FlexPart>
								<FlexPart style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
									<FlexTitle>
										회원 상태<span>*</span>
									</FlexTitle>
									<FlexContent style={{ width: '100%' }}>
										<div
											style={{
												display: 'flex',
												gap: '12px',
											}}
										>
											<RadioLabel>
												<input
													type="radio"
													value="일반"
													{...register('status', { required: true })}
													checked={watch('status') === '일반'}
												/>
												일반
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="폐업"
													{...register('status', { required: true })}
													checked={watch('status') === '폐업'}
												/>
												폐업
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="정지"
													{...register('status', { required: true })}
													checked={watch('status') === '정지'}
												/>
												정지
											</RadioLabel>
										</div>
									</FlexContent>
								</FlexPart>
								<FlexPart style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
									<FlexTitle>
										회원 제한<span>*</span>
									</FlexTitle>
									<FlexContent style={{ width: '100%' }}>
										<div
											style={{
												display: 'flex',
												gap: '12px',
											}}
										>
											<RadioLabel>
												<input
													type="radio"
													value="제한 없음"
													{...register('auctionStatus', { required: true })}
													checked={watch('auctionStatus') === '제한 없음'}
												/>
												제한 없음
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="시작가 제한"
													{...register('auctionStatus', { required: true })}
													checked={watch('auctionStatus') === '시작가 제한'}
												/>
												시작가 제한
											</RadioLabel>
											<RadioLabel>
												<input
													type="radio"
													value="경매 제한"
													{...register('auctionStatus', { required: true })}
													checked={watch('auctionStatus') === '경매 제한'}
												/>
												경매 제한
											</RadioLabel>
										</div>
									</FlexContent>
								</FlexPart>
							</>
						)}
						{!id && (
							<FlexPart style={{ flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
								<FlexTitle>
									사용자 구분<span>*</span>
								</FlexTitle>
								<FlexContent style={{ width: '100%' }}>
									<div
										style={{
											display: 'flex',
											gap: '12px',
										}}
									>
										<RadioLabel>
											<input
												type="radio"
												value="창고"
												{...register('memberType', { required: true })}
												checked={watch('memberType') === '창고'}
											/>
											창고
										</RadioLabel>
										<RadioLabel>
											<input
												type="radio"
												value="운송사"
												{...register('memberType', { required: true })}
												checked={watch('memberType') === '운송사'}
											/>
											운송사
										</RadioLabel>
										<RadioLabel>
											<input
												type="radio"
												value="현대제철"
												{...register('memberType', { required: true })}
												checked={watch('memberType') === '현대제철'}
											/>
											현대제철
										</RadioLabel>
										<RadioLabel>
											<input
												type="radio"
												value="카스코철강"
												{...register('memberType', { required: true })}
												checked={watch('memberType') === '카스코철강'}
											/>
											카스코철강
										</RadioLabel>
										<RadioLabel>
											<input
												type="radio"
												value="고객사"
												{...register('memberType', { required: true })}
												checked={watch('memberType') === '고객사'}
											/>
											고객사
										</RadioLabel>
									</div>
								</FlexContent>
							</FlexPart>
						)}
						{watch('memberType') === '운송사' && (
							<FlexPart>
								<FlexTitle>
									운송사 이름<span>*</span>
									{errors.transportName && <ErrorMsg>{errors.transportName.message}</ErrorMsg>}
								</FlexTitle>
								<FlexContent>
									<FlexInput
										name="transportName"
										disabled={!!id}
										{...register('transportName', { required: '운송사 이름을 입력해주세요.' })}
									/>
								</FlexContent>
							</FlexPart>
						)}
						{watch('memberType') === '창고' && (
							<FlexPart>
								<FlexTitle>
									창고 구분<span>*</span>
								</FlexTitle>
								<FlexContent>
									{id ? (
										<FlexInput name="storage" disabled={true} {...register('storage')} />
									) : (
										<MainSelect
											name="storage"
											options={storageList}
											value={storageList[storageList.findIndex((item) => item.label === storage)]}
											onChange={(e) => setStorage(e)}
										/>
									)}
								</FlexContent>
							</FlexPart>
						)}
						{/*{watch('memberType') === '카스코철강' && (*/}
						{/*	<FlexPart style={{ alignItems: 'start', flexDirection: 'column', gap: '20px' }}>*/}
						{/*		<FlexTitle>권한 설정</FlexTitle>*/}
						{/*		<FlexContent style={{ width: '100%', flexWrap: 'wrap', gap: '20px' }}>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="재고관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '재고관리'}*/}
						{/*				/>*/}
						{/*				재고관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="경매관리"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '경매관리'}*/}
						{/*				/>*/}
						{/*				경매관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="상시판매"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '상시판매'}*/}
						{/*				/>*/}
						{/*				상시판매*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="판매제품 관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '판매제품 관리'}*/}
						{/*				/>*/}
						{/*				판매제품 관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="주문관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '주문관리'}*/}
						{/*				/>*/}
						{/*				주문관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="출고관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '출고관리'}*/}
						{/*				/>*/}
						{/*				출고관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="기준관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '기준관리'}*/}
						{/*				/>*/}
						{/*				기준관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="사용자관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '사용자관리'}*/}
						{/*				/>*/}
						{/*				사용자관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="운영관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '운영관리'}*/}
						{/*				/>*/}
						{/*				운영관리*/}
						{/*			</RadioLabel>*/}
						{/*			<RadioLabel>*/}
						{/*				<input*/}
						{/*					type="checkbox"*/}
						{/*					value="재고수불관리"*/}
						{/*					name="managerRoleList"*/}
						{/*					{...register('managerRoleList')}*/}
						{/*					// checked={watch('managerRoleList') === '재고수불관리'}*/}
						{/*				/>*/}
						{/*				재고수불관리*/}
						{/*			</RadioLabel>*/}
						{/*		</FlexContent>*/}
						{/*	</FlexPart>*/}
						{/*)}*/}

						<Bar />

						<FlexPart>
							<FlexTitle>
								입금 담당자 정보<span>*</span>
								{errors.depositManagerName && <ErrorMsg>{errors.depositManagerName.message}</ErrorMsg>}
								{errors.depositManagerTitle && <ErrorMsg>{errors.depositManagerTitle.message}</ErrorMsg>}
							</FlexTitle>

							<FlexContent style={{ gap: '8px' }}>
								<FlexInput
									name="depositManagerName"
									isError={!!errors.depositManagerName}
									placeholder="담당자 성함 입력"
									{...register('depositManagerName', { required: '내용을 확인해 주세요.' })}
								/>
								<FlexInput
									name="depositManagerTitle"
									isError={!!errors.depositManagerTitle}
									placeholder="직함 입력"
									{...register('depositManagerTitle', { required: '내용을 확인해 주세요.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								휴대폰 번호<span>*</span>
								{errors.depositManagerPhone && <ErrorMsg>{errors.depositManagerPhone.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									placeholder="연락처 입력('-' 제외)"
									name="depositManagerPhone"
									maxLength="11"
									isError={!!errors.phone}
									{...register('depositManagerPhone', {
										required: '필수 입력 항목입니다.',
										pattern: {
											value: /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/,
											message: '올바른 번호가 아닙니다.',
										},
									})}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								입출고 담당자 정보<span>*</span>
								{errors.releaseManagerName && <ErrorMsg>{errors.releaseManagerName.message}</ErrorMsg>}
							</FlexTitle>

							<FlexContent style={{ gap: '8px' }}>
								<FlexInput
									name="releaseManagerName"
									isError={!!errors.releaseManagerName}
									placeholder="담당자 성함 입력"
									{...register('releaseManagerName', { required: '내용을 확인해 주세요.' })}
								/>
								<FlexInput
									name="releaseManagerTitle"
									isError={!!errors.releaseManagerTitle}
									placeholder="직함 입력"
									{...register('releaseManagerTitle', { required: '내용을 확인해 주세요.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								휴대폰 번호<span>*</span>
								{errors.releaseManagerPhone && <ErrorMsg>{errors.releaseManagerPhone.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									placeholder="연락처 입력('-' 제외)"
									name="releaseManagerPhone"
									maxLength="11"
									isError={!!errors.releaseManagerPhone}
									{...register('releaseManagerPhone', {
										required: '필수 입력 항목입니다.',
										pattern: {
											value: /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/,
											message: '올바른 번호가 아닙니다.',
										},
									})}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart></FlexPart>
					</Left>
					{/* -------------------------------------------------------------- */}
					<Right style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
						<h1>비즈니스 정보</h1>
						<Bar />
						<FlexPart>
							<FlexTitle>
								사업자 구분<span>*</span>
							</FlexTitle>
							<FlexContent>
								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<RadioLabel>
										<input
											type="radio"
											value="개인"
											name="type"
											checked={watch('type') === '개인'}
											{...register('type', { required: true })}
										/>
										개인
									</RadioLabel>
									<RadioLabel>
										<input
											type="radio"
											value="법인(주)"
											name="type"
											checked={watch('type') === '법인(주)'}
											{...register('type', { required: true })}
										/>
										법인(주)
									</RadioLabel>
									<RadioLabel>
										<input
											type="radio"
											value="법인(유)"
											name="type"
											checked={watch('type') === '법인(유)'}
											{...register('type', { required: true })}
										/>
										법인(유)
									</RadioLabel>
								</div>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								회사 명<span>*</span>
								{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									type="text"
									name="name"
									isError={!!errors.name}
									placeholder="회사명 입력"
									{...register('name', { required: '내용을 확인해 주세요.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								대표자 성명<span>*</span>
								{errors.ceoName && <ErrorMsg>{errors.ceoName.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									type="text"
									name="ceoName"
									isError={!!errors.ceoName}
									placeholder="대표자 성명 입력"
									{...register('ceoName', { required: '내용을 확인해 주세요.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								대표 연락처<span>*</span>
								{errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									name="phone"
									placeholder="연락처 입력('-' 제외)"
									isError={!!errors.phone}
									maxLength={11}
									{...register('phone', {
										required: '필수 입력 항목입니다.',
										pattern: {
											value: /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/,
											message: '올바른 번호가 아닙니다.',
										},
									})}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								팩스번호<span>*</span>
								{errors.fax && <ErrorMsg>{errors.fax.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<FlexInput
									type="text"
									name="fax"
									isError={!!errors.fax}
									onChange={() => {}}
									placeholder="팩스번호 입력('-' 제외)"
									{...register('fax', { required: '올바른 번호가 아닙니다.' })}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								주소<span>*</span>
								{errors.address && <ErrorMsg>{errors.address.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent style={{ flexDirection: 'column' }}>
								<Controller
									name="address"
									control={control}
									rules={{ required: '주소를 정확히 입력해주세요.' }}
									render={({ field }) => (
										<AddressFinder
											{...field}
											prevAddress={watch('address')}
											prevAddressDetail={watch('addressDetail')}
											borderColor={errors.address ? 'red' : 'dodgerblue'}
											onAddressChange={(address, addressDetail, sido, sigungu) => {
												field.onChange({ address, addressDetail }) // 여기서 field 객체의 onChange 메서드를 사용하여 값을 업데이트합니다.
											}}
										/>
									)}
								/>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								업태 선택<span>*</span>
							</FlexTitle>
							<FlexContent>
								<div
									style={{
										width: '100%',
										display: 'flex',
										gap: '40px',
									}}
								>
									<RadioLabel>
										<input
											type="checkbox"
											value="유통"
											name="businessType"
											// checked={watch('businessType') === '유통'}
											{...register('businessType', { required: true })}
										/>
										유통
									</RadioLabel>
									<RadioLabel>
										<input
											type="checkbox"
											value="제조"
											name="businessType"
											// checked={watch('businessType') === '제조'}
											{...register('businessType', { required: true })}
										/>
										제조
									</RadioLabel>
								</div>
							</FlexContent>
						</FlexPart>

						<FlexPart>
							<FlexTitle>
								사업자 번호<span>*</span>
								{errors.businessNumber && <ErrorMsg>{errors.businessNumber.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<Controller
									name="businessNumber"
									control={control}
									rules={{
										required: '사업자번호를 입력해주세요.',
										validate: () => busIdDupleCheck || '중복 확인을 해주세요.',
										pattern: {
											value: /^[0-9]{3}[0-9]{2}[0-9]{5}$/,
											message: '올바른 사업자 등록 번호가 아닙니다.',
										},
									}}
									render={({ field }) => (
										<FlexInput
											{...field}
											type="text"
											placeholder="사업자 번호 입력('-' 제외)"
											maxLength={10}
											onChange={(e) => {
												field.onChange(e)
												if (watch('memberType') === '카스코철강') {
													return setBusIdDupleCheck(true)
												}
												if (originalBusinessNumber && e.target.value === originalBusinessNumber) {
													return setBusIdDupleCheck(true)
												}
												setBusIdDupleCheck(false)
											}}
										/>
									)}
								/>
								{!busIdDupleCheck && (
									<CheckBtn
										onClick={handleBusIdDupleCheck}
										type="button"
										disabled={busIdDupleCheck}
										style={{ fontSize: 14 }}
									>
										중복 확인
									</CheckBtn>
								)}
							</FlexContent>
						</FlexPart>

						<FlexPart style={{ marginBottom: '5px' }}>
							<FlexTitle>
								사업자등록증<span>*</span>
								{errors.businessNumberFile && <ErrorMsg>{errors.businessNumberFile.message}</ErrorMsg>}
							</FlexTitle>
							{id ? (
								<FlexContent>
									<DownloadButton
										fileUrl={getValues('businessNumberFileUrl')}
										fileName={getValues('businessNumberOriginalName')}
									/>
								</FlexContent>
							) : (
								<TxtDivNoborder className="no-border" style={{ border: '1px solid #000000' }}>
									<label htmlFor="ex_file">
										<div className="btnStart">
											<img src="/svg/Upload.svg" alt="btnStart" />
											<p htmlFor="ex_file">파일 첨부</p>
										</div>
									</label>
									{/* <img src="/svg/Upload.svg" alt="Upload" /> */}
									<input
										id="ex_file"
										type="file"
										accept="image/jpg, image/png, image/jpeg"
										style={{ display: 'none' }}
										name="businessNumberFile"
										{...register('businessNumberFile', { required: id ? false : '사업자 등록증을 첨부해주세요.' })}
									/>
								</TxtDivNoborder>
							)}
						</FlexPart>
						<FlexPart>
							<FlexTitle></FlexTitle>
							<FlexContent>
								{watch('businessNumberFile') && watch('businessNumberFile')?.length > 0 ? (
									<IncomeImgDiv>
										<div>{watch('businessNumberFile')[0]?.name ?? watch('businessNumberFile')}</div>
										<div>
											<IIDImg
												onClick={() => {
													setValue('businessNumberFile', '')
												}}
												src="/svg/btn_close.svg"
											/>
										</div>
									</IncomeImgDiv>
								) : (
									<FlexInput style={{ width: '322px' }} disabled />
								)}
							</FlexContent>
						</FlexPart>

						<FlexPart style={{ marginBottom: '5px' }}>
							<FlexTitle>
								통장사본<span>*</span>
								{errors.bankbookFile && <ErrorMsg>{errors.bankbookFile.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								{id ? (
									<DownloadButton fileUrl={getValues('bankbookFileUrl')} fileName={getValues('bankbookOriginalName')} />
								) : (
									<TxtDivNoborder className="no-border" style={{ border: '1px solid #000000' }}>
										<label htmlFor="ex_file2">
											<div className="btnStart">
												<img src="/svg/Upload.svg" alt="btnStart" />
												<p htmlFor="ex_file">파일 첨부</p>
											</div>
										</label>
										<input
											id="ex_file2"
											type="file"
											accept="image/jpg, image/png, image/jpeg"
											style={{ display: 'none' }}
											name="bankbookFile"
											{...register('bankbookFile', { required: id ? false : '통장사본을 첨부해주세요.' })}
										/>
									</TxtDivNoborder>
								)}
							</FlexContent>
						</FlexPart>
						<FlexPart>
							<FlexTitle></FlexTitle>

							<FlexContent>
								{watch('bankbookFile') && watch('bankbookFile')?.length > 0 ? (
									<IncomeImgDiv>
										<div>{watch('bankbookFile')[0]?.name ?? watch('bankbookFile')}</div>
										<div>
											<IIDImg
												onClick={() => {
													setValue('bankbookFile', '')
												}}
												src="/svg/btn_close.svg"
											/>
										</div>
									</IncomeImgDiv>
								) : (
									<FlexInput style={{ width: '322px' }} disabled />
								)}
							</FlexContent>
						</FlexPart>

						<FlexPart style={{ marginBottom: '5px' }}>
							<FlexTitle>
								계좌번호<span>*</span>
								{errors.accountNumber && <ErrorMsg>{errors.accountNumber.message}</ErrorMsg>}
							</FlexTitle>
							<FlexContent>
								<AccountSelect
									name="bank"
									options={bankList}
									defaultValue={bankList[0]}
									value={bankList[bankList.findIndex((item) => item.label === watch('bank')) ?? 0]}
									onChange={(selectedOption) => setBank(selectedOption.label)}
								/>
							</FlexContent>
						</FlexPart>
						<FlexPart>
							<FlexTitle></FlexTitle>
							<FlexContent>
								<FlexInput
									style={{ marginTop: '5px' }}
									placeholder="계좌번호 입력('-' 제외)"
									isError={!!errors.accountNumber}
									name="accountNumber"
									{...register('accountNumber', { required: '올바른 번호가 아닙니다.' })}
								/>
							</FlexContent>
						</FlexPart>
					</Right>
				</MainContainer>
				<BtnWrap>
					{closeModal && (
						<WhiteBtn type={'button'} width={40} height={40} onClick={closeModal}>
							돌아가기
						</WhiteBtn>
					)}
					<BlackBtn width={40} height={40} type="submit">
						저장
					</BlackBtn>
				</BtnWrap>
			</Container>
		</>
	)
}

const Container = styled.form`
	width: ${(props) => props.width}px;
	padding: 60px 24px 56px 24px;
`

const MainContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 1em;
`

const BtnWrap = styled.div`
	display: flex;
	width: 400px;
	height: 120px;
	justify-content: space-evenly;
	align-items: center;
	margin: 0 auto;
`

const RadioLabel = styled.label`
	font-size: 16px;
	display: flex;
	gap: 8px;
	& input[type='radio'] {
		width: 20px;
		height: 20px;
	}

	& input[type='checkbox'] {
		width: 18px;
		height: 18px;
	}
`
const CheckBtn = styled.button`
	width: 95px;
	height: 40px;
	background-color: ${(props) => (props.disabled ? 'grey' : 'white')};
	border: 1px solid ${(props) => (props.disabled ? 'grey' : '#6b6b6b')};
	margin-left: 5px;
`

const TxtDivNoborder = styled.div`
	.btnStart {
		display: flex;
		width: 320px;
		height: 40px;
		border: none;

		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	p {
		margin-left: 10px;
	}
`

const ErrorMsg = styled.p`
	font-size: 13px;
	color: #b02525;
`

const FlexInputBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 40px;
	border: 1px solid #b02525;
	color: var(--status-alert, #b02525);
	font-family: SUIT;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px; /* 133.333% */
	cursor: pointer;

	&:active {
		background-color: #b02525;
		color: white;
	}
`
const IIDImg = styled.img`
	width: 13px;
	cursor: pointer;
`

const IncomeImgDiv = styled.div`
	display: flex;
	font-size: 14px;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
	width: 99%;
	height: 40px;
	background-color: #f1f1f1;
	color: #6b6b6b;
`
