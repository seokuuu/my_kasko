import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { BlackBtn } from '../../common/Button/Button'
import { CustomInput } from '../../common/Input/Input'
import { ReactComponent as Pencil } from '../../pages/Shipping/Request/Modify.svg'
import { useAtomValue } from 'jotai'
import { authAtom } from '../../store/Auth/auth'
import useAlert from '../../store/Alert/useAlert'
import { postingMemoAndNote } from '../../api/SellProduct'
/**
 * @description
 * 비고란 작성 컴포넌트입니다.
 * @param props.data 행 데이터입니다. 해당 행의 모든 필드 데이터를 조회가능합니다.
 */
const MemoCellRenderer = (props) => {
	const { data } = props
	const auth = useAtomValue(authAtom)

	const { simpleAlert } = useAlert()

	const productNumber = data['제품번호']
	const note = data['비고']

	// 메모 상태값입니다.
	const [memo, setMemo] = useState('')

	// 수정모드 여부에 대한 상태값입니다.
	const [isUpdateMode, setIsUpdateMode] = useState(false)

	// 업데이트 핸들러
	function onUpdateNote() {
		memoUpdateAPI([{ number: productNumber, memo, note }])
	}

	// 비고 업데이트 API
	const { mutate: memoUpdateAPI } = useMutation({
		mutationKey: 'request-note',
		mutationFn: postingMemoAndNote,
		onSuccess() {
			simpleAlert('저장되었습니다.')

			setIsUpdateMode(false)
		},
		onError() {
			simpleAlert('저장에 실패하였습니다.')
		},
	})

	// 초기 비고값을 업데이트해줍니다.
	useEffect(() => {
		if (data && data['메모']) {
			setMemo(data['메모'])
		}
	}, [data])

	return (
		<div>
			{isUpdateMode ? (
				<CustomInput
					style={{
						height: '30px',
						width: '80%',
						minWidth: '200px',
					}}
					value={memo}
					width={200}
					onChange={(e) => setMemo(e.target.value)}
				/>
			) : (
				<div>
					<span>{memo}</span>
					{auth.role === '카스코철강' && (
						<button
							style={{
								background: 'inherit',
								marginLeft: '5px',
								marginTop: '3px',
							}}
							onClick={() => {
								setIsUpdateMode(true)
								const column = props.columnApi.getAllColumns().find((col) => col.getColId() === '메모')
								if (column) {
									const currentWidth = column.getActualWidth()
									if (currentWidth < 500) {
										props.columnApi.setColumnWidth(column, 500)
									}
								}
							}}
						>
							<Pencil
								style={{
									background: 'inherit',
								}}
							/>
						</button>
					)}
				</div>
			)}
			{isUpdateMode && (
				<BlackBtn
					style={{
						marginLeft: '5px',
						width: '60px',
					}}
					height={30}
					width={20}
					onClick={onUpdateNote}
				>
					저장
				</BlackBtn>
			)}
		</div>
	)
}

export default MemoCellRenderer
