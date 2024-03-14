import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { TABLE_TYPE, tableHiddenColumnAtom, tableShowColumnAtom } from '../../store/Table/Table'

const SHiddenSection = {
	Section: styled.div`
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 8px;
		max-width: calc(100% - 240px);
		padding: 0 12px;
	`,
	Button: styled.button`
		display: flex;
		gap: 2px;
		width: max-content;
		background-color: transparent;

		&:disabled {
			opacity: 0.5;
		}

		img {
			transform: rotate(${({ $on }) => ($on ? 180 : 0)}deg);
		}

		span {
			color: #6b6b6b;

			em {
				font-size: 14px;
				font-style: normal;
			}
		}
	`,
	HiddenBox: styled.div`
		width: 100%;

		ul {
			display: flex;
			gap: 8px;
			flex-wrap: wrap;
			width: 100%;

			li {
				button {
					display: flex;
					align-items: center;
					gap: 6px;
					height: 28px;
					line-height: 1.5;
					padding: 0 12px;
					background: #dbe2f0;
					border-radius: 15px;
					white-space: nowrap;
					font-size: 15px;

					svg {
						width: 14px;
						height: 14px;
					}
				}
			}
		}
	`,
}

/**
 * 숨긴 항목 섹션
 * @param {boolean} props.popupTable 팝업 테이블 여부
 * @description
 * - TableV2과 함께 사용됩니다.
 * - 팝업 테이블의 경우, TableV2와 TableV2HiddenSection에 popupTable 속성을 추가해야 합니다.
 */
const TableV2HiddenSection = ({ popupTable = false }) => {
	// TABLE TYPE
	const tableType = useMemo(() => (popupTable ? TABLE_TYPE.popupTable : TABLE_TYPE.pageTable), [popupTable])
	// STORE
	const hiddenColumns = useAtomValue(tableHiddenColumnAtom)
	const targetHiddenColumns = useMemo(() => hiddenColumns[tableType], [tableType, hiddenColumns])
	const setShowColumn = useSetAtom(tableShowColumnAtom)
	// UI
	const [hiddenSectionShow, setHiddenSectionShow] = useState(false)

	useEffect(() => {
		if (targetHiddenColumns?.length < 1) {
			setHiddenSectionShow(false)
		}
	}, [targetHiddenColumns])

	return (
		<SHiddenSection.Section>
			<SHiddenSection.Button
				$on={hiddenSectionShow}
				disabled={targetHiddenColumns?.length < 1}
				onClick={() => {
					setHiddenSectionShow((show) => !show)
				}}
			>
				<span>숨긴 항목 {targetHiddenColumns?.length > 0 && <em>({targetHiddenColumns?.length})</em>}</span>
				<img src="/img/arrow_B.png" />
			</SHiddenSection.Button>
			{hiddenSectionShow && (
				<SHiddenSection.HiddenBox>
					<ul>
						{targetHiddenColumns?.map((v, idx) => (
							<li key={v + (idx + '')}>
								<button
									onClick={() => {
										setShowColumn({ type: tableType, value: v })
									}}
								>
									{v}
									<svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M3.75 3.75L14.25 14.25" stroke="#000000" stroke-width="2" stroke-linecap="round" />
										<path d="M14.25 3.75L3.75 14.25" stroke="#000000" stroke-width="2" stroke-linecap="round" />
									</svg>
								</button>
							</li>
						))}
					</ul>
				</SHiddenSection.HiddenBox>
			)}
		</SHiddenSection.Section>
	)
}

export default TableV2HiddenSection
