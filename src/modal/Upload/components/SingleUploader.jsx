import { useAtom } from 'jotai'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { CustomSelect } from '../../../common/Option/Main'
import { destPostModalAtom } from '../../../store/Layout/Layout'
import { BlueMainDiv } from '../../Common/Common.Styled'
import SignUpPost from '../../SignUp/SignUpPost'
import { Input, Table, Td, Th } from '../../Table/TableModal'
import { get_addressFind } from '../../../api/userManage'
import DateGrid from '../../../components/DateGrid/DateGrid'

/**
 * @description
 * 단일 등록 업로드입니다.
 */
const SingleUploader = ({
	modalInTable,
	convertKey,
	onEditHandler,
	dropdownProps,
	address,
	setAddress,
	startDate,
	setStartDate,
	title,
}) => {
	// 오늘 날짜(단일 등록 적용일자에 사용됩니다.)

	const init = {
		address: '',
		code: '',
		memo: '', //메모
	}
	const date = moment().format('YYYY-MM-DD')
	const [postcodeModal, setPostcodeModal] = useAtom(destPostModalAtom)

	const [postAddress, setPostAdress] = useState('')
	const [postFind, setPostFind] = useState(false)
	const [detailAddress, setDetailAddress] = useState('')
	const [submitData, setSubmitData] = useState(init)
	const [isDaumPostOpen, setIsDaumPostOpen] = useState(false)

	const postCheck = () => {
		setPostFind(false)
	}

	const directCheck = () => {
		setPostFind(true)
		setAddress('')
		setDetailAddress('')
		setSubmitData({ ...submitData, address: '', addressDetail: '' })
	}

	const daumPostHandleBtn = () => {
		setIsDaumPostOpen(true)
	}

	const detailAddressHandler = (e) => {
		const value = e.target.value
		setDetailAddress(value)
	}

	const comfirmPost = () => {
		setPostcodeModal(false)
		setSubmitData({ ...submitData, address: address, addressDetail: detailAddress })
	}

	const closeModal = () => {
		setPostcodeModal(false)
		setAddress('')
		setDetailAddress('')
		setSubmitData({ ...submitData, address: '', addressDetail: '' })
	}

	const daumPosthandleClose = () => {
		setIsDaumPostOpen(false)
	}

	const sidoMapping = {
		서울: '서울특별시',
		부산: '부산광역시',
		대구: '대구광역시',
		인천: '인천광역시',
		광주: '광주광역시',
		대전: '대전광역시',
		울산: '울산광역시',
		경기: '경기도',
		충북: '충청북도',
		충남: '충청남도',
		전남: '전라남도',
		경북: '경상북도',
		경남: '경상남도',
	}

	const daumPostHandleComplete = (data) => {
		const { address } = data

		// 지번 주소 전달
		const mappedSido = sidoMapping[data?.sido] || data?.sido
		const mergedAddress = [mappedSido, data?.sigungu, data?.bname1, data?.bname2]
			.filter((value) => value !== '')
			.join(' ')
		setAddress(mergedAddress)
		setDetailAddress(data?.jibunAddressEnglish?.split(' ')[0])
		setPostAdress(mergedAddress)
		setIsDaumPostOpen(false)
	}

	const [destiCode, setDestiCode] = useState() // 목적지 코드

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (postAddress && title !== '목적지 등록') {
					const response = await get_addressFind(postAddress)
					const resData = response?.data?.data
					if (resData && postAddress) {
						onEditHandler({ target: { name: 'destinationCode', value: resData } })
						setDestiCode(resData)
					} else {
						setDestiCode('미등록 또는 대기 중인 코드입니다.')
					}
				}
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [postAddress, get_addressFind])

	return (
		<BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px' }}>
			<Table>
				<thead>
					<tr>
						{Object.keys(modalInTable)?.map((key) => (
							<Th key={key}>{key}</Th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{Object.entries(modalInTable)?.map(([key, value], index) => (
							<Td key={index}>
								{value === 'input' ? (
									value === '작성일' ? (
										<div>{date}</div>
									) : (
										<Input
											type="text"
											name={convertKey && convertKey[key]}
											onChange={(e) => {
												onEditHandler(e)
											}}
										/>
									)
								) : value === 'note' && key === '비고' ? (
									<Input
										type="text"
										name="note"
										onChange={(e) => {
											onEditHandler(e)
										}}
									/>
								) : value === 'effectCost' && key === '적용 단가' ? (
									<Input
										type="text"
										name="effectCost"
										onChange={(e) => {
											onEditHandler(e)
										}}
									/>
								) : value === 'destinationName' && key === '목적지' ? (
									<Input
										type="text"
										name="destinationName"
										onChange={(e) => {
											setAddress(e.target.value)
										}}
									/>
								) : value === 'destipostbutton' ? (
									<>
										<WhiteSkyBtn
											onClick={() => {
												setPostcodeModal(true)
											}}
										>
											찾기
										</WhiteSkyBtn>
									</>
								) : value === 'dropdown' ? (
									<CustomSelect
										options={dropdownProps[0]?.options}
										defaultValue={dropdownProps[0]?.defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'spart', value: selectedValue.label } })
										}
									/>
								) : value === 'dropdown2' ? (
									<CustomSelect
										options={dropdownProps[1]?.options}
										defaultValue={dropdownProps[1]?.defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'preferThickness', value: selectedValue.label } })
										}
									/>
								) : value === 'dropdown3' ? (
									<CustomSelect
										options={dropdownProps[2].options}
										defaultValue={dropdownProps[2].defaultValue}
										onChange={(selectedValue) =>
											onEditHandler({ target: { name: 'grade', value: selectedValue.value } })
										}
									/>
								) : // 여기에 새로운 분기를 추가합니다.
								value === 'dropdown4' ? (
									<CustomSelect
										options={dropdownProps[3]?.options} // 'dropdown4'에 해당하는 옵션
										defaultValue={dropdownProps[3]?.defaultValue} // 'dropdown4'의 기본값
										onChange={
											(selectedValue) => onEditHandler({ target: { name: 'storageName', value: selectedValue.value } }) // 적절한 필드 이름으로 대체
										}
									/>
								) : value === 'date' ? (
									<DateGrid width={145} startDate={startDate} setStartDate={setStartDate} />
								) : key === '적용일자' ? (
									<>{date}</>
								) : key === '목적지 명' ? (
									<>{address}</>
								) : key === '목적지 코드' ? (
									<>{destiCode}</>
								) : (
									''
								)}
							</Td>
						))}
					</tr>
				</tbody>
				{postcodeModal && (
					<SignUpPost
						postCheck={postCheck}
						postFind={false}
						address={address}
						daumPostHandleBtn={daumPostHandleBtn}
						detailAddress={detailAddress}
						setDetailAddress={setDetailAddress}
						detailAddressHandler={detailAddressHandler}
						comfirmPost={comfirmPost}
						closeModal={closeModal}
						isDaumPostOpen={isDaumPostOpen}
						daumPosthandleClose={daumPosthandleClose}
						daumPostHandleComplete={daumPostHandleComplete}
						noDirect={true}
					/>
				)}
			</Table>
		</BlueMainDiv>
	)
}

export default SingleUploader
