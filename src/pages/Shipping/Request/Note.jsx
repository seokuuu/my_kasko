import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { postingMemoAndNote } from '../../../api/SellProduct'
import { BlackBtn } from '../../../common/Button/Button'
import { CustomInput } from '../../../common/Input/Input'
import useAlert from '../../../store/Alert/useAlert'
import { ReactComponent as Pencil } from './Modify.svg'
/**
 * @description
 * 비고란 작성 컴포넌트입니다.
 * @param props.data 행 데이터입니다. 해당 행의 모든 필드 데이터를 조회가능합니다.
 */
const Note = ({ data }) => {
	const { simpleAlert } = useAlert()

	const productNumber = data['제품번호']
	const memo = data['메모']

	// 메모 상태값입니다.
	const [note, setNote] = useState('')

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
		if (data && data['비고']) {
			setNote(data['비고'])
		}
	}, [data])
	return (
		<div>
			{isUpdateMode ? (
				<CustomInput
					style={{
						height: '30px',
					}}
					value={note}
					width={200}
					onChange={(e) => setNote(e.target.value)}
				/>
			) : (
				<div>
					<span>{note}</span>
					<button
						style={{
							background: 'inherit',
							marginLeft: '5px',
							marginTop: '3px',
						}}
						onClick={() => setIsUpdateMode(true)}
					>
						<Pencil
							style={{
								background: 'inherit',
							}}
						/>
					</button>
				</div>
			)}
			{isUpdateMode && (
				<BlackBtn
					style={{
						marginLeft: '5px',
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

export default Note
