import { useState } from 'react';
import { toggleAtom } from '../../store/Layout/Layout';
import { styled } from 'styled-components';

import { ToggleBtn, Wrapper, Circle } from '../../common/Toggle/Toggle';

const HeaderToggle = ({ exFilterToggle, toggleMsg, toggleBtnClick }) => {
  return (
    <ToggleWrap style={{ display: 'flex' }}>
      검색필터 {toggleMsg}
      <Wrapper>
        <ToggleBtn onClick={toggleBtnClick} toggle={exFilterToggle}>
          <Circle toggle={exFilterToggle} />
        </ToggleBtn>
      </Wrapper>
    </ToggleWrap>
  );
};

export default HeaderToggle;

const ToggleWrap = styled.div`
  display: flex;
`;
