import { useAtomValue, useSetAtom } from 'jotai';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { tableHiddenColumnAtom, tableShowColumnAtom } from '../../store/Table/Table';

const SHiddenSection = {
  Section: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: calc(100% - 240px);
    padding: 0 10px;
  `,
  Button: styled.button`
    display: flex;
    gap: 4px;
    width: max-content;
    color: ${(props) => props.theme.colors.TxtAlter};
    background-color: transparent;
    &:disabled {
      opacity: 0.5;
    }
  `,
  HiddenBox: styled.div`
    ul {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

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

const TableV2HiddenSection = () => {
  const [hiddenSectionShow, setHiddenSectionShow] = useState(false);
  const hiddenColumns = useAtomValue(tableHiddenColumnAtom);
  const setShowColumn = useSetAtom(tableShowColumnAtom);

  return (
    <SHiddenSection.Section>
      <SHiddenSection.Button 
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
              hiddenColumns.map((v, idx) => (
                <li key={v + (idx + '')}>
                  <button onClick={() => { setShowColumn(v) }}>
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