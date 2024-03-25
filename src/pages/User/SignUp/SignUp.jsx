import React, { useEffect, useState } from 'react'
import { CheckImg2, StyledCheckMainDiv, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { ManagerInput, SInput, TxtCheckInput, TxtDropInput, TxtInput } from '../../../common/Input/Input'
import {
	Bottom,
	BottomItem,
	BottomP,
	CheckBtn,
	Container,
	DropWrap,
	Left,
	Main,
	Part,
	PartBlock,
	Right,
	SignUpBtn,
	SignupContainer,
	Title,
	Top,
} from './SignUp.Styled'

import { AccountSelect, emailOptions } from '../../../common/Option/SignUp'

import { useAtom } from 'jotai'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { checkBusinessId, checkDuplicateId, signup } from '../../../api/auth'
import AddressFinder from '../../../components/DaumPost/Address'
import DropField from '../../../components/DropField/DropField'
import PolicyModal from '../../../components/PolicyModal'
import { getBankNames } from '../../../constants/banks'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import useAlert from '../../../store/Alert/useAlert'
import { popupAtom } from '../../../store/Layout/Layout'
import EmailDomain from './EmailDomain'
import { CheckWrap, ErrorMsg, RadioContainer } from './style'

const SignUp = () => {
	const navigate = useNavigate()
	const { simpleAlert } = useAlert()

	/** React-Hook-Form 추가하기 */
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		watch,
		control,
		formState: { errors, isValid },
	} = useForm({ mode: 'onBlur' })

	// 이메일 도메인 값
	const emailDomain = watch('emailDomain')

	const auctionInfoSameForDeposit = watch('auctionInfoSameForDeposit')
	const auctionInfoSameForRelease = watch('auctionInfoSameForRelease')

	useEffect(() => {
		if (auctionInfoSameForDeposit) {
			const memberName = watch('memberName')
			const memberTitle = watch('memberTitle') // 경매 담당자의 직함
			const memberPhone = watch('memberPhone')

			setValue('depositManagerName', memberName)
			setValue('depositManagerTitle', memberTitle)
			setValue('depositManagerPhone', memberPhone)
		} else {
			setValue('depositManagerName', '')
			setValue('depositManagerTitle', '')
			setValue('depositManagerPhone', '')
		}
	}, [auctionInfoSameForDeposit, setValue, watch])

	useEffect(() => {
		// 출고 담당자 정보 체크박스 로직
		if (auctionInfoSameForRelease) {
			const memberName = watch('memberName')
			const memberTitle = watch('memberTitle')
			const memberPhone = watch('memberPhone')

			setValue('releaseManagerName', memberName)
			setValue('releaseManagerTitle', memberTitle)
			setValue('releaseManagerPhone', memberPhone)
		} else {
			setValue('releaseManagerName', '')
			setValue('releaseManagerTitle', '')
			setValue('releaseManagerPhone', '')
		}
	}, [auctionInfoSameForRelease, setValue, watch])

	/** radioBox -- 그대로 진행? */
	const radioDummy = ['개인', '법인(주)', '법인(유)']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	/** checkBox -- 그대로 진행? */
	const checkDummy = ['유통', '제조']
	const [check, setCheck] = useState(Array.from({ length: checkDummy.length }, () => false))
	const [checkData, setCheckData] = useState(Array.from({ length: checkDummy.length }, () => ''))

	useEffect(() => {
		const updatedCheck = checkDummy.map((value, index) => {
			return check[index] ? value : ''
		})
		// 그냥 배열에 담을 때
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData(filteredCheck)
	}, [check])

	/**가입하기 grey 버튼 react-hook-form의 isValid로 처리하기 */
	const watchAllFields = watch()

	// password 체크
	const [isPassValid, setIsPassValid] = useState(false)

	// ID 중복체크 여부
	const [idDupleCheck, setIdDupleCheck] = useState(false)

	// 사업자 번호 중복체크 여부
	const [busIdDupleCheck, setBusIdDupleCheck] = useState(false)

	useEffect(() => {
		const checkIndex = check.findIndex((isChecked, index) => isChecked && index < checkDummy.length)

		if (checkIndex !== -1) {
			const selectedValue = checkDummy[checkIndex]
		}
	}, [check])

	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치

	// 아이디 중복체크
	const onDuplicateCheckClick = async () => {
		const userId = watch('id')
		const idFormatRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/
		if (userId.length < 4 || !idFormatRegex.test(userId)) {
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
		// const idRegex = /^[0-9]{3}[0-9]{2}[0-9]{5}$/
		// if (!businessNumber || !idRegex.test(businessNumber)) {
		// 	return simpleAlert('올바른 사업자 등록 번호가 아닙니다.')
		// }
		try {
			await checkBusinessId(businessNumber)
			simpleAlert('사용 가능한 사업자 번호입니다.')
			setBusIdDupleCheck(true)
		} catch (e) {
			simpleAlert('이미 등록된 사업자 번호입니다.')
			setBusIdDupleCheck(false)
		}
	}

	/** 체크박스: 두 개의 체크박스 체크될 시 전체 동의 체크박스 자동 true 처리*/
	const [allChecked, setAllChecked] = useState(false)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const [termsChecked, setTermsChecked] = useState(false)

	useEffect(() => {
		if (privacyChecked && termsChecked) {
			setAllChecked(true)
		} else {
			setAllChecked(false)
		}
	}, [privacyChecked, termsChecked])

	const handleAllChecked = (e) => {
		const isChecked = e.target.checked
		setAllChecked(isChecked)
		setPrivacyChecked(isChecked)
		setTermsChecked(isChecked)
	}

	const handleSingleCheck = (checkedStateSetter) => (e) => {
		checkedStateSetter(e.target.checked)
	}
	/**  폼 제출 로직 (form태그를 추가해서 진행 및 체크박스,email는 기존  STATE를 활용) */
	const onSignUpSubmit = async (data) => {
		const selectedRadioIndex = checkRadio.findIndex((value) => value === true)
		const selectedRadioValue = radioDummy[selectedRadioIndex]
		const selectedBusinessTypes = checkDummy.filter((_, index) => check[index])

		// 이메일 도메인값을 셀렉트 박스 모드와 직접입력 모드에 따라 선택적으로 값을 할당해줍니다.
		const chooseEmailDomain =
			emailDomain && emailDomain.value === 'directWrite' ? data.emailDomainInputMode : data.emailDomain.label

		const request = {
			id: data.id,
			name: data.name,
			ceoName: data.ceoName,
			phone: data.phone,
			fax: data.fax,
			depositManagerName: data.depositManagerName,
			depositManagerTitle: data.depositManagerTitle,
			depositManagerPhone: data.depositManagerPhone,
			memberName: data.memberName,
			memberEmail: `${data.memberEmail}@${chooseEmailDomain}`,
			memberTitle: data.memberTitle,
			memberPhone: data.memberPhone,
			businessNumber: data.businessNumber,
			accountNumber: data.accountNumber,
			releaseManagerName: data.releaseManagerName,
			releaseManagerTitle: data.releaseManagerTitle,
			releaseManagerPhone: data.releaseManagerPhone,
			password: data.password,
			address: data.address.address,
			addressDetail: data.address.addressDetail,
			bank: data.bank.label,
			businessType: selectedBusinessTypes,
			type: selectedRadioValue,
		}
		const registration = filesData
		const bankBook = secondFilesData

		try {
			await signup(request, registration, bankBook)
			simpleAlert('회원가입되었습니다', () => navigate(-1))
		} catch (err) {
			console.error(err)
			simpleAlert('회원가입 실패하였습니다.')
		}
	}

	/** DropField 유효성 체크하는 부분 */
	const [fileList, setFileList] = useState([])
	const [secondFileList, setSecondFileList] = useState([])

	const [filesData, setFilesData] = useState([])
	const [secondFilesData, setSecondFilesData] = useState([])
	const validFile = (checkFileList) => {
		if (!checkFileList || checkFileList.length === 0) return '파일을 첨부해주세요.'
		else return true
	}

	const handleListChange = (setter, list) => {
		setter(list)
	}

	const bankList = getBankNames()

	useEffect(() => {
		const subscription = watch((value, { name, type }) => {
			if (name === 'password') {
				const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(value.password)
				setIsPassValid(isValid)
			}
			if (name === 'id') {
				setIdDupleCheck(false)
			}
			if (name === 'businessNumber') {
				setBusIdDupleCheck(false)
			}
		})
		return () => subscription.unsubscribe()
	}, [watch])

	const [isNext, setIsNext] = useState(false)

	useEffect(() => {
		if (isValid && privacyChecked && termsChecked && idDupleCheck && busIdDupleCheck) {
			setIsNext(true)
		} else {
			setIsNext(false)
		}
	}, [isValid, watchAllFields, privacyChecked, termsChecked, idDupleCheck, busIdDupleCheck])

	const [policyType, setPolicyType] = useState(null)

	// 이메일 옵션(직접 입력 필드 추가)
	const extendEmailOptions = [...emailOptions, { value: 'directWrite', label: '직접 입력' }]

	return (
		<Container>
			<SignupContainer>
				<form onSubmit={handleSubmit(onSignUpSubmit)}>
					<Top>회원가입</Top>
					<Main>
						<Left>
							<PartBlock>
								<Part>
									<Title>
										<h4>아이디</h4>
										{errors.id && <ErrorMsg>{errors.id.message}</ErrorMsg>}
									</Title>

									<div>
										<TxtCheckInput
											type="text"
											isError={!!errors.id}
											{...register('id', {
												required: '아이디를 입력해주세요.',
											})}
										/>
										<CheckBtn onClick={onDuplicateCheckClick} type="button" disabled={idDupleCheck}>
											중복 확인
										</CheckBtn>
										{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
									</div>
								</Part>
								<Part>
									<Title>
										<h4>비밀번호</h4>
										{errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
									</Title>
									<div style={{ position: 'relative' }}>
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
												<>
													<TxtInput
														{...field}
														placeholder="영문, 숫자 조합 8~12자리"
														type="password"
														isError={!!errors.password}
													/>
													{isPassValid && (
														<span
															style={{
																position: 'absolute',
																right: '10px',
																top: '50%',
																transform: 'translateY(-50%)',
																color: '#64B5FF',
																fontSize: '18px',
															}}
														>
															✓
														</span>
													)}
												</>
											)}
										/>
									</div>
								</Part>
								<Part>
									<Title>
										<h4>비밀번호 확인</h4>
										{errors.passwordCheck && <ErrorMsg>{errors.passwordCheck.message}</ErrorMsg>}
									</Title>
									<div>
										<Controller
											name="passwordCheck"
											control={control}
											rules={{
												required: '비밀번호를 확인해주세요.',
												validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
											}}
											render={({ field }) => (
												<TxtInput
													{...field}
													isError={!!errors.passwordCheck}
													placeholder="비밀번호 재입력"
													type="password"
												/>
											)}
										/>
									</div>
								</Part>
							</PartBlock>
							<PartBlock>
								<Part>
									<h4>사업자 구분</h4>
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
												<div style={{ display: 'flex', marginLeft: '3px' }}>
													<p>{text}</p>
												</div>
											</RadioMainDiv>
										))}
									</RadioContainer>
								</Part>
								<Part>
									<Title>
										<h4>회사 명</h4>
										{errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
									</Title>
									<div>
										<TxtInput
											type="text"
											name="name"
											isError={!!errors.name}
											{...register('name', { required: '내용을 확인해 주세요.' })}
										/>
									</div>
								</Part>
								<Part>
									<Title>
										<h4>대표자 성명</h4>
										{errors.ceoName && <ErrorMsg>{errors.ceoName.message}</ErrorMsg>}
									</Title>
									<div>
										<TxtInput
											type="text"
											name="ceoName"
											isError={!!errors.ceoName}
											{...register('ceoName', { required: '내용을 확인해 주세요.' })}
										/>
									</div>
								</Part>
								<Part>
									<Title>
										<h4>대표 연락처</h4>
										{errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
									</Title>
									<div>
										<TxtInput
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
									</div>
								</Part>
								<Part>
									<Title>
										<h4>팩스 번호</h4>
										{errors.fax && <ErrorMsg>{errors.fax.message}</ErrorMsg>}
									</Title>
									<div>
										<TxtInput
											type="text"
											name="fax"
											isError={!!errors.fax}
											onChange={() => {}}
											placeholder="팩스번호 입력('-' 제외)"
											{...register('fax', { required: '올바른 번호가 아닙니다.' })}
										/>
									</div>
								</Part>
								<Part>
									<Title>
										<h4>주소</h4>
										{errors.address && <ErrorMsg>{errors.address.message}</ErrorMsg>}
									</Title>
									<Controller
										name="address"
										control={control}
										rules={{ required: '주소를 정확히 입력해주세요.' }}
										render={({ field }) => (
											<AddressFinder
												{...field}
												borderColor={errors.address ? 'red' : 'dodgerblue'}
												onAddressChange={(address, addressDetail, sido, sigungu) => {
													const newAddressInfo = {
														address,
														addressDetail,
														siDoCode: sido,
														siGunGuCode: sigungu,
													}
													field.onChange(newAddressInfo) // 여기서 field 객체의 onChange 메서드를 사용하여 값을 업데이트합니다.
												}}
											/>
										)}
									/>
								</Part>
							</PartBlock>
							<PartBlock>
								<Part>
									<Title>
										{/* 직함을 가져올 API 어떤 부분 사용하면 되는지 - 입금, 경매, 출고 */}
										<h4>입금 담당자 정보</h4>
										{errors.depositManagerName && <ErrorMsg>{errors.depositManagerName.message}</ErrorMsg>}
										{errors.depositManagerTitle && <ErrorMsg>{errors.depositManagerTitle.message}</ErrorMsg>}
									</Title>
									<DropWrap>
										<TxtDropInput
											name="depositManagerName"
											isError={!!errors.depositManagerName}
											placeholder="담당자 성함 입력"
											{...register('depositManagerName', { required: '내용을 확인해 주세요.' })}
										/>
										<ManagerInput
											name="depositManagerTitle"
											isError={!!errors.depositManagerTitle}
											placeholder="직함 입력"
											{...register('depositManagerTitle', { required: '내용을 확인해 주세요.' })}
										/>
									</DropWrap>
								</Part>
								<Part>
									<Title>
										<h4>휴대폰 번호</h4>
										{errors.depositManagerPhone && <ErrorMsg>{errors.depositManagerPhone.message}</ErrorMsg>}
									</Title>
									<TxtInput
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
									<BottomP>
										<input type="checkbox" {...register('auctionInfoSameForDeposit')} style={{ marginRight: '5px' }} />
										경매 담당자 정보와 동일
									</BottomP>
								</Part>
							</PartBlock>
						</Left>
						<Right>
							<PartBlock>
								<Part>
									<Title>
										<h4>경매 담당자 정보</h4>
										{errors.memberName && <ErrorMsg>{errors.memberName.message}</ErrorMsg>}
										{errors.memberTitle && <ErrorMsg>{errors.memberTitle.message}</ErrorMsg>}
									</Title>
									<DropWrap>
										<TxtDropInput
											type="text"
											name="memberName"
											isError={!!errors.memberName}
											placeholder="담당자 성함 입력"
											{...register('memberName', { required: '내용을 확인해 주세요.' })}
										/>
										<ManagerInput
											type="text"
											name="memberTitle"
											isError={!!errors.memberTitle}
											placeholder="직함 입력"
											{...register('memberTitle', { required: '내용을 확인해 주세요.' })}
										/>
									</DropWrap>
								</Part>
								<Part>
									<Title>
										<h4>이메일</h4>
										{errors.memberEmail && <ErrorMsg>{errors.memberEmail.message}</ErrorMsg>}
										{errors.emailDomain && <ErrorMsg>{errors.emailDomain.message}</ErrorMsg>}
									</Title>
									<div
										style={{
											display: 'flex',
											lineHeight: '40px',
											width: '320px',
										}}
									>
										<SInput
											name="memberEmail"
											isError={!!errors.memberEmail || !!errors.emailDomain}
											{...register('memberEmail', { required: '내용을 입력해 주세요.' })}
										/>
										<p style={{ margin: '0 5px' }}>@</p>
										<EmailDomain watch={watch} control={control} register={register} />
									</div>
								</Part>
								<Part>
									<Title>
										<h4>휴대폰 번호</h4>
										{errors.memberPhone && <ErrorMsg>{errors.memberPhone.message}</ErrorMsg>}
									</Title>
									<TxtInput
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
								</Part>
							</PartBlock>
							<PartBlock>
								<Part>
									<h4>업체 선택</h4>
									<CheckWrap>
										{checkDummy.map((x, index) => (
											<StyledCheckMainDiv key={index}>
												<StyledCheckSubSquDiv
													onClick={() => setCheck(CheckBox(check, check.length, index, true))}
													isChecked={check[index]}
													name="businessChoice"
												>
													<CheckImg2 src="/svg/check.svg" isChecked={check[index]} />
												</StyledCheckSubSquDiv>
												<p>{x}</p>
											</StyledCheckMainDiv>
										))}
									</CheckWrap>
								</Part>
								<Part>
									<Title>
										<h4>사업자 번호</h4>
										{errors.businessNumber && <ErrorMsg>{errors.businessNumber.message}</ErrorMsg>}
									</Title>
									<div style={{ width: '320px' }}>
										<TxtCheckInput
											name="businessNumber"
											placeholder="사업자 번호 입력('-' 제외)"
											isError={!!errors.businessNumber}
											{...register('businessNumber', {
												required: '필수 입력 항목입니다.',
												pattern: {
													value: /^[0-9]{3}[0-9]{2}[0-9]{5}$/,
													message: '올바른 사업자 등록 번호가 아닙니다.',
												},
											})}
										/>
										<CheckBtn onClick={handleBusIdDupleCheck} type="button" disabled={busIdDupleCheck}>
											중복 확인
										</CheckBtn>
									</div>
								</Part>
								<Part>
									<Title>
										<h4>사업자 등록증</h4>
										{errors.registration && <ErrorMsg>{errors.registration.message}</ErrorMsg>}
									</Title>
									<Controller
										name="registration"
										control={control}
										defaultValue={[]}
										rules={{ validate: () => validFile(fileList) }}
										render={({ field }) => (
											<DropField
												{...field}
												height="44px"
												pName={
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<svg width="20" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
															<g fill="currentColor">
																<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
																<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
															</g>
														</svg>
														<span>파일첨부</span>
													</div>
												}
												id="registration"
												htmlFor="registration"
												fileList={fileList}
												filesData={filesData}
												setFilesData={setFilesData}
												onFileListChange={(reFileList) => {
													handleListChange(setFileList, reFileList)
													field.onChange(reFileList)
													validFile(reFileList)
												}}
												error={!!errors.registration}
											/>
										)}
									/>
								</Part>
								<Part>
									<Title>
										<h4>통장 사본</h4>
										{errors.bankBook && <ErrorMsg>{errors.bankBook.message}</ErrorMsg>}
									</Title>
									<Controller
										name="bankBook"
										control={control}
										defaultValue={[]}
										rules={{ validate: () => validFile(secondFileList) }}
										render={({ field }) => (
											<DropField
												{...field}
												height="44px"
												pName={
													<div style={{ display: 'flex', alignItems: 'center' }}>
														<svg width="20" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
															<g fill="currentColor">
																<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
																<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
															</g>
														</svg>
														<span>파일첨부</span>
													</div>
												}
												id="bankBook"
												htmlFor="bankBook"
												fileList={secondFileList}
												filesData={secondFilesData}
												setFilesData={setSecondFilesData}
												onFileListChange={(reFileList) => {
													handleListChange(setSecondFileList, reFileList)
													field.onChange(reFileList)
													validFile(reFileList)
												}}
												error={errors.bizFiles ? true : false}
											/>
										)}
									/>
								</Part>
								<Part>
									<Title>
										<h4>계좌번호</h4>
										{errors.accountNumber && <ErrorMsg>{errors.accountNumber.message}</ErrorMsg>}
									</Title>
									<Controller
										control={control}
										name="bank"
										render={({ field }) => <AccountSelect {...field} options={bankList} defaultValue={bankList[0]} />}
									/>

									<TxtInput
										style={{ marginTop: '5px' }}
										placeholder="계좌번호 입력('-' 제외)"
										isError={!!errors.accountNumber}
										name="accountNumber"
										{...register('accountNumber', { required: '올바른 번호가 아닙니다.' })}
									/>
								</Part>
							</PartBlock>
							<PartBlock style={{ marginTop: '138px' }}>
								<Part>
									<Title>
										<h4>입출고 담당자 정보</h4>
										{errors.releaseManagerName && <ErrorMsg>{errors.releaseManagerName.message}</ErrorMsg>}
									</Title>
									<DropWrap>
										<TxtDropInput
											name="releaseManagerName"
											isError={!!errors.releaseManagerName}
											placeholder="담당자 성함 입력"
											{...register('releaseManagerName', { required: '내용을 확인해 주세요.' })}
										/>
										<ManagerInput
											name="releaseManagerTitle"
											isError={!!errors.releaseManagerTitle}
											placeholder="직함 입력"
											{...register('releaseManagerTitle', { required: '내용을 확인해 주세요.' })}
										/>
									</DropWrap>
								</Part>
								<Part>
									<Title>
										<h4>휴대폰 번호</h4>
										{errors.releaseManagerPhone && <ErrorMsg>{errors.releaseManagerPhone.message}</ErrorMsg>}
									</Title>
									<TxtInput
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
									<BottomP>
										<input type="checkbox" {...register('auctionInfoSameForRelease')} style={{ marginRight: '5px' }} />
										경매 담당자 정보와 동일
									</BottomP>
								</Part>
							</PartBlock>
						</Right>
					</Main>
					<Bottom>
						<BottomItem>
							<h4>약관 동의</h4>
						</BottomItem>
						<BottomItem style={{ flexGrow: '6' }}>
							<div>
								<input type="checkbox" checked={allChecked} onChange={handleAllChecked} />
								<h4>전체 동의합니다</h4>
							</div>
							<div>
								<input type="checkbox" checked={privacyChecked} onChange={handleSingleCheck(setPrivacyChecked)} />
								<p>
									개인정보 활용에 동의 <span>(필수)</span>
								</p>
								<a type="button" onClick={() => setPolicyType('개인정보 수집 동의')}>
									약관 보기
								</a>
							</div>
							<div>
								<input type="checkbox" checked={termsChecked} onChange={handleSingleCheck(setTermsChecked)} />
								<p>
									이용약관 동의 <span>(필수)</span>
								</p>
								<a type="button" onClick={() => setPolicyType('이용 약관')}>
									약관 보기
								</a>
							</div>
						</BottomItem>
						{isNext ? <SignUpBtn isNext={true}>가입하기</SignUpBtn> : <SignUpBtn isNext={false}>가입하기</SignUpBtn>}
					</Bottom>
				</form>
			</SignupContainer>
			{policyType && <PolicyModal type={policyType} closeModal={() => setPolicyType(null)} />}
		</Container>
	)
}

export default SignUp
