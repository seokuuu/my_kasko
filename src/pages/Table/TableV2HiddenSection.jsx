import { useAtomValue, useSetAtom } from 'jotai';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { TABLE_TYPE, tableHiddenColumnAtom, tableShowColumnAtom } from '../../store/Table/Table';

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
    color: ${(props) => props.theme.colors.TxtAlter};
    background-color: transparent;
    
    &:disabled {
      opacity: 0.5;
    }
    
    img {
      transform: rotate(${({$on}) => $on? 180 : 0}deg);
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
        }
      }
    }
  `
}

/**
 * 숨긴 항목 섹션
 */
const TableV2HiddenSection = ({ popupTable = false }) => {
  	// TABLE TYPE
	const tableType = useMemo(() => popupTable? TABLE_TYPE.popupTable : TABLE_TYPE.pageTable, [popupTable]);
  const hiddenColumns = useAtomValue(tableHiddenColumnAtom);
  const setShowColumn = useSetAtom(tableShowColumnAtom);
  // 섹션 숨김 처리
  const [hiddenSectionShow, setHiddenSectionShow] = useState(false);

  return (
    <SHiddenSection.Section>
      <SHiddenSection.Button 
        $on={hiddenSectionShow}
        disabled={hiddenColumns.length < 1}
        onClick={() => { setHiddenSectionShow(show => !show) }}
      >
        숨긴 항목
        <img src="/img/arrow_B.png" />
      </SHiddenSection.Button>
      {
        hiddenSectionShow && 
        <SHiddenSection.HiddenBox>
          <ul>
            {
              hiddenColumns[tableType].map((v, idx) => (
                <li key={v + (idx + '')}>
                  <button onClick={() => { setShowColumn({ type: tableType, value: v }) }}>
                    {v}
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.75 3.75L14.25 14.25" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                      <path d="M14.25 3.75L3.75 14.25" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </button>
                </li>
              ))
            }
          </ul>
        </SHiddenSection.HiddenBox>
      }
    </SHiddenSection.Section>
  )
}

export default TableV2HiddenSection