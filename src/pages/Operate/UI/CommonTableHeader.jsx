import React from 'react'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { TCSubContainer } from '../../../modal/External/ExternalFilter'
import { onSizeChange } from '../utils'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

/**
 * @description
 * 테이블 헤더(갯수 및 등록/삭제)
 * 운영관리 - FAQ 관리,공지사항 관리,자료실 관리,전광판 관리
 * @param totalLength 총 갯수
 * @param removeEventHandler 삭제 버튼 누를시 동작할 함수ㅊ
 * @param toRegister 등록 버튼 누를 시 , 동작할 함수
 * @param tabHighlightValue 선택된 카테고리 탭 값
 * @param title 목록 타이틀
 * @param  selectedLength  선택된 데이터 갯수
 * @param isNoneBtn 삭제/등록 버튼이 없는 유무 true => 버튼 없음, false => 버튼 있음
 * @param setState setState
 **/
const CommonTableHeader = ({
	totalLength,
	removeEventHandler,
	toRegister,
	title,
	selectedLength,
	isNoneBtn,
	setState,
}) => {
	return (
		<>
			<TCSubContainer bor>
				<div>
					조회 목록 (선택 <span>{selectedLength}</span> / {totalLength}개 )
				</div>
				<TableV2HiddenSection />
				<PageDropdown handleDropdown={(e) => onSizeChange(e, setState)} />
			</TCSubContainer>
			<TCSubContainer>
				<div>
					선택 <span> {selectedLength} </span>(개)
				</div>
				{!isNoneBtn && (
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={removeEventHandler}>{title} 삭제</WhiteRedBtn>
						<SkyBtn onClick={toRegister}>{title} 등록</SkyBtn>
					</div>
				)}
			</TCSubContainer>
		</>
	)
}

export default CommonTableHeader
