import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { updateSingleProduct } from '../../../api/SellProduct'
import { BlackBtn } from '../../../common/Button/Button'
import { add_element_field } from '../../../lib/tableHelpers'
import { BlueBarHeader, WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import { FilterTCTop, TableContianer, TableBottomWrap } from '../../../modal/External/ExternalFilter'
import { btnCellUidAtom, requestSingleModify, singleModifyObj, singleProductModify } from '../../../store/Layout/Layout'

import Table from '../../Table/Table'
import { SingleModifyDispatchFieldsCols, SingleModifyFields } from '../../../constants/admin/Single'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { Filtering } from '../../../utils/filtering'
import useAlert from '../../../store/Alert/useAlert'
function SingleProductModify({ title }) {
	const [request, setRequest] = useAtom(requestSingleModify)
	const [isRotated, setIsRotated] = useState(false)
	const [getRow, setGetRow] = useState('')
	const tableRef = useRef(SingleModifyDispatchFieldsCols)
	const getCol = tableRef.current
	const [singleModfiy, setSingleModify] = useAtom(singleProductModify)
	const [values, setValues] = useState({})
	const [modifyObj, setModifyObj] = useAtom(requestSingleModify)
	//====================== 라디오체크 (오전이냐 오후냐 선택하는 부분) ======================
	const { simpleConfirm, showAlert, simpleAlert } = useAlert()
	useEffect(() => {
		setModifyObj((p) => {
			return {
				number: p['제품 번호'],
				storage: p['창고'],
				storageName: p['창고'],
				spec: p['규격 약호'],
				wdh: p['제품 사양'],
				thickness: p['두께'],
				width: p['폭'],
				length: p['길이'],
				weight: p['중량'],
				grade: p['제품 등급'],
				usageCode: p['용도 코드'],
				usageCodeName: p['용도명'],
				c: p['C%'],
				si: p['Si'],
				mn: p['Mn'],
				p: p['P'],
				s: p['S'],
				ts: p['TS'],
				yp: p['YP'],
				el: p['EL'],
				spartCode: p['제품명'],
				spart: p['제품군명'],
				supplier: p['매입처'],
				maker: p['제조사'],
				name: p['제품명'],
				price: p['매입가'],
				preferThickness: p['정척 여부'],
				causeCode: p['여재 원인 코드'],
				causeCodeName: p['여재 원인명'],
				receiptDate: p['입고일'],
				stockStatus: p['재고 상태'],
				saleCategory: p['판매 구분'],
			}
		})
	}, [])
	// console.log(modifyObj)
	//테이블에 데이터 패치하는중
	useEffect(() => {
		if (Array.isArray([modifyObj])) {
			setGetRow(add_element_field([modifyObj], SingleModifyFields))
		}
		//타입, 리액트쿼리, 데이터 확인 후 실행
	}, [modifyObj])

	const onCellValueChanged = (params) => {
		const p = params.data
		console.log('파람', p)
		setValues({
			number: p['제품 번호'],
			storage: p['저장 위치'],
			storageName: p['저장 위치명'],
			spec: p['규격 약호'],
			wdh: p['제품 사양'],
			thickness: p['두께'],
			width: p['폭'],
			length: p['길이'],
			weight: p['중량'],
			grade: p['등급'],
			usageCode: p['용도 코드'],
			usageCodeName: p['용도명'],
			c: p['C%'],
			si: p['Si'],
			mn: p['Mn'],
			p: p['P'],
			s: p['S'],
			ts: p['TS'],
			yp: p['YP'],
			el: p['EL'],
			spartCode: p['제품군 코드'],
			spart: p['제품군명'],
			supplier: p['매입처'],
			maker: p['제조사'],
			name: p['품명'],
			price: p['매입가'],
			preferThickness: p['정척 여부'],
			causeCode: p['여재 원인 코드'],
			causeCodeName: p['여재 원인명'],
			receiptDate: p['입고일'],
			stockStatus: p['재고 상태'],
			saleCategory: p['판매 구분'],
		})
	}
	const modalClose = () => {
		setSingleModify(false)
	}

	// 뒤에 배경 안움직이게
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	const { mutate } = useMutationQuery('modifyProduct', updateSingleProduct)
	const handleSubmit = () => {
		console.log(values)
		mutate(values, {
			onSuccess: (d) => {
				if (d?.data?.status === 200) {
					simpleAlert('수정했습니다.', () => {
						setSingleModify(false)
						window.location.reload()
					})
				}
			},
		})
	}

	return (
		<OutSide>
			<Container>
				<BlueBarHeader>
					<div>{title}</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<TableContianer>
					<div style={{ margin: '20px' }}>&nbsp;</div>
					<FilterTCTop>
						<h6>수정 대상 제품</h6>
						<p>{modifyObj.number}</p>
					</FilterTCTop>
					<Table hei={100} hei2={200} getRow={getRow} getCol={getCol} changeFn={onCellValueChanged} />
					<TableBottomWrap>
						<BlackBtn
							width={15}
							height={40}
							onClick={() => {
								simpleConfirm('저장하시겠습니까?', () => {
									handleSubmit()
								})
							}}
						>
							저장
						</BlackBtn>
					</TableBottomWrap>
				</TableContianer>
			</Container>
		</OutSide>
	)
}

export default SingleProductModify

export const Container = styled.div`
	max-width: 60%;
	max-height: 700px;
	margin: auto;
	position: absolute;
	top: 43%;
	width: 100%;
	left: 55%;
	transform: translate(-50%, -50%);
	background: #fff;
`

export const OutSide = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
`
