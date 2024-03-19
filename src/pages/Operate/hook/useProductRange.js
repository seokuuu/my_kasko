import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import {
	useProductRangeDetailsQuery,
	useProductRangeRegisterMutation,
	useProductRangeRemoveMutation,
	useProductRangeUpdateMutation,
} from '../../../api/operate/productRange'
import { btnCellUidAtom, operateAddAtom } from '../../../store/Layout/Layout'

/**
 * @description
 * 제품군 관리에서 사용되는 데이터 및 API 함수들입니다.(수정,등록,삭제,상새)
 */
const useProductRange = () => {
	// 제품군명(등록/수정)
	const [spart, setSpart] = useState('')
	// 상세 고유 번호
	const [uid, setUid] = useAtom(btnCellUidAtom)
	// 제품군 등록 API
	const { mutate: register } = useProductRangeRegisterMutation()

	// 제품군 수정 API
	const { mutate: update } = useProductRangeUpdateMutation()
	// 제품군 삭제 API
	const { mutate: remove, data: removeData } = useProductRangeRemoveMutation()

	// 제품군 상세 API
	const { data: detailsData } = useProductRangeDetailsQuery(uid)

	// 모달
	const [modal, setModal] = useAtom(operateAddAtom)

	// 등록
	function productRegister() {
		register({ spart })
		setSpart('')
		setModal(false)
	}

	// 수정
	function productUpdate() {
		update({ uid, spart })
		setSpart('')
		setModal(false)
		setUid('')
	}

	// 제품군 핸들러
	function onSpartChange(v) {
		setSpart(v)
	}

	// 상세 고유 번호 초기화
	function initUid() {
		setUid('')
	}

	// 제품군 추가 등록/수정
	function onDetermineFunction() {
		if (uid) {
			productUpdate()
		} else {
			productRegister()
		}
	}
	// useMemo(() => (uid ? productUpdate : productRegister), [uid])

	// 상세 데이터값 조회 및 모달 창 오픈
	useEffect(() => {
		if (Boolean(uid)) {
			setModal(true)
		}
	}, [uid])

	return {
		remove,
		removeData,
		detailsData,
		onSpartChange,
		initUid,
		onDetermineFunction,
	}
}

export default useProductRange
