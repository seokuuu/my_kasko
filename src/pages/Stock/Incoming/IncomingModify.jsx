import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { updateSingleProduct } from '../../../api/SellProduct'
import { BlackBtn } from '../../../common/Button/Button'
import { add_element_field } from '../../../lib/tableHelpers'
import { BlueBarHeader, WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import { FilterTCTop, TableBottomWrap, TableContianer } from '../../../modal/External/ExternalFilter'
import { singleModifyObj, singleProductModify } from '../../../store/Layout/Layout'

import { StockIncomingModifyFields, stockFields } from '../../../constants/admin/StockIncomingModify'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'

function IncomingModify({ title }) {
	const [getRow, setGetRow] = useState('')
	const tableRef = useRef(StockIncomingModifyFields)
	const getCol = tableRef.current
	const [singleModfiy, setSingleModify] = useAtom(singleProductModify)

	const { simpleConfirm, simpleAlert } = useAlert()
	const [modifyObj, setModifyObj] = useAtom(singleModifyObj)
	//====================== 라디오체크 (오전이냐 오후냐 선택하는 부분) ======================

	useEffect(() => {
		setModifyObj((p) => {
			return {
				grade: p['등급'],
				weight: p['중량'],
				thickness: p['두께'],
				width: p['폭'],
				length: p['길이'],
				yp: p['yp'],
				ts: p['ys'],
				c: p['c'],
				p: p['p'],
				s: p['s'],
				si: p['si'],
				el: p['el'],
				mn: p['mn'],
				uid: p['제품 고유 번호'],
				storageName: p['창고'],
				receiptDate: p['입고일'],
				spart: p['제품군'],
				stockStatus: p['재고 상태'],
				supplier: p['매입처'],
				maker: p['제조사'],
				number: p['제품 번호'],
				preferThickness: p['정척 여부'],
				failCount: p['유찰 횟수'],
				usageCode: p['용도 코드'],
				usageCodeName: p['용도명'],
				causeCode: p['여재 원인 코드'],
				causeCodeName: p['여재 원인명'],
				updateDate: p['수정일'],
				hsOrderNo: p['주문 번호'],
				claimStatus: p['클레임 진행상태'],
				receiptStatus: p['입고 상태'],
				hsReturnDate: p['현대제철 반품일자'],
				kaskoReturnDate: p['카스코 반품일자'],
				createDate: p['생성일'],
				sendDate: p['확정전송일'],
				price: p['매입가'],
			}
		})
	}, [])
	//테이블에 데이터 패치하는중
	useEffect(() => {
		if (Array.isArray([modifyObj])) {
			setGetRow(add_element_field([modifyObj], stockFields))
		}
	}, [modifyObj])
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
	const [values, setValues] = useState({})

	const onCellValueChanged = (params) => {
		const p = params.data
		setValues({
			number: p['제품 번호'],
			storageName: p['창고'],
			grade: p['등급'],
			weight: p['중량'],
			thickness: modifyObj.thickness,
			width: p['폭'],
			length: p['길이'],
			yp: p['yp'],
			ts: modifyObj.ts,
			c: modifyObj.c,
			p: modifyObj.p,
			s: modifyObj.s,
			si: modifyObj.si,
			el: modifyObj.el,
			mn: modifyObj.mn,
			uid: p['제품 고유 번호'],
			receiptDate: p['입고일'],
			spart: modifyObj.spart,
			stockStatus: modifyObj.stockStatus,
			supplier: p['매입처'],
			maker: modifyObj.maker,
			preferThickness: modifyObj.preferThickness,
			failCount: p['유찰 횟수'],
			usageCode: p['용도 코드'],
			usageCodeName: p['용도명'],
			causeCode: p['여재 원인 코드'],
			causeCodeName: modifyObj.causeCodeName,
			updateDate: p['수정일'],
			hsOrderNo: p['주문 번호'],
			claimStatus: p['클레임 진행상태'],
			receiptStatus: p['입고 상태'],
			hsReturnDate: p['현대제철 반품일자'],
			kaskoReturnDate: p['카스코 반품일자'],
			createDate: p['생성일'],
			sendDate: p['확정전송일'],
			price: Number(p['매입가']),
			wdh:'제품 사양',
			spec: '없음',
			storage:'맞나',
			spartCode:'이거',
			name:'네임'
		})
	}

	const { mutate } = useMutationQuery('modifyProduct', updateSingleProduct)
	const handleSubmit = () => {
		mutate(values, {
			onSuccess: (d) => {
				simpleAlert('수정했습니다.')
				if (d?.data?.status === 200) setSingleModify(false)
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
					<Table getRow={getRow} getCol={getCol} changeFn={onCellValueChanged} />
					<TableBottomWrap>
						<BlackBtn width={15} height={40} onClick={handleSubmit}>
							저장
						</BlackBtn>
					</TableBottomWrap>
				</TableContianer>
			</Container>
		</OutSide>
	)
}

export default IncomingModify

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
