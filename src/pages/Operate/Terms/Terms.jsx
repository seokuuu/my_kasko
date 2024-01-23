import React, { useEffect, useMemo, useState } from 'react'
import {
	FWTitle,
	FullWrap,
	OnePageContainer,
	OnePageSubContainer,
	TitleChild,
	Titles,
} from '../../../common/OnePage/OnePage.Styled'

import { isObject } from 'lodash'
import { usePolicyMutation, usePolicyQuery } from '../../../api/operate'
import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
import useBlockRoute from '../../../hooks/useBlockRoute'
import useAlert from '../../../store/Alert/useAlert'
import { formatDateString } from '../../../utils/utils'

const Terms = () => {
	// 확인 모달
	const { simpleConfirm } = useAlert()

	// 약관 데이터
	const initContent = ''
	const [resData, setResData] = useState({})
	const [content, setContent] = useState(initContent)
	// 약관 타입
	const [type, setType] = useState('이용 약관') // (이용약관 / 개인정보 처리방침 / 개인정보 수집 동의)
	// 약관 조회 API
	const { data, isSuccess, refetch } = usePolicyQuery(type)
	// 약관 등록 API
	const { mutate } = usePolicyMutation(type, refetch)

	const responseData = data?.data?.data

	console.log('responseData :', responseData)

	const blockCondition = useMemo(() => responseData?.content !== content, [content, data])
	console.log('blockCondition :', blockCondition)
	useBlockRoute(blockCondition)
	// data  바인딩
	useEffect(() => {
		if (isSuccess && isObject(responseData)) {
			setContent(responseData.content)
			setResData(responseData)
		}
	}, [data, type, isSuccess])

	const save = () => {
		mutate({
			uid: resData.uid,
			type: resData.type,
			content: content,
		})
	}
	const handleSubmit = () => {
		setResData((prev) => ({ ...prev, uid: prev.uid }))

		simpleConfirm('저장하시겠습니까?', save)
	}

	return (
		<OnePageContainer style={{ width: '55%' }}>
			{/* 약관 타입 탭 */}
			<Titles style={{ width: '90%' }}>
				<TitleChild active={type === '이용 약관'} onClick={() => setType('이용 약관')}>
					이용 약관
				</TitleChild>
				<TitleChild active={type === '개인정보 처리 방침'} onClick={() => setType('개인정보 처리 방침')}>
					개인정보 처리 방침
				</TitleChild>
				<TitleChild active={type === '개인정보 수집 동의'} onClick={() => setType('개인정보 수집 동의')}>
					개인정보 수집 동의
				</TitleChild>
			</Titles>
			<OnePageSubContainer>
				<FWTitle>
					<h5>서비스 이용약관</h5>
					<h6>최근 수정일 : {resData ? formatDateString(resData.updateDate) : ''}</h6>
				</FWTitle>
				<FullWrap style={{ marginTop: '30px', height: '30vw' }}>
					<textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
				</FullWrap>
			</OnePageSubContainer>
			<BtnWrap bottom={-30}>
				<BlackBtn width={40} height={40} onClick={handleSubmit}>
					저장
				</BlackBtn>
			</BtnWrap>
		</OnePageContainer>
	)
}

export default Terms
