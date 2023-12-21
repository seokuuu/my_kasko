import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  gap: ${(props) => `${props.$itemGap}px` || '10px'};
  width: 312px;
  align-items: ${(props) => props.$alignItems || 'none'};
`

export const StyledCheckLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: ${(props) => `${props.$justifyContent}` || 'none'};
  color: #cacaca;
  font-size: ${(props) => `${props.$fontSize}px` || '12px'};
  cursor: pointer;
`

export const StyledCheckInput = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  width: 12px;
  height: 12px;
  accent-color: ${(props) => props.$checkedColor || '#3B3B3B'};

  &:hover {
    background: purple;
  }
`

export const StyledCheckText = styled.p`
  margin-left: 5px;
`
