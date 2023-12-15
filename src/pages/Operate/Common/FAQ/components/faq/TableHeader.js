import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFaqRemoveMutation } from '../../../../../../api/operate/faq'
import { SkyBtn, WhiteRedBtn } from '../../../../../../common/Button/Button'
import AlertPopup from '../../../../../../modal/Alert/AlertPopup'
import { TCSubContainer } from '../../../../../../modal/External/ExternalFilter'
import { popupAtom, popupObject, popupTypeAtom } from '../../../../../../store/Layout/Layout'

/**
 * @description
 * FAQ 테이블 헤더입니다.
 */
const TableHeader = ({ totalLength, selected, refetch }) => {
  const navigate = useNavigate()

  // FAQ 삭제 API
  const { mutate } = useFaqRemoveMutation()
  const selectedLength = selected ? selected.length : 0

  // 팝업 모달 여닫이 여부 & 팝업 타입 설정(보내는 값에 따라 팝업 내용이 달라짐.)
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom)
  const setNowPopupType = useSetAtom(popupTypeAtom) // 팝업 타입
  const setNowPopup = useSetAtom(popupObject) // 팝업 객체

  // 삭제 핸들러
  function removeEventHandler() {
    if (!selectedLength && selectedLength === 0) return alert('삭제할 목록을 선택해주세요.')
    setPopupSwitch(true)
    setNowPopupType(2)
    setNowPopup({
      num: '2-1',
      title: '삭제하시겠습니까?',
      next: '1-14',
      func() {
        if (selected && selected.length !== 0) {
          mutate(selected.map((s) => s['고유값']))
          refetch()
        }
      },
    })
  }

  return (
    <>
      <TCSubContainer bor>
        <div>
          FAQ 목록 (선택 <span>{selectedLength}</span> / {totalLength}개 )
        </div>
        <div></div>
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
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </>
  )
}

export default TableHeader
