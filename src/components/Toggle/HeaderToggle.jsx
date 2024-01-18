import { useState } from 'react'
import { toggleAtom } from '../../store/Layout/Layout'
import { styled } from 'styled-components'

import { ToggleBtn, Wrapper, Circle } from '../../common/Toggle/Toggle'

const HeaderToggle = ({ exFilterToggle, toggleBtnClick }) => {
  const toggleMsg = exFilterToggle ? 'On' : 'Off'
	return (
		<ToggleWrap style={{ display: 'flex' }}>
			<p>검색필터 {toggleMsg}</p>
			<Wrapper>
				<ToggleBtn onClick={toggleBtnClick} toggle={exFilterToggle}>
					<Circle toggle={exFilterToggle} />
				</ToggleBtn>
			</Wrapper>
		</ToggleWrap>
	)
}

export default HeaderToggle

const ToggleWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	> p {
		color: #6b6b6b;
		font-size: 16px;
	}
`
