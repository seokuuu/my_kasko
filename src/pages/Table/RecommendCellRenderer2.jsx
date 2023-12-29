import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkyBtn } from '../../common/Button/Button'
import {
  StandardDispatchEditAtom,
  btnCellRenderAtom,
  btnCellUidAtom,
  consolEditModalAtom,
  surEditModalAtom,
  userpageDestinationEdit,
  userpageUserPreferEdit,
} from '../../store/Layout/Layout'

const RecommendCellRenderer2 = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]
  const navigate = useNavigate()
  // 합짐비 관리 modal
  const [recommend, setRecommend] = useState(false)
  const [userpageEditModal, setUserPageEditModal] = useAtom(userpageUserPreferEdit) // 마이페이지 수정 모달

  const [userDestiEdit, setUserDestiEdit] = useAtom(userpageDestinationEdit)

  const btnClickedHandler = () => {
    switch (editType) {
      case 'recommend':
        data['제품 추천 여부'] ? setRecommend(true) : setRecommend(false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    btnClickedHandler()
  }, [editType])
  console.log('REC', data['추천 제품 여부'])

  return (
    <>
      {
        <div>
          {recommend && '추천'} {data['제품명']}
        </div>
      }
    </>
  )
}

export default RecommendCellRenderer2
