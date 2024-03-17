import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFaqRemoveMutation } from '../../../../../../api/operate/faq'
import { SkyBtn, WhiteRedBtn } from '../../../../../../common/Button/Button'
import PageDropdown from '../../../../../../components/TableInner/PageDropdown'
import { TCSubContainer } from '../../../../../../modal/External/ExternalFilter'
import useAlert from '../../../../../../store/Alert/useAlert'
import { onSizeChange } from '../../../../utils'
import TableV2HiddenSection from '../../../../../Table/TableV2HiddenSection'

/**
 * @description
 * FAQ 테이블 헤더입니다.
 */
const TableHeader = ({ totalLength, selected, setState }) => {
	const navigate = useNavigate()

	// FAQ 삭제 API
	const { mutate } = useFaqRemoveMutation()
	const selectedLength = selected ? selected.length : 0

	// 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
	const { simpleConfirm, simpleAlert } = useAlert()

	// 삭제 핸들러
	function removeEventHandler() {
		if (!selectedLength && selectedLength === 0) return simpleAlert('삭제할 목록을 선택해주세요.')
		simpleConfirm('삭제하시겠습니까?', () => mutate(selected.map((s) => s['고유값'])))
	}

	return (
		<>
			<TCSubContainer bor>
				<div>
					FAQ 목록 (선택 <span>{selectedLength}</span> / {totalLength}개 )
				</div>
				<TableV2HiddenSection />
				<PageDropdown handleDropdown={(e) => onSizeChange(e, setState)} />
			</TCSubContainer>
			<TCSubContainer>
				<div>
					선택 <span> {selectedLength} </span>(개)
				</div>
				<div style={{ display: 'flex', gap: '10px' }}>
					<WhiteRedBtn onClick={removeEventHandler}>FAQ 삭제</WhiteRedBtn>
					<SkyBtn onClick={() => navigate('/operate/faq/faqpost')}>FAQ 등록</SkyBtn>
				</div>
			</TCSubContainer>
		</>
	)
}

export default TableHeader
