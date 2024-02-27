import styled from 'styled-components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { packageDetailModal, packageModeAtom, selectPackageAtom } from '../../../../store/Layout/Layout'

export default function PackageNumberRecommendCell({ data, uidFieldName, editType, moveUrl }) {
	const navigate = useNavigate()
	const setMode = useSetAtom(packageModeAtom)
	const setIsModal = useSetAtom(packageDetailModal)
	const setSelet = useSetAtom(selectPackageAtom)

	const handleClick = () => {
		setMode('edit')

		return new Promise((resolve) =>
			setTimeout(() => {
				navigate(`${moveUrl}/${data[uidFieldName]}`, { state: { data: { data, mode: 'edit' } } })
				resolve()
			}, 100),
		)
	}
	const btnClieckedHandler = () => {
		switch (editType) {
			case 'openDetailModal':
				setIsModal(true)
				setSelet(data)
				break
			case 'LinkTo':
				handleClick()
		}
	}
	return data['추천 제품 여부'] ? (
		<>
			<span style={{ display: 'flex', gap: '4px', paddingLeft: '4px' }}>
				<Point>추천</Point>
				<LinkCell as={'button'} onClick={btnClieckedHandler} style={{ color: 'blue' }}>
					{data[uidFieldName]}
				</LinkCell>
			</span>
		</>
	) : (
		<LinkCell as={'button'} onClick={btnClieckedHandler} style={{ color: 'blue' }}>
			{data[uidFieldName]}
		</LinkCell>
	)
}

const LinkCell = styled.div`
	color: #4c83d6;
	outline: none;
	text-decoration: underline;
	background: inherit;
	font-size: 15px;
	font-style: normal;
	font-weight: 700;
	padding: 0;
`

const Point = styled.p`
	color: #dbbe4a;
	font-size: 16px;
	font-weight: 600;
	padding-left: 4px;
`
const Number = styled.p`
	z-index: 20;
`
